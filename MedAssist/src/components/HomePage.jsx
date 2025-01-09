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
      <div
          className="relative min-h-screen bg-[rgb(128,178,214)] bg-no-repeat p-8 overflow-hidden"
      >
        <div className=" bg-[url('assets/signup_no_background.png')] bg-contain bg-no-repeat w-screen h-screen absolute left-5 pointer-events-none z-10"></div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 mt-20 z-20">
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
          <button
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-64"
              onClick={handleMedAssist}
          >
            <img
                src={medassistAILogo}
                alt="MedAssistAI"
                className="w-24 h-24 object-contain mb-2"
            />
            <p className="text-xl font-semibold text-gray-800">MedAssistAI</p>
          </button>
        </div>
      </div>
  )
}
