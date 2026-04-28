import React, { useState } from "react";
import { X } from "lucide-react";

const FilterSidebar = ({
  filters,
  handleFilterChange,
  searchParams,
  isOpen,
  setIsOpen,
  navigate,
  category,
}) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChecked = (key, val) => {
    const current = searchParams.get(key)?.split(",") || [];
    return current.includes(val);
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const clearFilters = () => {
    navigate(`?category=${category}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* 🔥 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#f8f9fb] z-50 shadow-2xl transform transition-transform duration-300
${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 🔥 Header */}
        <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Filters</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>

            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
        </div>

        {/* 🔥 Filter Sections */}
        <div className="p-4 overflow-y-auto h-[calc(100%-70px)] space-y-4">
          {Object.entries(filters).map(([key, values]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm border">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold"
              >
                {formatLabel(key)}
                <span className="text-lg">{openSections[key] ? "−" : "+"}</span>
              </button>

              {/* Dropdown */}
              {openSections[key] && (
                <div className="px-4 pb-3 space-y-2">
                  {values.map((val) => (
                    <label
                      key={val}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        className="accent-gray-800 w-4 h-4"
                        checked={isChecked(key, val)}
                        onChange={(e) =>
                          handleFilterChange(key, val, e.target.checked)
                        }
                      />
                      {val}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
