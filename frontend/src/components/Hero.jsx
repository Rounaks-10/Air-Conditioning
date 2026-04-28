import React, { useEffect, useState } from "react";
import hero1 from "../assets/ac.jpg";
import hero2 from "../assets/cooler.jpg";
import hero3 from "../assets/water_cooler.png";
const slides = [
  {
    id: 1,
    img: hero1
  },
  {
    id: 2,
    img: hero2
  },
  {
    id: 3,
    img: hero3
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 h-full relative">
            {/* Image */}
            <img
              src={slide.img}
              alt="hero"
              className="w-full h-full object-contain"
            />
            
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
