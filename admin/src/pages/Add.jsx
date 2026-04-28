import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [specRows, setSpecRows] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);

  // handle change
  const handleSpecChange = (index, field, value) => {
    const updated = [...specRows];
    updated[index][field] = value;
    setSpecRows(updated);
  };

  // add row
  const addRow = () => {
    setSpecRows([...specRows, { key: "", value: "" }]);
  };

  // remove row
  const removeRow = (index) => {
    const updated = specRows.filter((_, i) => i !== index);
    setSpecRows(updated);
  };
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
    newarrival: false,
    offer: false,
  });

  const [specs, setSpecs] = useState({});

  // handle text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // handle images
  const handleImage = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 🚨 prevent multiple clicks

    setLoading(true);

    const data = new FormData();
    const specsObject = {};

    specRows.forEach((row) => {
      if (row.key && row.value) {
        specsObject[row.key] = row.value;
      }
    });

    // append normal fields
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    // append images
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        data.append(key, images[key]);
      }
    });

    // append specs (IMPORTANT)
    // data.append("specs", JSON.stringify(specs));
    data.append("specs", JSON.stringify(specsObject));

    try {
      const res = await axios.post(backendUrl + "/api/product/add", data, {
        headers: { token },
      });

      // console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setForm({
          name: "",
          brand: "",
          category: "",
          subcategory: "",
          price: "",
          discountPrice: "",
          stock: "",
          description: "",
          newarrival: false,
          offer: false,
        });

        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });

        setSpecRows([{ key: "", value: "" }]);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false); // ✅ always reset
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      <h2 className="text-xl font-bold">Add Product</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        value={form.name}
        placeholder="Product Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        value={form.price}
        placeholder="Price"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Discount */}
      <input
        type="number"
        name="discountPrice"
        value={form.discountPrice}
        placeholder="Discount Price"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Stock */}
      <input
        type="number"
        name="stock"
        value={form.stock}
        placeholder="Stock"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        placeholder="Description"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Brand & Category (IDs for now) */}
      <input
        type="text"
        name="brand"
        value={form.brand}
        placeholder="Brand ID"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="text"
        name="category"
        value={form.category}
        placeholder="Category ID"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="subcategory"
        value={form.subcategory}
        placeholder="Subcategory (e.g. Split AC)"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Images */}
      <div>
        <p className="font-semibold">Upload Images</p>

        {["image1", "image2", "image3", "image4"].map((img) => (
          <input
            key={img}
            type="file"
            name={img}
            onChange={handleImage}
            className="block"
          />
        ))}
      </div>
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="newarrival"
            checked={form.newarrival}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">New Arrival</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="offer"
            checked={form.offer}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">On Offer</span>
        </label>
      </div>

      {/* Specs */}
      <div>
        <p className="font-semibold mb-2">Specifications</p>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Key</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {specRows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <input
                    type="text"
                    placeholder="e.g. Capacity"
                    value={row.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    className="w-full border p-1"
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    placeholder="e.g. 1.5 Ton"
                    value={row.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
                    className="w-full border p-1"
                  />
                </td>

                <td className="border p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addRow}
          className="mt-2 bg-gray-200 px-3 py-1"
        >
          + Add Spec
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white flex items-center gap-2 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
        }`}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
