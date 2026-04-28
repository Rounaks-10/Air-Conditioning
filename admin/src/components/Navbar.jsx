import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
       <div className="nav-link">
          <h6 className="text-[rgb(0,90,170)] font-bold">Shraddha</h6>
          <h6 className="text-[rgb(0,90,170)] font-bold">Engineering</h6>
        </div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
