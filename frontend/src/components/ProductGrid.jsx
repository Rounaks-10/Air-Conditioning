import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterSidebar from "./FilterSidebar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ProductGrid = ({ category, title }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Dynamic filter logic start
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const fetchFilters = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/product/filters?category=${category}`,
      );

      if (res.data.success) {
        setFilters(res.data.filters);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilterChange = (key, value, checked) => {
    const params = new URLSearchParams(searchParams.toString());

    let currentValues = params.get(key)?.split(",") || [];

    if (checked) {
      currentValues.push(value);
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    if (currentValues.length > 0) {
      params.set(key, currentValues.join(","));
    } else {
      params.delete(key);
    }

    navigate(`?${params.toString()}`);
  };
  useEffect(() => {
    fetchFilters();
  }, [category]);

  // end

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams(searchParams.toString());

      // 🔥 ensure category always applied
      if (!query.get("category")) {
        query.set("category", category);
      }

      const res = await axios.get(
        `${backendUrl}/api/product/list?${query.toString()}`,
      );

      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, category]);

  // Compare
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) return prev.filter((p) => p._id !== product._id);

      if (prev.length >= 3) {
        alert("Max 3 products allowed");
        return prev;
      }

      return [...prev, product];
    });
  };

  // Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      let updated;

      if (exists) {
        updated = prev.filter((p) => p._id !== product._id);
      } else {
        updated = [...prev, product];
      }

      localStorage.setItem("wishlist", JSON.stringify(updated)); // 🔥 persist

      return updated;
    });
  };

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

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
    <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#005AAA] text-white rounded-md hover:bg-[#004080] transition"
      >
        {/* SVG ICON */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z"
            fill="white"
          />
        </svg>
        Filters
      </button>
      <FilterSidebar
        filters={filters}
        handleFilterChange={handleFilterChange}
        searchParams={searchParams}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        navigate={navigate}
        category={category}
      />
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const isCompared = compareList.some((i) => i._id === p._id);
          const isWishlisted = wishlist.some((i) => i._id === p._id);

          return (
            <div
              key={p._id}
              className="border p-4 rounded-lg hover:shadow-xl transition relative bg-white"
            >
              {/* ❤️ Wishlist */}
              <div className="absolute top-2 left-2 cursor-pointer">
                <span
                  onClick={() => toggleWishlist(p)}
                  className={`text-xl ${
                    isWishlisted ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  ♥
                </span>
              </div>

              {/* Compare */}
              <div className="absolute top-2 right-2">
                <label className="text-xs flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCompared}
                    onChange={() => toggleCompare(p)}
                  />
                  Compare
                </label>
              </div>

              {/* Image */}
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="w-full h-36 object-cover rounded cursor-pointer"
                onClick={() => window.open(`/product/${p._id}`, "_blank")}
              />

              {/* Info */}
              <div className="mt-3">
                <h3 className="font-semibold text-sm line-clamp-2">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.brand?.name}</p>
                <p className="text-xs text-gray-500">{p.category?.name}</p>
                <p className="font-bold mt-1 text-lg">₹{p.price}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => window.open(`/product/${p._id}`, "_blank")}
                  className="flex-1 border px-2 py-1 text-sm rounded hover:bg-gray-100"
                >
                  View More
                </button>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="flex-1 bg-[#005AAA] text-white px-2 py-1 text-sm rounded hover:bg-[#003f76]"
                >
                  Add Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare Bar */}
      {compareList.length > 1 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg px-6 py-3 flex justify-between items-center z-50">
          <div className="flex gap-4 overflow-x-auto">
            {compareList.map((item) => (
              <div
                key={item._id}
                className="relative w-[190px] bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* Close button */}
                <button
                  onClick={() =>
                    setCompareList((prev) =>
                      prev.filter((i) => i._id !== item._id),
                    )
                  }
                  className="absolute top-2 right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-500"
                >
                  ✕
                </button>

                

                {/* Content */}
                <div className="p-2 flex flex-col gap-1">
                  {/* Title */}
                  <span className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </span>

                  {/* Price */}
                  <span className="text-base font-bold text-black">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCompareList([])}
              className="px-3 py-1 border rounded"
            >
              Clear
            </button>

            <button
              onClick={() => navigate("/compare", { state: compareList })}
              className="px-4 py-1 bg-black text-white rounded"
            >
              Compare Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
