import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { SimpleWeb3Button } from './SimpleWeb3Button';
import { useToastMessage } from './SimpleToast';

// Navigation component for Viazen

interface NavigationProps {
  isVisible: boolean;
}

const ModernNavigation = ({ isVisible }: NavigationProps) => {
  const { t } = useLanguage();
  const { success, error, info } = useToastMessage();
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Detectar sección activa
      const sections = [
        'inicio',
        'transporte-section',
        'alojamiento-section', 
        'pagos-section',
        'tokenomics-section',
        'presale-banner',
        'roadmap-section',
        'whitepaper-section',
        'founders-section'
      ];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          const scrollPosition = window.scrollY + 100;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al montar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    let targetId = sectionId;
    
    // Mapear nombres a IDs reales
    const sectionMap: { [key: string]: string } = {
      'inicio': 'hero-section',
      'viajes': 'transporte-section',
      'alojamiento': 'alojamiento-section',
      'pagos': 'pagos-section',
      'tokenomics': 'tokenomics-section',
      'roadmap': 'roadmap-section',
      'preventa': 'presale-banner',
      'whitepaper': 'whitepaper-section',
      'equipo': 'founders-section'
    };

    targetId = sectionMap[sectionId] || sectionId;
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsMenuOpen(false); // Cerrar menú móvil después del scroll
    }
  };

  const navigationItems = [
    { id: 'inicio', label: t('nav.home') },
    { id: 'viajes', label: t('nav.trips') },
    { id: 'alojamiento', label: t('nav.accommodation') },
    { id: 'pagos', label: t('nav.payments') },
    { id: 'tokenomics', label: t('nav.tokenomics') },
    { id: 'roadmap', label: t('nav.roadmap') },
    { id: 'preventa', label: t('nav.presale') },
    { id: 'whitepaper', label: t('nav.whitepaper') },
    { id: 'equipo', label: t('nav.team') },
  ];

  // Navigation component functionality

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-lg border-b border-cyan-500/20' 
          : 'bg-black/70 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => scrollToSection('inicio')}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L18 7L16.91 13.26L22 14L12 22L2 14L7.09 13.26L6 7L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Viazen
              </span>
            </div>

            {/* Spacer for desktop to center navigation */}
            <div className="flex-1 hidden lg:block"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    activeSection === id || (activeSection.includes(id) && id !== 'inicio')
                      ? 'text-cyan-400 bg-cyan-500/10' 
                      : 'text-white/80 hover:text-cyan-300 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Spacer for desktop to push controls right */}
            <div className="flex-1 hidden lg:block"></div>

            {/* Controls - Desktop and Mobile */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Language Selector - Hidden on small mobile */}
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              
              {/* Connect Wallet Button */}
              <SimpleWeb3Button 
                className="text-xs" 
                onSuccess={success}
                onError={error}
              />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-cyan-300 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900 border-l-2 border-cyan-500/50 shadow-2xl shadow-black/50 z-50 lg:hidden transform transition-transform duration-300">
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-700 bg-gray-800">
                <h3 className="text-xl font-bold text-white">Navegación</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white hover:text-cyan-300 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {navigationItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeSection === id || (activeSection.includes(id) && id !== 'inicio')
                        ? 'text-cyan-400 bg-cyan-500/20 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                        : 'text-white hover:text-cyan-300 hover:bg-gray-700 bg-gray-800/50 border-2 border-transparent hover:border-cyan-500/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                
                {/* Selector de idioma móvil (solo en pantallas muy pequeñas) */}
                <div className="sm:hidden mt-6 pt-6 border-t-2 border-gray-700 bg-gray-800/30 rounded-lg p-4">
                  <div className="mb-4">
                    <span className="text-sm text-gray-300 mb-2 block font-medium">Idioma / Language</span>
                    <LanguageSelector />
                  </div>
                </div>
                
                {/* Botón CONECTAR BILLETERA móvil expandido */}
                <div className="mt-6">
                  <SimpleWeb3Button 
                    className="w-full justify-center" 
                    onSuccess={success}
                    onError={error}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default ModernNavigation;
