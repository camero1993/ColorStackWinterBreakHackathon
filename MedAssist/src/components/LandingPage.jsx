import {useNavigate} from 'react-router-dom';
import React from 'react'
import logo from '../assets/logo.png'

export default function LandingPage() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };
  const handleSignIn = () => {
    navigate('/signin');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="animate-fade-in-down flex flex-col items-center">
        <img 
          src={logo} 
          alt="MedAssist Logo" 
          className="w-40 h-40 object-contain mb-2 drop-shadow-lg hover:scale-105 transition-transform duration-300" 
        />
        
        <h1 className="text-5xl font-bold mb-4 font-shrikhand text-white text-center">
          MedAssist
        </h1>
        
        <p className="text-xl mb-12 font-shrikhand text-white/90 text-center">
          Track. Connect. Care
        </p>

        <div className="space-y-4 w-64 mx-auto">
          <button 
            onClick={handleGetStarted} 
            className="w-full bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            Get Started
          </button>

          <button 
            onClick={handleSignIn} 
            className="w-full bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}