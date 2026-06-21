import React, { useState } from 'react'
import Navbar from './components/Navbar'
import PredictionForm from './pages/PredictionForm'
import BatchPrediction from './pages/BatchPrediction'
import Education from './pages/Education'

function App() {
  const [activePage, setActivePage] = useState('home')

  // Simple state-based router
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <PredictionForm setActivePage={setActivePage} />
      case 'batch':
        return <BatchPrediction />
      case 'education':
        return <Education />
      default:
        return <PredictionForm setActivePage={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans relative flex flex-col">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-8">
          {renderPage()}
        </main>

        {/* Modern Minimal Footer */}
        <footer className="bg-white border-t border-gray-200 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-serif font-bold text-xl text-primary">NephroAI</span>
              <p className="text-xs text-gray-500 mt-1">&copy; {new Date().getFullYear()} Clinical Prediction System.</p>
            </div>
            <div className="text-xs text-gray-400 max-w-md text-center md:text-right">
              Disclaimer: Aplikasi ini dirancang untuk penelitian klinis. Keputusan akhir wajib dikonsultasikan dengan dokter spesialis.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
