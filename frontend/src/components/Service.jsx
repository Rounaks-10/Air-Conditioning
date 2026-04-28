import React, { useState } from "react";
import { Wrench, Settings, RefreshCcw, Flame } from "lucide-react";

const services = [
  {
    icon: <Settings size={28} />,
    title: "Installation",
    desc: "Quick and professional AC installation at your home",
  },
  {
    icon: <Wrench size={28} />,
    title: "Repair",
    desc: "Expert technicians to fix all AC issues",
  },
  {
    icon: <RefreshCcw size={28} />,
    title: "AMC",
    desc: "Annual maintenance plans for worry-free cooling",
  },
  {
    icon: <Flame size={28} />,
    title: "Gas Refill",
    desc: "Efficient gas top-up for optimal cooling performance",
  },
];

const Service = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // later connect to backend
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

        {/* 🔥 LEFT SIDE (INFO) */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,90,170)] mb-4">
            Our Services
          </h2>
          <p className="text-gray-500 mb-6">
            Reliable AC services at your doorstep with expert technicians.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {services.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition"
              >
                <div className="text-[rgb(0,90,170)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🎯 RIGHT SIDE (FORM) */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[rgb(0,90,170)]">
            Book a Service
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select Service</option>
              <option>Installation</option>
              <option>Repair</option>
              <option>AMC</option>
              <option>Gas Refill</option>
            </select>

            <button
              type="submit"
              className="bg-[rgb(0,90,170)] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book Service
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Service;