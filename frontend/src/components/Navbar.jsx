import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import searchIcon from "../assets/search_svg.svg";
import Profile from "../assets/profile_svg.svg";
import { gsap } from "gsap";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { navigate, token, setToken } = useContext(AppContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex items-center justify-between px-10 py-5 bg-white shadow">
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(true)}>☰</button>
        </div>
        <div className="nav-link">
          <h6 className="text-[rgb(0,90,170)] font-bold">Shraddha</h6>
          <h6 className="text-[rgb(0,90,170)] font-bold">Engineering</h6>
        </div>

        <ul className="nav-link hidden md:flex gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-[#005AAA] text-white" : "text-[#005AAA] hover:bg-[#005AAA] hover:text-white"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-[#005AAA] text-white" : "text-[#005AAA] hover:bg-[#005AAA] hover:text-white"}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-[#005AAA] text-white" : "text-[#005AAA] hover:bg-[#005AAA] hover:text-white"}`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/consultation"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-[#005AAA] text-white" : "text-[#005AAA] hover:bg-[#005AAA] hover:text-white"}`
            }
          >
            Consultation
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-300 
      ${isActive ? "bg-[#005AAA] text-white" : "text-[#005AAA] hover:bg-[#005AAA] hover:text-white"}`
            }
          >
            Contact
          </NavLink>
        </ul>
        <div className="flex items-center gap-6">
          {/* <img src={searchIcon} className="w-5 cursor-pointer" alt="search" /> */}
          <img className="w-7 h-7" onClick={() => navigate("/wishlist")} src="/heart.png" alt=""/>
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={Profile}
              alt=""
            />

            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    LogOut
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <svg
              width="26px"
              height="26px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16.5"
                cy="18.5"
                r="2.5"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
              />
              <circle
                cx="9.5"
                cy="18.5"
                r="2.5"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
              />
              <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
            </svg>
            {/* <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              10
            </p> */}
          </Link>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 
  transform transition-transform duration-300 
  ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <div className="p-5 flex justify-end">
          <button onClick={() => setMobileMenu(false)}>✕</button>
        </div>

        {/* NavLinks */}
        <div className="nav-link text-[rgb(0,90,170)] flex flex-col gap-4 px-6 text-lg">
          <NavLink
            className={`mobile-nav-item ${mobileMenu ? "show" : ""}`}
            to="/"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={`mobile-nav-item ${mobileMenu ? "show" : ""}`}
            to="/products"
            onClick={() => setMobileMenu(false)}
          >
            Products
          </NavLink>
          <NavLink
            className={`mobile-nav-item ${mobileMenu ? "show" : ""}`}
            to="/projects"
            onClick={() => setMobileMenu(false)}
          >
            Projects
          </NavLink>
          <NavLink
            className={`mobile-nav-item ${mobileMenu ? "show" : ""}`}
            to="/consultation"
            onClick={() => setMobileMenu(false)}
          >
            Consultation
          </NavLink>
          <NavLink
            className={`mobile-nav-item ${mobileMenu ? "show" : ""}`}
            to="/contact"
            onClick={() => setMobileMenu(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileMenu(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
