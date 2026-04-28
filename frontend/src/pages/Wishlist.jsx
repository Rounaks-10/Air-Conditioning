import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Login first");
        return;
      }

      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId: product._id },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (res.data.success) {
        toast.success("Added to cart");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded-lg hover:shadow-lg bg-white"
            >
              <img
                src={p.images?.[0]}
                className="w-full h-36 object-cover rounded cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              />

              <h3 className="mt-3 text-sm font-semibold line-clamp-2">
                {p.name}
              </h3>

              <p className="text-gray-500 text-xs">{p.brand?.name}</p>

              <p className="font-bold mt-1">₹{p.price}</p>

              <div className="flex gap-2 mt-3">
                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(p)}
                  className="flex-1 bg-[#005AAA] text-white py-1.5 rounded text-sm font-medium hover:bg-[#003f76] transition"
                >
                  Add to Cart
                </button>

                {/* Remove */}
                <button
                  onClick={() => removeItem(p._id)}
                  className="flex-1 border border-gray-300 text-black py-1.5 rounded text-sm hover:bg-gray-100 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
