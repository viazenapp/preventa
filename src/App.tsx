import React from 'react'
import FuturisticBackground from './components/FuturisticBackground';
import './App.css'
import WorkingLandingPage from './components/WorkingLandingPage'
import { LanguageProvider } from './contexts/LanguageContext'
import { SimpleToastProvider } from './components/SimpleToast'

function App() {
  return (
    <>
      <FuturisticBackground />
      <LanguageProvider>
        <SimpleToastProvider>
          <div className="min-h-screen">
            <WorkingLandingPage />
          </div>
        </SimpleToastProvider>
      </LanguageProvider>
    </>
  )
}

export default App
