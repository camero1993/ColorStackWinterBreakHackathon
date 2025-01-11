import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/medassist')}
          className="w-full bg-white/90 backdrop-blur-sm text-blue-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
        >
          <h3 className="text-2xl font-bold mb-2">MedAssist AI</h3>
          <p className="text-blue-600/80">
            Get instant medical insights and symptom analysis
          </p>
        </button>
      </div>
    </div>
  )
}
