import React from 'react'
import orbitLogo from '../assets/orbit-logo.png';
import uberLogo from '../assets/uber-logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-6 w-full flex justify-between flex-col bg-red-400'>
            {/* <img className='w-16 ml-8' src={uberLogo} alt="orbit-logo" /> */}
            <h2 className='w-16 ml-5 text-xl font-bold'>Orbit</h2>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get started with Orbit</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home