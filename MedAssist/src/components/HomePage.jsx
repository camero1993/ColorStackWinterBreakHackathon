import React from 'react'
import signupBackground from '../assets/signup_background.webp'
import accountLogo from '../assets/account_logo.webp'
import appointmentsLogo from '../assets/appointments_logo.webp'
import settingsLogo from '../assets/settings_logo.webp'
import medassistAILogo from '../assets/medassistAI_logo.webp'
import {useNavigate} from "react-router-dom";

export default function HomePage() {

  const navigator = useNavigate();

  const handleMedAssist = () => {
    navigator('/medassist')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-12">Welcome Back</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Account', icon: accountLogo, onClick: () => {} },
            { title: 'Appointments', icon: appointmentsLogo, onClick: () => {} },
            { title: 'Settings', icon: settingsLogo, onClick: () => {} },
            { title: 'MedAssistAI', icon: medassistAILogo, onClick: handleMedAssist },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center gap-4 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <p className="text-xl font-semibold text-gray-800">{item.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
