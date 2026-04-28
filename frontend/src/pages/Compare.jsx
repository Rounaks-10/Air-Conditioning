import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const products = location.state || [];

  if (products.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">No products to compare</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-[#005AAA] text-white px-4 py-2 rounded"
        >
          Go to Products
        </button>
      </div>
    );
  }

  // 🔥 collect all unique spec keys
  const allSpecs = new Set();
  products.forEach((p) => {
    Object.keys(p.specs || {}).forEach((key) => allSpecs.add(key));
  });

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Compare Products
      </h2>

      <table className="min-w-full border text-sm bg-white shadow rounded-lg">
        
        {/* 🔥 HEADER */}
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-3 border text-left">Feature</th>
            {products.map((p) => (
              <th key={p._id} className="p-3 border text-center">
                <img
                  src={p.images?.[0]}
                  className="w-24 h-24 object-cover mx-auto mb-2"
                />
                <p className="font-semibold text-xs">{p.name}</p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {/* PRICE */}
          <tr>
            <td className="p-3 border font-medium">Price</td>
            {products.map((p) => (
              <td key={p._id} className="p-3 border text-center">
                ₹{p.discountPrice || p.price}
              </td>
            ))}
          </tr>

          {/* BRAND */}
          <tr>
            <td className="p-3 border font-medium">Brand</td>
            {products.map((p) => (
              <td key={p._id} className="p-3 border text-center">
                {p.brand?.name}
              </td>
            ))}
          </tr>

          {/* CATEGORY */}
          <tr>
            <td className="p-3 border font-medium">Category</td>
            {products.map((p) => (
              <td key={p._id} className="p-3 border text-center">
                {p.category?.name}
              </td>
            ))}
          </tr>

          {/* 🔥 DYNAMIC SPECS */}
          {[...allSpecs].map((specKey) => (
            <tr key={specKey}>
              <td className="p-3 border font-medium">{specKey}</td>
              {products.map((p) => (
                <td key={p._id} className="p-3 border text-center">
                  {p.specs?.[specKey] || "-"}
                </td>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default Compare;