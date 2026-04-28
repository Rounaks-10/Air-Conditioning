import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Projects from './pages/Projects'
import About from './pages/About'
import Navbar from './components/Navbar'
import Consultation from './pages/Consultation'
import Footer from './components/Footer'
import SubCategory from './pages/SubCategory'
import ProductDetails from './pages/ProductDetails'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Compare from './pages/Compare'

import { ToastContainer } from "react-toastify";
import PlaceOrder from './pages/PlaceOrder'
import Wishlist from './pages/Wishlist'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  return (
    <div className='max-w-full'>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}>
        <Route path=':subcategory' element={<SubCategory/>}/>
        </Route>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path="/compare" element={<Compare />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/consultation' element={<Consultation/>}/>
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path='orders' element={<Orders/>}/>
        <Route path="/place-order" element={<PlaceOrder/>} />
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
