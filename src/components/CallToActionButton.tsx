import { useEffect, useState } from 'react';

interface CallToActionButtonProps {
  isVisible: boolean;
  onOpenPresale: () => void;
}

const CallToActionButton = ({ isVisible, onOpenPresale }: CallToActionButtonProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClick = () => {
    onOpenPresale();
  };

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        showButton
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <div className="relative group">
        {/* Botón principal */}
        <button
          onClick={handleClick}
          className="relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl active:scale-95 overflow-hidden group"
        >
          <span className="relative z-10 flex items-center space-x-3">
            <span>Unite a la Preventa</span>
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
            </svg>
          </span>
          
          {/* Efecto de brillo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          
          {/* Efecto de ondas */}
          <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>

        {/* Glow effect externo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>

        {/* Partículas flotantes */}
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Texto descriptivo debajo del botón */}
        <p className="text-blue-200 text-sm md:text-base mt-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          🚀 Únete a la revolución descentralizada
        </p>
      </div>
    </div>
  );
};

export default CallToActionButton;
