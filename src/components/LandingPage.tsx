import { useEffect, useState } from 'react';
import VideoBackground from './VideoBackground';
import AnimatedText from './AnimatedText';
import Logo from './Logo';
import CallToActionButton from './CallToActionButton';
import HowItWorksSection from './HowItWorksSection';
import RewardsSection from './RewardsSection';
import RoadmapSection from './RoadmapSection';
import SimplePresaleModal from './SimplePresaleModal';
import EnhancedFooter from './EnhancedFooter';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenPresale = () => {
    setIsPresaleModalOpen(true);
  };

  const handleClosePresale = () => {
    setIsPresaleModalOpen(false);
  };

  return (
    <>
      <div className="relative bg-gray-900">
        {/* Hero Section */}
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Video de fondo */}
          <VideoBackground />
          
          {/* Overlay gradiente para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70 z-10"></div>
          
          {/* Partículas animadas de fondo */}
          <div className="absolute inset-0 z-20">
            <div className="particles-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${15 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Contenido principal del hero */}
          <div className="relative z-30 flex flex-col min-h-screen">
            {/* Header con logo */}
            <header className="flex justify-center pt-8 md:pt-12">
              <Logo isVisible={isLoaded} />
            </header>

            {/* Contenido central */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-8 max-w-6xl mx-auto">
              <div className="space-y-8 md:space-y-12">
                {/* Título principal */}
                <AnimatedText
                  text="Bienvenido a Viazen"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  delay={1000}
                  isVisible={isLoaded}
                />

                {/* Subtítulo */}
                <AnimatedText
                  text="Una revolución en la forma de Viajar, Alojarse y Pagar"
                  className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
                  delay={1500}
                  isVisible={isLoaded}
                />

                {/* Iconos de servicios */}
                <div className="flex justify-center items-center space-x-8 md:space-x-12 py-8">
                  <div className="service-icon-enhanced group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                    <p className="text-white text-sm mt-2 group-hover:text-blue-300 transition-colors">Transporte</p>
                  </div>

                  <div className="service-icon-enhanced group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </div>
                    <p className="text-white text-sm mt-2 group-hover:text-green-300 transition-colors">Alojamiento</p>
                  </div>

                  <div className="service-icon-enhanced group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <p className="text-white text-sm mt-2 group-hover:text-purple-300 transition-colors">Pagos</p>
                  </div>
                </div>

                {/* Botón de llamada a la acción */}
                <CallToActionButton isVisible={isLoaded} onOpenPresale={handleOpenPresale} />
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

        {/* Nuevas secciones - temporalmente comentadas para debugging */}
        {/* <HowItWorksSection />
        <RewardsSection />
        <RoadmapSection /> */}

        {/* Footer mejorado */}
        <EnhancedFooter isVisible={true} />
      </div>

      {/* Modal de preventa */}
      <SimplePresaleModal 
        isOpen={isPresaleModalOpen}
        onClose={handleClosePresale}
      />
    </>
  );
};

export default LandingPage;
