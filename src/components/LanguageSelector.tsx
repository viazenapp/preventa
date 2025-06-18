import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

// Iconos de banderas SVG
const FlagSpain = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="2" fill="#AA151B"/>
    <rect y="8" width="32" height="16" fill="#F1BF00"/>
    <rect y="12" width="32" height="8" fill="#AA151B"/>
  </svg>
);

const FlagUSA = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="2" fill="#B22234"/>
    <rect y="2" width="32" height="2" fill="#FFFFFF"/>
    <rect y="6" width="32" height="2" fill="#FFFFFF"/>
    <rect y="10" width="32" height="2" fill="#FFFFFF"/>
    <rect y="14" width="32" height="2" fill="#FFFFFF"/>
    <rect y="18" width="32" height="2" fill="#FFFFFF"/>
    <rect y="22" width="32" height="2" fill="#FFFFFF"/>
    <rect y="26" width="32" height="2" fill="#FFFFFF"/>
    <rect y="30" width="32" height="2" fill="#FFFFFF"/>
    <rect width="13" height="17" fill="#3C3B6E"/>
  </svg>
);

const FlagBrazil = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="2" fill="#009739"/>
    <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#FEDD00"/>
    <circle cx="16" cy="16" r="4" fill="#012169"/>
  </svg>
);

const FlagFrance = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="2" fill="#FFFFFF"/>
    <rect width="11" height="32" fill="#002654"/>
    <rect x="21" width="11" height="32" fill="#CE1126"/>
  </svg>
);

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: <FlagSpain size={20} /> },
    { code: 'en' as Language, name: 'English', flag: <FlagUSA size={20} /> },
    { code: 'pt' as Language, name: 'Português', flag: <FlagBrazil size={20} /> },
    { code: 'fr' as Language, name: 'Français', flag: <FlagFrance size={20} /> },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botón selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-600 border-2 border-gray-500 hover:border-purple-400 transition-all duration-300 shadow-lg shadow-black"
      >
        {currentLanguage?.flag}
        <span className="text-white text-sm font-medium hidden sm:block">
          {currentLanguage?.name}
        </span>
        <span className="text-white text-sm font-medium sm:hidden">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para cerrar el dropdown */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border-2 border-gray-500 rounded-xl shadow-2xl shadow-black z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-purple-700 transition-all duration-200 border-b border-gray-600 last:border-b-0 ${
                  language === lang.code ? 'bg-purple-600 text-purple-100 shadow-lg shadow-purple-500' : 'text-white hover:text-purple-100 bg-gray-900 hover:bg-gray-600'
                }`}
              >
                {lang.flag}
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
