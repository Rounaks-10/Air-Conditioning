import React from "react";
import room from "../assets/room-AC.jpg";
import airpurifier from "../assets/Air-Purifier.jpg";
import waterpurifier from "../assets/Water-Purifier.jpg";
import industry from "../assets/industry.jpg";
import water from "../assets/water.png";
import img1 from "../assets/project-thumb.jpg";
import img2 from "../assets/product-thumb-4.jpg";
import airshaft from "../assets/project.jpg";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const navigate= useNavigate()
  return (
    <div className="home_category py-18 bg-gray-100">
      <div className="product_category max-w-6xl mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={room}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div onClick={() => navigate("/products/split-ac")} className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>

          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={waterpurifier}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Water Purifiers
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                Presenting a range of water purifiers, obsessed with purity.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>

          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={airpurifier}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
               Air Purifiers
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                An array of purifiers built with superior technology for clean and healthy air in your home..
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={industry}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={water}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
        <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={img1}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={img2}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
          <li className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image on top */}
            <div className="category h-48 w-full overflow-hidden">
              <img
                src={airshaft}
                alt="Room Air Conditioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description at bottom */}
            <div className="cate_desp p-4">
              <h1 className="text-lg font-semibold mb-2">
                Room Air Conditioner
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                The most technologically advanced and energy efficient air
                conditioning solutions for small spaces.
              </p>
              <div className="viewMore text-blue-600 font-medium cursor-pointer hover:underline">
                View Products
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Category;