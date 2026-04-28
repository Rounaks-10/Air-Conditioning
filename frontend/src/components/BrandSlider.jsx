import React from "react";

const brands = [
    { id: 1, img: "/bluestar.png" },
    { id: 2, img: "/hitachi.svg" },
    { id: 3, img: "/daikin.png" }
];

const BrandSlider = () => {
  return (
    <div className="py-10 bg-white">
      
      {/* 🔥 Heading */}
      <h2 className="text-center text-2xl font-bold text-[rgb(0,90,170)] mb-8">
        Our Trusted Brands
      </h2>

      {/* 🔁 Slider Wrapper */}
      <div className="overflow-hidden max-w-6xl mx-auto">
        
        {/* 🧠 Moving Track */}
        <div className="flex gap-12 animate-scroll">
          
          {/* Duplicate logos for infinite scroll */}
          {[...brands,...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[120px]"
            >
              <img
                src={brand.img}
                alt="brand"
                className="h-12 object-contain transition duration-300"
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default BrandSlider;