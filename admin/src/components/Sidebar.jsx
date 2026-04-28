import React from 'react'
import { NavLink } from 'react-router-dom'
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Sidebar = () => {
  const handleDownload = () => {
    window.open(backendUrl+"/api/product/export", "_blank");
  };
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className={({ isActive }) =>
    `nav-link flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
      isActive ? "bg-[rgb(0,90,170)] text-white" : "text-[rgb(0,90,170)]"
    }`
  } to="/add">
        <img className='w-8 h-8' src='/src/assets/add_icon.png' alt='add'/>
        <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className={({ isActive }) =>
    `nav-link flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
      isActive ? "bg-[rgb(0,90,170)] text-white" : "text-[rgb(0,90,170)]"
    }`} to="/list">
        <img className='w-8 h-8' src='/src/assets/list_icon.png' alt='add'/>
        <p className=' hidden md:block'>List Items</p>
        </NavLink>

        <NavLink className={({ isActive }) =>
    `nav-link flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
      isActive ? "bg-[rgb(0,90,170)] text-white" : "text-[rgb(0,90,170)]"
    }`} to="/orders">
        <img className='w-8 h-8' src='/src/assets/list_icon.png' alt='add'/>
        <p className='hidden md:block'>Orders </p>
        </NavLink>

       <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Products
      </button>

      </div>
    </div>
  )
}

export default Sidebar
