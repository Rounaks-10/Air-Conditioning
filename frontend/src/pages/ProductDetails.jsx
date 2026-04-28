import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/product/single/${id}`
      );

      if (res.data.success) {
        setProduct(res.data.product);
        console.log(res.data.product);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = async (product) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login first")
      return;
    }

    const res = await axios.post(
      `${backendUrl}/api/cart/add`,
      { itemId: product._id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.data.success) {
      toast.success("Added to cart");
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Error adding to cart");
  }
};

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* LEFT: IMAGE SECTION */}
        <div className="flex gap-4">
          
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-96">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  activeImage === i ? "border-blue-600" : ""
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={product.images?.[activeImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-600 mb-2">
            Brand: <span className="font-medium">{product.brand?.name}</span>
          </p>

          <p className="text-gray-600 mb-2">
            Category:{" "}
            <span className="font-medium">{product.category?.name}</span>
          </p>

          {/* Price */}
          <p className="text-3xl font-bold text-[#005AAA] mb-4">
            ₹{product.price}
          </p>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={() => handleAddToCart(product)} className="bg-[#005AAA] text-white px-6 py-3 rounded hover:bg-[#003f76]">
              Add to Cart
            </button>

            <button className="border border-[#005AAA] text-[#005AAA] px-6 py-3 rounded hover:bg-blue-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS TABLE */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Specifications
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <tbody>
              {product.specs &&
                Object.entries(product.specs).map(([key, value], index) => (
                  <tr
                    key={key}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="p-3 font-medium w-1/3 border">
                      {key}
                    </td>
                    <td className="p-3 border">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;