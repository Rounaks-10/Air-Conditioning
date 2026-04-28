import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setlist] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data);
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove/${id}`,
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <p>All Products List</p>
      
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-small"
            key={index}
          >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name}</p>
            <p>Rs.{item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
