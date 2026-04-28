import orderModel from "../models/orders.model.js";
import userModel from "../models/user.model.js"
import razorpay from 'razorpay'
import crypto from "crypto";

const razorpayInstance=new razorpay({
  key_id : process.env.RAZORPAY_API_KEY,
  key_secret : process.env.RAZORPAY_SECRET_KEY
})

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {};

const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "RazorPay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options={
      amount:amount*100,
      currency:"INR",
      receipt: newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error)
        return res.json({success:false,message:error})
      }
      res.json({success:true,order})
    });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1. Generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    //  2. Verify signature
    if (expectedSignature === razorpay_signature) {

      //  3. Find order using receipt
      const razorpayOrder = await razorpayInstance.orders.fetch(razorpay_order_id);

      const orderId = razorpayOrder.receipt; // 👈 this is your Mongo _id

      //  4. Update order payment status
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true
      });

      //  5. Clear user cart
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      return res.json({
        success: true,
        message: "Payment Verified & Order Placed",
      });

    } else {
      return res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const placeOrderQR = async (req, res) => {};

const allOrders = async (req, res) => {
    try {
        const orders=await  orderModel.find({}).sort({ date: -1 });
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // 🔥 filter logic applied here
    const orders = await orderModel
      .find({
        userId,
        $or: [
          { paymentMethod: "COD" },        // always include COD
          { payment: true }                // include only paid Razorpay
        ],
      })
      .sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // 🔥 validation
    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    // 🔥 update order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  placeOrderQR,
  allOrders,
  userOrders,
  updateStatus,
};
