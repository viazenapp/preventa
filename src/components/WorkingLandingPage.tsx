import { useEffect, useState } from 'react';
import SimplePresaleModal from './SimplePresaleModal';
import SimpleHowItWorksSection from './SimpleHowItWorksSection';
import SimpleRewardsSection from './SimpleRewardsSection';
import RoadmapSection from './RoadmapSection';
import ModernNavigation from './ModernNavigation';
import TransporteSection from './TransporteSection';
import AlojamientoSection from './AlojamientoSection';
import PagosSection from './PagosSection';
import PresaleAnnouncementBanner from './PresaleAnnouncementBanner';
import NewTokenomicsSection from './NewTokenomicsSection';
import FoundersSection from './FoundersSection';
import WhitepaperSection from './WhitepaperSection';
import WhitepaperHighlightsSection from './WhitepaperHighlightsSection';
import { SimpleHeroEmailSignup, SimpleSectionEmailSignup } from './SimpleEmailForm';
import { useToastMessage } from './SimpleToast';

import { useLanguage } from '../contexts/LanguageContext';

const WorkingLandingPage = () => {
  const { t } = useLanguage();
  const { success, error, info } = useToastMessage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar navegación después de hacer scroll desde el hero
      const scrollPosition = window.scrollY;
      setShowNavigation(scrollPosition > window.innerHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenPresale = () => {
    console.log('handleOpenPresale called!');
    console.log('Current modal state:', isPresaleModalOpen);
    setIsPresaleModalOpen(true);
    console.log('Modal state set to true');
  };

  const handleClosePresale = () => {
    console.log('handleClosePresale called!');
    setIsPresaleModalOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };



  // Debug: log modal state changes
  useEffect(() => {
    console.log('Modal state changed to:', isPresaleModalOpen);
  }, [isPresaleModalOpen]);

  return (
    <>
      {/* Banner de anuncio de preventa */}
      <PresaleAnnouncementBanner />
      
      {/* Navegación sticky */}
      <ModernNavigation isVisible={showNavigation} />
      

      <div className="relative bg-gray-900">
        {/* Hero Section */}
        <div id="hero-section" className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
          {/* Fondo galáctico con overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/40 to-black/80 z-10"></div>
          
          {/* Partículas galácticas animadas */}
          <div className="absolute inset-0 z-20">
            <div className="particles-container">
              {[...Array(80)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full opacity-70 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${1 + Math.random() * 4}px`,
                    height: `${1 + Math.random() * 4}px`,
                    background: `${
                      Math.random() > 0.6 ? '#00FFFF' : 
                      Math.random() > 0.3 ? '#8B5CF6' : '#FFD700'
                    }`,
                    animation: `pulse ${2 + Math.random() * 4}s infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: `0 0 ${2 + Math.random() * 6}px currentColor`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Efectos de nebulosa */}
          <div className="absolute inset-0 z-15">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-yellow-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* Contenido principal del hero */}
          <div className="relative z-30 flex flex-col min-h-screen">
            {/* Header con logo */}
            <header className="flex justify-center pt-8 md:pt-12">
              <div className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'
              }`}>
                <div className="relative group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-amber-300/50">
                        <svg 
                          className="w-6 h-6 md:w-8 md:h-8 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L13.09 8.26L18 7L16.91 13.26L22 14L12 22L2 14L7.09 13.26L6 7L10.91 8.26L12 2Z"/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="text-white">
                      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent">
                        Viazen
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Contenido central */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-8 max-w-6xl mx-auto">
              <div className="space-y-8 md:space-y-12">
                {/* Alerta de preventa */}
                <div className={`transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`} style={{ transitionDelay: '1000ms' }}>
                  <div className="mb-8">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border border-red-500/50 rounded-full px-6 py-3 mb-6">
                      <span className="text-2xl animate-pulse">🚨</span>
                      <span className="text-red-300 font-bold text-lg">¡La preventa de VIAZ ya casi comienza!</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Compra el token a solo 
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl">
                      0.01 USDT
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      antes de que se liste a{' '}
                    </span>
                    <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                      0.10 USDT
                    </span>
                  </h1>
                </div>

                {/* Descripción del ecosistema */}
                <div className={`transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`} style={{ transitionDelay: '1500ms' }}>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                      Sé parte del ecosistema{' '}
                      <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent font-bold">
                        VIAZEN
                      </span>
                      :
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                      una revolución descentralizada para{' '}
                      <span className="text-cyan-400 font-semibold">viajar</span>, {' '}
                      <span className="text-purple-400 font-semibold">alojarse</span> y {' '}
                      <span className="text-yellow-400 font-semibold">pagar</span> {' '}
                      usando solo tu billetera.
                    </p>
                  </div>
                </div>

                {/* Beneficios principales */}
                <div className={`transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`} style={{ transitionDelay: '2000ms' }}>
                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                      <div className="text-3xl mb-3">🌍</div>
                      <p className="text-blue-300 font-bold text-lg">Sin intermediarios</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
                      <div className="text-3xl mb-3">💸</div>
                      <p className="text-purple-300 font-bold text-lg">Sin comisiones abusivas</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6">
                      <div className="text-3xl mb-3">🔐</div>
                      <p className="text-yellow-300 font-bold text-lg">100% controlado por la comunidad</p>
                    </div>
                  </div>
                </div>

                {/* Llamada a la acción final */}
                <div className={`transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`} style={{ transitionDelay: '2300ms' }}>
                  <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <span className="text-3xl">👉</span>
                      <p className="text-xl md:text-2xl font-bold text-orange-300">
                        Apurate, quedan pocos días para entrar en la preventa exclusiva.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Iconos de servicios */}
                <div className={`flex justify-center items-center space-x-8 md:space-x-12 py-8 transform transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '2600ms' }}>
                  <div 
                    className="service-icon-enhanced group cursor-pointer transform hover:scale-110 transition-all duration-300"
                    onClick={() => scrollToSection('transporte-section')}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl border border-cyan-300/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent animate-pulse"></div>
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                    <p className="text-cyan-300 text-sm font-semibold mt-2 group-hover:text-cyan-100 transition-colors">Transporte</p>
                  </div>

                  <div 
                    className="service-icon-enhanced group cursor-pointer transform hover:scale-110 transition-all duration-300"
                    onClick={() => scrollToSection('alojamiento-section')}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl border border-purple-300/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </div>
                    <p className="text-purple-300 text-sm font-semibold mt-2 group-hover:text-purple-100 transition-colors">Alojamiento</p>
                  </div>

                  <div 
                    className="service-icon-enhanced group cursor-pointer transform hover:scale-110 transition-all duration-300"
                    onClick={() => scrollToSection('pagos-section')}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl border border-yellow-300/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <p className="text-yellow-300 text-sm font-semibold mt-2 group-hover:text-yellow-100 transition-colors">Pagos</p>
                  </div>
                </div>


              </div>
            </main>

            {/* Scroll indicator */}
            <div className="flex justify-center pb-8">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Nuevas secciones específicas */}
        <TransporteSection />
        <AlojamientoSection />
        <PagosSection />

        {/* Secciones existentes */}
        <SimpleHowItWorksSection />
        <SimpleRewardsSection />
        <RoadmapSection />
        <NewTokenomicsSection />
        <WhitepaperHighlightsSection />
        <WhitepaperSection />
        <FoundersSection />



        {/* Footer simple pero elegante */}
        <footer className="bg-gray-900 py-12 text-center border-t border-gray-700/50">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              "Libertad, recompensa y expansión global."
            </p>
            <p className="text-gray-400 mb-6">
              © 2025 Viazen. Todos los derechos reservados.
            </p>
            
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Telegram</a>
              <a href="mailto:info@viazen.io" className="text-gray-400 hover:text-yellow-400 transition-colors">Contacto</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal de preventa */}
      <SimplePresaleModal 
        isOpen={isPresaleModalOpen}
        onClose={handleClosePresale}
      />
    </>
  );
};

export default WorkingLandingPage;
