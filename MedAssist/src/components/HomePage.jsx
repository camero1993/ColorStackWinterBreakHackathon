import React from 'react'
import logo from '../assets/logo.png'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center justify-center">
      <img 
        src={logo} 
        alt="MedAssist Logo" 
        className="w-32 h-32 object-contain mb-2 font-shrikhand" 
      />
      
      <h1 className="text-3xl font-bold mb-5 font-shrikhand">
        MedAssist
      </h1>
      
      <p className="text-lg mb-12 font-shrikhand">
        Track. Connect. Care
      </p>

      <button className="bg-black text-white px-8 py-3 rounded-full mb-4 w-48 hover:bg-gray-800 font-shrikhand">
        GET STARTED
      </button>

      <button className="bg-black text-white px-8 py-3 rounded-full w-48 hover:bg-gray-800 font-shrikhand">
        SIGN IN
      </button>
    </div>
  )
}
