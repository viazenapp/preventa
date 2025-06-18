import { useEffect, useState } from 'react'
import './App.css'
import WorkingLandingPage from './components/WorkingLandingPage'
import { LanguageProvider } from './contexts/LanguageContext'
import { SimpleToastProvider } from './components/SimpleToast'

function App() {
  return (
    <LanguageProvider>
      <SimpleToastProvider>
        <div className="min-h-screen">
          <WorkingLandingPage />
        </div>
      </SimpleToastProvider>
    </LanguageProvider>
  )
}

export default App
