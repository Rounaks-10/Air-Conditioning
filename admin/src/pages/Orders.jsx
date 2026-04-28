import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {backendUrl} from "../App"
import { toast } from "react-toastify";

const Orders = ({token}) => {
  const [orders,setOrders] =useState([])

  const fetchAllOrders=async()=>{
    if(!token){
      return null;
    }
    try {
      const res= await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      if(res.data.success){
        console.log(res.data.orders)
        setOrders(res.data.orders)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    fetchAllOrders()
  },[token])

    const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        await fetchAllOrders(); // refresh
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  
    return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              {/* TOP */}
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <p className="font-semibold text-lg">
                  ₹{order.amount}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* ADDRESS */}
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  {order.address?.firstName}, {order.address?.city}
                </p>
                <p>{order.address?.phone}</p>
                <p  className="font-medium">Payment Method : {order.paymentMethod}</p>
              </div>

              {/* STATUS CONTROL */}
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium">
                  Status: {order.status}
                </span>
                

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}
export default Orders
