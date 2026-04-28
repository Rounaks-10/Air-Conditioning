import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const onSubmitHandler=async(e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
      <h1 className='text-2xl nav-link mb-4 text-[#005AAA]'>Admin Panel</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium mb-2  text-[#005AAA]'>Email Address</p><input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-blue-600 outline-none' type='email' placeholder='Enter email' required/>
        </div>
        <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium mb-2 text-[#005AAA]'>Password</p><input onChange={(e)=>setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-blue-600 outline-none' type='password' placeholder='Password' required/>
        </div>
        <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-[#005AAA]' type='submit'>Login </button>
      </form>
    </div>
    </div>
  )
}

export default Login
