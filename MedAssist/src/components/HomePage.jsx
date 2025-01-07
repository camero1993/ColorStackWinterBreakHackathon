import React from 'react'
import signupBackground from '../assets/signup_background.webp'
import accountLogo from '../assets/account_logo.webp'
import appointmentsLogo from '../assets/appointments_logo.webp'
import settingsLogo from '../assets/settings_logo.webp'
import medassistAILogo from '../assets/medassistAI_logo.webp'

export default function HomePage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 "
      style={{ backgroundImage: `url(${signupBackground})` }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 mt-20">
        {/* Account Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-64">
          <img 
            src={accountLogo} 
            alt="Account" 
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-xl font-semibold text-gray-800">Account</p>
        </div>

        {/* Appointments Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-64">
          <img 
            src={appointmentsLogo} 
            alt="Appointments" 
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-xl font-semibold text-gray-800">Appointments</p>
        </div>

        {/* Settings Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-64">
          <img 
            src={settingsLogo} 
            alt="Settings" 
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-xl font-semibold text-gray-800">Settings</p>
        </div>

        {/* MedAssistAI Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-64">
          <img 
            src={medassistAILogo} 
            alt="MedAssistAI" 
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-xl font-semibold text-gray-800">MedAssistAI</p>
        </div>
      </div>
    </div>
  )
}
