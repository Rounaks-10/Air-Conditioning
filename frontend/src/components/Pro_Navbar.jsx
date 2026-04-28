import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import filtersConfig from "../config/filterconfig";
import { gsap } from "gsap";

const Pro_Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const colsRef = useRef([]);
  const colsRef1 = useRef([]);
  const colsRef2 = useRef([]);
  const colsRef3 = useRef([])



  useEffect(() => {
    if (openMenu === "ac") {
      gsap.fromTo(
        colsRef.current,
        {
          x: 100, // start from right
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15, // one after another 🔥
          ease: "power3.out",
        },
      );
    }
  }, [openMenu]);
  useEffect(() => {
    if (openMenu === "ap") {
      gsap.fromTo(
        colsRef1.current,
        {
          x: 100, // start from right
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15, // one after another 🔥
          ease: "power3.out",
        },
      );
    }
  }, [openMenu]);
  useEffect(() => {
    if (openMenu === "ref") {
      gsap.fromTo(
        colsRef2.current,
        {
          x: 100, // start from right
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15, // one after another 🔥
          ease: "power3.out",
        },
      );
    }
  }, [openMenu]);
  useEffect(() => {
    if (openMenu === "wp") {
      gsap.fromTo(
        colsRef3.current,
        {
          x: 100, // start from right
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15, // one after another 🔥
          ease: "power3.out",
        },
      );
    }
  }, [openMenu]);
  return (
    <>
      <div className="relative " onMouseLeave={() => setOpenMenu(null)}>
        {/* Navbar */}
        <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-5 bg-white shadow">
          <ul className="nav-link flex justify-center flex-wrap md:flex-nowrap gap-3 md:gap-6 text-sm w-full">
            <li
              onMouseEnter={() => {
                setOpenMenu("ac");
              }}
              className="flex-1 md:flex-none text-center px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#005AAA] text-white hover:bg-[#003f76] cursor-pointer"
            >
              Air Conditioner
            </li>

            <li
              onMouseEnter={() => {
                setOpenMenu("ap");
              }}
              className="flex-1 md:flex-none text-center px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#005AAA] text-white hover:bg-[#003f76] cursor-pointer"
            >
              Air Purifiers
            </li>

            <li
              onMouseEnter={() => {
                setOpenMenu("wp");
              }}
              className="flex-1 md:flex-none text-center px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#005AAA] text-white hover:bg-[#003f76] cursor-pointer"
            >
              Water Purifiers
            </li>

            <li
              onMouseEnter={() => {
                setOpenMenu("ref");
              }}
              className="flex-1 md:flex-none text-center px-3 py-2 md:px-4 md:py-2 rounded-md bg-[#005AAA] text-white hover:bg-[#003f76] cursor-pointer"
            >
              Refrigerations
            </li>
          </ul>
        </div>

        {/* FULL WIDTH DROPDOWN */}
        <div
          className={`
          absolute left-0 top-full w-full bg-white shadow-lg
          transition-all duration-300 ease-in-out z-100
          ${
            openMenu === "ac"
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 invisible"
          }
        `}
        >
          <div className="max-w-7xl mx-auto flex gap-20 p-10">
            {/* Column 1 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef.current[0] = el)}>
              <NavLink to="/products/split-ac">
              <p className=" nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
               Split ACs
              </p>
              </NavLink>
              <NavLink to="/products/window-ac">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Window ACs
              </p>
              </NavLink>
              <NavLink to="/products/industrial-ac">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Industrial ACs
              </p>
              </NavLink>
            </div>

            {/* Column 2 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef.current[1] = el)}>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Window ACs</p>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Brochures</p>
            </div>

            {/* Image */}
            <div ref={(el) => (colsRef.current[2] = el)}>
              <img src="/ac_img1.jpg" alt="AC" className="rounded-lg" />
            </div>
            <div ref={(el) => (colsRef.current[3] = el)}>
              <img src="/ac_img2.webp" alt="AC" className="rounded-lg" />
            </div>
          </div>
        </div>

        <div
          className={`
          absolute left-0 top-full w-full bg-white shadow-lg
          transition-all duration-300 ease-in-out z-100
          ${
            openMenu === "ap"
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 invisible"
          }
        `}
        >
          <div className="max-w-7xl mx-auto flex gap-20 p-10">
            {/* Column 1 */}
           <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef1.current[0] = el)}>
              <NavLink to="/products/">
              <p className=" nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
               Desert Air coolers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Window Air Coolers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Personal Air Coolers
              </p>
              </NavLink>
            </div>

            {/* Column 2 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef1.current[1] = el)}>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Tower air Coolers</p>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Brochures</p>
            </div>

            {/* Image */}
            <div ref={(el) => (colsRef1.current[2] = el)}>
              <img src="/ap1.webp" alt="AC" className="rounded-lg" />
            </div>
            <div ref={(el) => (colsRef1.current[3] = el)}>
              <img src="/ap2.webp" alt="AC" className="rounded-lg" />
            </div>
          </div>
        </div>
         
        <div
          className={`
          absolute left-0 top-full w-full bg-white shadow-lg
          transition-all duration-300 ease-in-out z-100
          ${
            openMenu === "ref"
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 invisible"
          }
        `}
        >
          <div className="max-w-7xl mx-auto flex gap-20 p-10">
            {/* Column 1 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef2.current[0] = el)}>
              <NavLink to="/products/">
              <p className=" nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
               Deep Freezers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Visi Coolers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Mini Bar
              </p>
              </NavLink>
            </div>

            {/* Column 2 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef2.current[1] = el)}>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Bottled Water Dispensers</p>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Brochures</p>
            </div>

            {/* Image */}
            <div ref={(el) => (colsRef2.current[2] = el)}>
              <img src="/ref.webp" alt="AC" className="rounded-lg" />
            </div>
          </div>
        </div>
        <div
          className={`
          absolute left-0 top-full w-full bg-white shadow-lg
          transition-all duration-300 ease-in-out z-100
          ${
            openMenu === "wp"
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-5 invisible"
          }
        `}
        >
          <div className="max-w-7xl mx-auto flex gap-20 p-10">
            {/* Column 1 */}
           <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef3.current[0] = el)}>
              <NavLink to="/products/">
              <p className=" nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
               Desert Air coolers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Window Air Coolers
              </p>
              </NavLink>
              <NavLink to="/products/">
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">
                Personal Air Coolers
              </p>
              </NavLink>
            </div>

            {/* Column 2 */}
            <div className="w-56  flex flex-col gap-10" ref={(el) => (colsRef3.current[1] = el)}>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Tower air Coolers</p>
              <p className="nav-link text-[#005AAA] hover:text-blue-500 cursor-pointer">Brochures</p>
            </div>

            {/* Image */}
            <div ref={(el) => (colsRef3.current[2] = el)}>
              <img src="/ap1.webp" alt="AC" className="rounded-lg" />
            </div>
            <div ref={(el) => (colsRef3.current[3] = el)}>
              <img src="/ap2.webp" alt="AC" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Pro_Navbar;
