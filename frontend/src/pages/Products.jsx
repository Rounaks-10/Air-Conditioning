import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import Pro_Navbar from "../components/Pro_Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation(); 

  const fetchHomeProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/listspecial`);

      if (res.data.success) {
        setNewProducts(res.data.newProducts);
        setOfferProducts(res.data.offerProducts);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      fetchHomeProducts();
    }
  }, [location.pathname]);

  const ProductCard = ({ p }) => {
  const discountPercent = p.discountPrice
    ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group border">
      
      {/* IMAGE + BADGES */}
      <div className="relative">
        <img
          src={p.images?.[0]}
          alt={p.name}
          className="w-full h-48 object-cover cursor-pointer transform group-hover:scale-105 transition duration-300"
          onClick={() => window.open(`/product/${p._id}`, "_blank")}
        />

        {/* NEW BADGE */}
        {p.newarrival && (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
            New
          </span>
        )}

        {/* OFFER BADGE */}
        {p.offer && discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* NAME */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
          {p.name}
        </h3>

        {/* BRAND */}
        <p className="text-xs text-gray-500 mt-1">
          {p.brand?.name}
        </p>

        {/* PRICE */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#005AAA]">
            ₹{p.discountPrice || p.price}
          </span>

          {p.discountPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{p.price}
            </span>
          )}
        </div>

        {/* SAVE TEXT */}
        {p.discountPrice && (
          <p className="text-xs text-green-600 mt-1 font-medium">
            You save ₹{p.price - p.discountPrice}
          </p>
        )}
      </div>
    </div>
  );
};

  return (
    <div className="bg-gray-50 min-h-screen">
      <Pro_Navbar />

      {/* ✅ ONLY SHOW ON MAIN PAGE */}
      {location.pathname === "/products" && (
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 space-y-12">
          {loading ? (
            <p className="text-center mt-10">Loading...</p>
          ) : (
            <>
              {/* 🆕 NEW ARRIVALS */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">New Arrivals</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {newProducts.length === 0 ? (
                    <p>No new products available</p>
                  ) : (
                    newProducts.map((p) => <ProductCard key={p._id} p={p} />)
                  )}
                </div>
              </div>

              {/* 🔥 OFFERS */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Top Deals & Offers
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {offerProducts.length === 0 ? (
                    <p>No offers available</p>
                  ) : (
                    offerProducts.map((p) => <ProductCard key={p._id} p={p} />)
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 🔥 Sub Routes */}
      <Outlet />
    </div>
  );
};

export default Products;
