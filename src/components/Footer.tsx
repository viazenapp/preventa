import { useEffect, useState } from 'react';

interface FooterProps {
  isVisible: boolean;
}

const Footer = ({ isVisible }: FooterProps) => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowFooter(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative z-30 pb-6 md:pb-8 transform transition-all duration-1000 ease-out ${
        showFooter
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Línea separadora con gradiente */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mb-6"></div>
        
        <div className="text-center space-y-3">
          {/* Lema principal */}
          <p className="text-blue-100 text-lg md:text-xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            "Libertad, recompensa y expansión global."
          </p>
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm md:text-base">
            © {currentYear} Viazen. Todos los derechos reservados.
          </p>
          
          {/* Información adicional */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-xs md:text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Plataforma Descentralizada</span>
            </span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>Comisiones Mínimas</span>
            </span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>Recompensas Reales</span>
            </span>
          </div>

          {/* Redes sociales placeholders */}
          <div className="flex justify-center space-x-4 pt-4">
            {[
              { icon: "📘", name: "Facebook" },
              { icon: "🐦", name: "Twitter" },
              { icon: "📷", name: "Instagram" },
              { icon: "💼", name: "LinkedIn" }
            ].map((social, index) => (
              <button
                key={index}
                className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 transform"
                title={social.name}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Elemento decorativo */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full opacity-50"
                style={{
                  animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
