// components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!text.trim()) return;

    navigate(`/products?search=${text}`);
  };

  return (
    <div className="flex w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search AC, Refrigerators, etc..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border px-4 py-2 rounded-l-lg outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-[#005AAA] text-white px-6 rounded-r-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
