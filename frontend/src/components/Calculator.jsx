import React, { useState } from "react";
import {
  Calculator,
  Sun,
  Users,
  Building2,
} from "lucide-react";

const TonnageCalculator = () => {
  const [form, setForm] = useState({
    length: "",
    width: "",
    height: "",
    people: "",
    sunlight: "medium",
    floor: "middle",
    roomType: "bedroom",
    windows: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTonnage = () => {
    const length = Number(form.length);
    const width = Number(form.width);
    const height = Number(form.height);

    if (!length || !width || !height) return;

    // Room Area
    const area = length * width;

    // Base BTU
    let btu = area * 25;

    // Height adjustment
    if (height > 10) {
      btu += (height - 10) * 1000;
    }

    // People adjustment
    btu += (form.people - 1) * 600;

    // Sunlight adjustment
    if (form.sunlight === "high") {
      btu += 3000;
    } else if (form.sunlight === "medium") {
      btu += 1500;
    }

    // Top floor adjustment
    if (form.floor === "top") {
      btu += 4000;
    }

    // Windows adjustment
    btu += form.windows * 500;

    // Room type adjustment
    if (form.roomType === "living") {
      btu += 2000;
    }

    if (form.roomType === "office") {
      btu += 3000;
    }

    // Convert BTU → Ton
    const tonnage = btu / 12000;

    let recommended = "";

    if (tonnage <= 1) {
      recommended = "1 Ton";
    } else if (tonnage <= 1.5) {
      recommended = "1.5 Ton";
    } else if (tonnage <= 2) {
      recommended = "2 Ton";
    } else if (tonnage <= 2.5) {
      recommended = "2.5 Ton";
    } else {
      recommended = "3 Ton";
    }

    setResult({
      area,
      btu: Math.round(btu),
      tonnage: tonnage.toFixed(2),
      recommended,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-[#005AAA] text-white p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Calculator size={40} />
            <h2 className="text-3xl font-bold">
              AC Tonnage Calculator
            </h2>
          </div>

          <p className="text-blue-100 leading-7">
            Calculate the perfect AC capacity for your room
            based on room size, sunlight, floor level,
            people count, and usage.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <Sun />
              <span>Sunlight Heat Analysis</span>
            </div>

            <div className="flex items-center gap-3">
              <Users />
              <span>Occupancy Based Cooling</span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 />
              <span>Floor & Room Type Adjustments</span>
            </div>
            <div className="flex items-center gap-3">
            <p className="mt-4 text-sm text-blue-100 leading-7">
  *This is an approximate AC tonnage calculation based on
  standard room conditions. Actual tonnage requirements may
  vary depending on insulation, climate, sunlight exposure,
  appliances, ceiling type, ventilation, and other environmental
  factors. However, the recommendation is generally close to
  real-world AC sizing requirements.*
</p>
</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-6">
            Enter Room Details
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="length"
              placeholder="Length (ft)"
              value={form.length}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="number"
              name="width"
              placeholder="Width (ft)"
              value={form.width}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="number"
              name="height"
              placeholder="Height (ft)"
              value={form.height}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="number"
              name="people"
              placeholder="People"
              value={form.people}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* Sunlight */}
            <select
              name="sunlight"
              value={form.sunlight}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="low">Low Sunlight</option>
              <option value="medium">Medium Sunlight</option>
              <option value="high">High Sunlight</option>
            </select>

            {/* Floor */}
            <select
              name="floor"
              value={form.floor}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="ground">Ground Floor</option>
              <option value="middle">Middle Floor</option>
              <option value="top">Top Floor</option>
            </select>

            {/* Room Type */}
            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="bedroom">Bedroom</option>
              <option value="living">Living Room</option>
              <option value="office">Office</option>
            </select>

            {/* Windows */}
            <input
              type="number"
              name="windows"
              placeholder="Windows Count"
              value={form.windows}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={calculateTonnage}
            className="w-full mt-6 bg-[#005AAA] hover:bg-[#004080] transition text-white py-4 rounded-xl font-semibold text-lg"
          >
            Calculate Tonnage
          </button>

          {/* RESULT */}
          {result && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                
              <h3 className="text-2xl font-bold text-[#005AAA] mb-4">
                Recommended AC
              </h3>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Room Area:</strong>{" "}
                  {result.area} sq.ft
                </p>

                <p>
                  <strong>Estimated BTU:</strong>{" "}
                  {result.btu}
                </p>

                <p>
                  <strong>Calculated Tonnage:</strong>{" "}
                  {result.tonnage} Ton
                </p>

                <p className="text-xl font-bold text-green-600">
                  Recommended: {result.recommended}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TonnageCalculator;