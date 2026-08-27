import mongoose from "mongoose";

import {
    retrieveDocs
} from "../services/retrieval.service.js";

import {
    askLLM
} from "../services/chat.service.js";

import orderModel from "../models/orders.model.js";


// Temporary conversation state
// userId -> { waitingFor: "ORDER_ID" }
const chatStates = new Map();


// --------------------------------------------------
// Detect whether user is asking about an order
// --------------------------------------------------
function isOrderQuery(message) {

    const text = message.toLowerCase();

    const keywords = [
        "order",
        "track my order",
        "order status",
        "order details",
        "my order",
        "where is my order",
        "delivery status",
        "order delivery",
        "when will my order arrive",
        "has my order shipped",
        "order information"
    ];

    return keywords.some(keyword =>
        text.includes(keyword)
    );
}


// --------------------------------------------------
// Format order response
// --------------------------------------------------
function formatOrder(order) {

    const items = Array.isArray(order.items)
        ? order.items
        : [];

    const itemText = items.length > 0
        ? items.map((item, index) => {

            const name =
                item.name ||
                item.productName ||
                item.title ||
                `Item ${index + 1}`;

            const quantity =
                item.quantity || 1;

            return `• ${name} × ${quantity}`;

        }).join("\n")
        : "No item information available";


    const paymentStatus =
        order.payment
            ? "Paid"
            : "Pending";


    const orderDate =
        order.date
            ? new Date(order.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
            : "Not available";


    let addressText = "Not available";

    if (order.address) {

        if (typeof order.address === "string") {

            addressText = order.address;

        } else {

            addressText = Object.entries(order.address)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
        }
    }


    return `
📦 **Order Information**

**Order ID:** ${order._id}

**Status:** ${order.status}

**Amount:** ₹${Number(order.amount || 0).toLocaleString("en-IN")}

**Payment:** ${paymentStatus}

**Payment Method:** ${order.paymentMethod || "Not available"}

**Order Date:** ${orderDate}

**Items:**
${itemText}

**Delivery Address:**
${addressText}
`.trim();
}


// --------------------------------------------------
// Main Chat Controller
// --------------------------------------------------
export const chat = async (req, res) => {

    try {

        // ------------------------------------------------
        // STEP 1: Get message
        // ------------------------------------------------

        const { message } = req.body;


        if (!message || !message.trim()) {

            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }


        // ------------------------------------------------
        // STEP 2: Get authenticated user
        //
        // authUser middleware sets:
        //
        // req.userId = decoded.id
        //
        // Therefore DO NOT use:
        // req.user?.id
        // req.body.userId
        // ------------------------------------------------

        const userId = req.userId;


        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }


        console.log("Chat request from user:", userId);


        const userMessage = message.trim();


        // ------------------------------------------------
        // STEP 3: Check conversation state
        // ------------------------------------------------

        const state = chatStates.get(userId);


        // ------------------------------------------------
        // STEP 4: User is providing Order ID
        // ------------------------------------------------

        if (state?.waitingFor === "ORDER_ID") {

            const orderId = userMessage;


            // Validate MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(orderId)) {

                return res.status(200).json({
                    success: true,
                    type: "ORDER_ID_REQUIRED",
                    answer:
                        "That doesn't look like a valid Order ID. Please enter a valid Order ID."
                });
            }


            // ------------------------------------------------
            // Find order belonging ONLY to authenticated user
            // ------------------------------------------------

            const order = await orderModel.findOne({
                _id: orderId,
                userId: userId
            }).lean();


            // ------------------------------------------------
            // Order not found
            // ------------------------------------------------

            if (!order) {

                return res.status(200).json({
                    success: true,
                    type: "ORDER_NOT_FOUND",
                    answer:
                        "I couldn't find an order with that Order ID. Please check the ID and try again."
                });
            }


            // ------------------------------------------------
            // Clear conversation state
            // ------------------------------------------------

            chatStates.delete(userId);


            // ------------------------------------------------
            // Format order
            // ------------------------------------------------

            const answer = formatOrder(order);


            return res.status(200).json({
                success: true,
                type: "ORDER_INFORMATION",
                answer,
                order: {
                    id: order._id,
                    status: order.status,
                    amount: order.amount,
                    payment: order.payment,
                    paymentMethod: order.paymentMethod,
                    date: order.date,
                    items: order.items,
                    address: order.address
                }
            });
        }


        // ------------------------------------------------
        // STEP 5: Detect new order query
        // ------------------------------------------------

        if (isOrderQuery(userMessage)) {

            chatStates.set(userId, {
                waitingFor: "ORDER_ID"
            });


            return res.status(200).json({
                success: true,
                type: "ORDER_ID_REQUIRED",
                answer:
                    "Sure! I can help you with your order. Please provide your Order ID."
            });
        }


        // ------------------------------------------------
        // STEP 6: RAG retrieval
        // ------------------------------------------------

        const docs = await retrieveDocs(userMessage);


        const context = docs
            .map(doc => doc.payload?.text || "")
            .filter(Boolean)
            .join("\n\n");


        // ------------------------------------------------
        // STEP 7: Ask LLM
        // ------------------------------------------------

        const answer = await askLLM(
            userMessage,
            context
        );


        // ------------------------------------------------
        // STEP 8: Return RAG response
        // ------------------------------------------------

        return res.status(200).json({
            success: true,
            type: "RAG_RESPONSE",
            answer
        });


    } catch (error) {

        console.error("Chat Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};