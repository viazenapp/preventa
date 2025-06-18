import { useEffect, useState } from 'react';

interface LogoProps {
  isVisible: boolean;
}

const Logo = ({ isVisible }: LogoProps) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowLogo(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        showLogo
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-90'
      }`}
    >
      <div className="relative group cursor-pointer">
        {/* Logo principal */}
        <div className="flex items-center space-x-3">
          {/* Icono del logo */}
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <svg 
                className="w-6 h-6 md:w-8 md:h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 8.26L18 7L16.91 13.26L22 14L12 22L2 14L7.09 13.26L6 7L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          
          {/* Texto del logo */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Viazen
            </h1>
            <p className="text-xs md:text-sm text-blue-200 opacity-80 font-light tracking-wider">
              DESCENTRALIZADO
            </p>
          </div>
        </div>

        {/* Efecto de partículas alrededor del logo */}
        <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
              style={{
                left: `${20 + Math.cos((i * Math.PI) / 4) * 30}px`,
                top: `${20 + Math.sin((i * Math.PI) / 4) * 30}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logo;
