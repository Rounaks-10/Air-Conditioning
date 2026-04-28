import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      if (res.data.success) {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🎨 Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-600";
      case "Shipped":
        return "bg-yellow-100 text-yellow-600";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-8">My Orders</h2>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">No orders yet 🛒</p>
            <p className="text-sm mt-2">
              Start shopping to see your orders here
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >

                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                    <p className="text-lg font-semibold">
                      ₹{order.amount}
                    </p>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mt-4 space-y-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-16 object-cover rounded border"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-2">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentMethod}
                  </p>

                  <button className="text-[#005AAA] text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;