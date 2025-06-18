import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AlojamientoSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animateBuildings, setAnimateBuildings] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateBuildings(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('alojamiento-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="alojamiento-section"
      className="min-h-screen relative bg-gradient-to-br from-white via-amber-50 to-yellow-100 overflow-hidden flex items-center"
    >
      {/* Fondo con efectos dorados */}
      <div className="absolute inset-0">
        {/* Gradiente base lujoso */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 opacity-80"></div>
        
        {/* Patrones geométricos de lujo */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="luxury-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#FFD700"/>
                <circle cx="5" cy="5" r="0.5" fill="#FFC107"/>
                <circle cx="15" cy="15" r="0.5" fill="#FFC107"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#luxury-pattern)"/>
          </svg>
        </div>

        {/* Partículas doradas flotantes */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                background: `linear-gradient(45deg, #FFD700, #FFC107)`,
                animation: `float-golden ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Efectos de brillo dorado */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-radial from-amber-300/30 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visualización de alojamientos */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Mapa 3D de alojamientos */}
            <div className="relative bg-gradient-to-br from-yellow-100 to-amber-200 rounded-3xl p-8 shadow-2xl border-2 border-yellow-300/50 backdrop-blur-sm">
              {/* Ciudades conectadas */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { name: 'París', icon: '🏛️', delay: 0 },
                  { name: 'Tokyo', icon: '🏙️', delay: 200 },
                  { name: 'NYC', icon: '🏢', delay: 400 },
                  { name: 'Roma', icon: '🏰', delay: 600 },
                  { name: 'Dubai', icon: '🏗️', delay: 800 },
                  { name: 'LA', icon: '🏠', delay: 1000 }
                ].map((city, index) => (
                  <div
                    key={index}
                    className={`bg-white/80 rounded-xl p-3 text-center shadow-lg border border-yellow-200 transform transition-all duration-500 hover:scale-105 ${
                      animateBuildings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${city.delay}ms` }}
                  >
                    <div className="text-2xl mb-1">{city.icon}</div>
                    <div className="text-xs font-semibold text-amber-800">{city.name}</div>
                    <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-2"></div>
                  </div>
                ))}
              </div>

              {/* Centro de conexión */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-amber-800 to-yellow-800 bg-clip-text text-transparent">
                  {t('accommodation.network')}
                </h3>
                <p className="text-sm text-amber-700 mt-1">{t('accommodation.connecting')}</p>
              </div>

              {/* Líneas de conexión animadas */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#FFC107" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
                {animateBuildings && (
                  <>
                    <path d="M50,50 Q150,30 250,50" stroke="url(#goldGradient)" strokeWidth="1" fill="none" className="animate-draw-path"/>
                    <path d="M50,100 Q150,120 250,100" stroke="url(#goldGradient)" strokeWidth="1" fill="none" className="animate-draw-path-delay"/>
                    <path d="M50,150 Q150,170 250,150" stroke="url(#goldGradient)" strokeWidth="1" fill="none" className="animate-draw-path-delay-2"/>
                  </>
                )}
              </svg>
            </div>

            {/* Elementos flotantes de lujo */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-yellow-300/40 to-amber-400/40 rounded-full blur-sm animate-float"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-br from-amber-300/40 to-yellow-400/40 rounded-full blur-sm animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

          {/* Contenido de texto */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                {t('accommodation.title')}
              </span>
            </h2>

            <div className="text-lg md:text-xl text-gray-800 leading-relaxed space-y-6">
              <p>
                {t('accommodation.intro')} <span className="text-amber-600 font-bold">{t('accommodation.improvements')}</span>:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🏡</span>
                  <span className="text-amber-700 font-semibold">{t('accommodation.feature1')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🧾</span>
                  <span className="text-yellow-600 font-semibold">{t('accommodation.feature2')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🌐</span>
                  <span className="text-amber-600 font-semibold">{t('accommodation.feature3')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🤝</span>
                  <span className="text-yellow-700 font-semibold">{t('accommodation.feature4')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🎁</span>
                  <span className="text-amber-600 font-semibold">{t('accommodation.feature5')}</span>
                </div>
              </div>
              
              <blockquote className="text-xl font-bold text-center p-6 border-l-4 border-amber-500 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-r-lg mt-8">
                <span className="text-amber-700">{t('accommodation.quote')}</span>
              </blockquote>
            </div>

            {/* Características de lujo */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🏡', text: t('accommodation.highlights.commission'), color: 'from-green-500 to-amber-600' },
                { icon: '🌐', text: t('accommodation.highlights.nocensorship'), color: 'from-amber-500 to-yellow-600' },
                { icon: '🤝', text: t('accommodation.highlights.blockchain'), color: 'from-yellow-600 to-amber-700' },
                { icon: '🎁', text: t('accommodation.highlights.cashback'), color: 'from-amber-600 to-yellow-700' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg border border-yellow-300/50 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${1000 + index * 200}ms`,
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.15)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-white font-medium text-sm">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>

      {/* Efectos de borde dorado */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
    </section>
  );
};

export default AlojamientoSection;
