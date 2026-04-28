import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: token } },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, quantity },
        { headers: { Authorization: token } },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCart();
      await fetchProducts();
      setLoading(false);
    };
    loadData();
  }, []);

  const cartProductList = products.filter((p) => cartItems[p._id]);

  const total = cartProductList.reduce(
    (sum, item) => sum + item.price * cartItems[item._id],
    0,
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Shopping Cart ({cartProductList.length})
          </h2>

          {cartProductList.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              {/* 🛒 Icon */}
              <div className="text-6xl mb-4">🛒</div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>

              {/* Subtitle */}
              <p className="text-gray-500 mb-6">
                Looks like you haven’t added anything yet
              </p>

              {/* Button */}
              <button
                onClick={() => navigate("/products")}
                className="bg-[#005AAA] text-white px-6 py-3 rounded-lg hover:bg-[#003f76] transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartProductList.map((item) => (
                <div key={item._id} className="flex gap-5 border-b pb-5">
                  {/* Image */}
                  <img
                    src={item.images?.[0]}
                    className="w-28 h-28 object-cover rounded-lg border"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">₹{item.price}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, cartItems[item._id] - 1)
                        }
                        className="w-8 h-8 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="font-medium">{cartItems[item._id]}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, cartItems[item._id] + 1)
                        }
                        className="w-8 h-8 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => updateQuantity(item._id, 0)}
                      className="text-red-500 text-sm mt-3 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-lg">
                    ₹{item.price * cartItems[item._id]}
                  </div>
                </div>
              ))}
            </div>
            
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        {cartProductList.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-10">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/place-order", {
                state: {
                  cartItems,
                  products,
                },
              })
            }
            className="w-full mt-6 bg-[#005AAA] text-white py-3 rounded-lg font-medium hover:bg-[#003f76] transition"
          >
            Proceed to Checkout
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
