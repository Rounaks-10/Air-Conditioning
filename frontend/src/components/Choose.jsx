import React from "react";
import { ShieldCheck, Zap, Wrench, BadgeIndianRupee } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Authorized Dealer",
    desc: "100% genuine products with official warranty",
  },
  {
    icon: <Zap size={32} />,
    title: "Same Day Installation",
    desc: "Quick & hassle-free setup at your doorstep",
  },
  {
    icon: <Wrench size={32} />,
    title: "Free Service Support",
    desc: "Reliable after-sales service you can trust",
  },
  {
    icon: <BadgeIndianRupee size={32} />,
    title: "Best Price Guarantee",
    desc: "Unbeatable prices with best deals available",
  },
];

const Choose = () => {
  return (
    <div className="py-10 bg-gray-50">
      
      {/* 🔥 Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,90,170)]">
          Why Choose Us
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Trusted by thousands of customers across India
        </p>
      </div>

      {/* 🚀 Features Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
          >
            {/* Icon */}
            <div className="text-[rgb(0,90,170)] mb-4">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-sm md:text-base mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-500">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Choose;