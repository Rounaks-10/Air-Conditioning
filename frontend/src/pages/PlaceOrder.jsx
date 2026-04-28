import React, { useState } from "react";
import { backendUrl } from "../App";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const cartItems = state?.cartItems || {};
  const products = state?.products || [];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  

  const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const orderItems = cartProductList.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id],
      image: item.images?.[0],
    }));

    // 🔥 COD FLOW
    if (paymentMethod === "COD") {
      const res = await axios.post(
        `${backendUrl}/api/order/place`,
        {
          items: orderItems,
          amount: total,
          address: formData,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.success) {
        toast.success("Order placed successfully");
        navigate("/orders");
      } else {
        toast.error(res.data.message);
      }
    }

    // 🔥 RAZORPAY FLOW
    else if (paymentMethod === "Razorpay") {
      const res = await axios.post(
        `${backendUrl}/api/order/razorpay`,
        {
          items: orderItems,
          amount: total,
          address: formData,
        },
        {
          headers: { Authorization: token },
        }
      );

      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔥 replace with env
        amount: order.amount,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          console.log(response)
          const verifyRes = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            {
              headers: { Authorization: token },
            }
          );

          if (verifyRes.data.success) {
            toast.success("Payment Successful");
            navigate("/orders");
          } else {
            toast.error("Payment Failed");
          }
        },

        theme: {
          color: "#005AAA",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
  const cartProductList = products.filter((p) => cartItems[p._id]);
  const total = cartProductList.reduce(
    (sum, item) => sum + item.price * cartItems[item._id],
    0,
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6"
      >
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">
          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                value={formData.firstName}
                placeholder="Full Name"
                onChange={handleChange}
                type="text"
                className="border p-3 rounded"
              />
              <input
                required
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                type="text"
                className="border p-3 rounded"
              />
              <input
                required
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                type="email"
                className="border p-3 rounded md:col-span-2"
              />
              <input
                required
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
                type="number"
                className="border p-3 rounded"
              />
              <input
                required
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={handleChange}
                type="text"
                className="border p-3 rounded"
              />
              <input
                required
                name="state"
                value={formData.state}
                placeholder="State"
                onChange={handleChange}
                type="text"
                className="border p-3 rounded"
              />
              <input
                required
                name="pincode"
                value={formData.pincode}
                placeholder="Pincode"
                onChange={handleChange}
                type="number"
                className="border p-3 rounded"
              />
              <input
                required
                name="country"
                value={formData.country}
                placeholder="Country"
                onChange={handleChange}
                type="text"
                className="border p-3 rounded"
              />
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Razorpay / UPI / Card
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Example Items (Replace with real cart data) */}
          <div className="space-y-3 text-sm max-h-60 overflow-y-auto">
            {cartProductList.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {cartItems[item._id]}
                </span>
                <span>₹{item.price * cartItems[item._id]}</span>
              </div>
            ))}
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 bg-[#005AAA] text-white py-3 rounded-lg font-medium hover:bg-[#003f76] transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
