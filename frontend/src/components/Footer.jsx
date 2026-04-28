import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgb(0,90,170)] text-white pt-12">
      {/* 🔝 TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        {/* 🏢 Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Shraddha Engineering</h2>
          <p className="text-sm text-gray-200">
            Trusted AC dealer providing top brands, installation, and reliable
            service solutions for your home and business.
          </p>
        </div>

        {/* 📂 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-200">
            <li>
              <NavLink to="/" className="hover:text-white cursor-pointer">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-white cursor-pointer">
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className="hover:text-white cursor-pointer"
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className="hover:text-white cursor-pointer"
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className="hover:text-white cursor-pointer"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 🛠 Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-200">
            <li>AC Installation</li>
            <li>AC Repair</li>
            <li>AMC Plans</li>
            <li>Gas Refill</li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

          <div className="flex items-center gap-2 text-sm text-gray-200 mb-2">
            <Phone size={16} /> +91 9876543210
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-200 mb-2">
            <Mail size={16} /> contact@gmail.com
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-200">
            <MapPin size={16} /> Nashik, Maharashtra, India
          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM SECTION */}
      <div className="border-t border-blue-400 mt-10">
        <p className="text-center text-sm py-5 text-gray-200">
          © 2026 Shraddha Engineering. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
