import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ACLoader = () => {
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        scale: 0.7,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });

    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    dotsRef.current.forEach((dot, index) => {
      gsap.to(dot, {
        y: -8,
        opacity: 0.5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo Section */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          
          {/* Rotating Ring */}
          <svg
            ref={ringRef}
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="coolGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>

            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />

            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#coolGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="180 80"
            />
          </svg>

          {/* Glow */}
          <div className="absolute w-24 h-24 rounded-full bg-sky-200 blur-3xl opacity-50"></div>

          {/* Logo */}
          <img
            ref={logoRef}
            src="/S.svg" // Replace with your logo path
            alt="Logo"
            className="relative w-20 h-20 object-contain"
          />
        </div>


        {/* Loading Dots */}
        <div className="flex gap-2 mt-5">
          {[0, 1, 2].map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="w-3 h-3 rounded-full bg-sky-500"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ACLoader;