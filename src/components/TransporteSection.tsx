import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TransporteSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animateRoutes, setAnimateRoutes] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateRoutes(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('transporte-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="transporte-section"
      className="min-h-screen relative bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden flex items-center"
    >
      {/* Fondo animado con líneas de conexión */}
      <div className="absolute inset-0">
        {/* Grid de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern"></div>
        </div>
        
        {/* Líneas animadas que simulan rutas */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#1E90FF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.8"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Rutas principales */}
          <path
            d="M50,400 Q300,200 600,400 T1150,400"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className={`${animateRoutes ? 'animate-draw-path' : 'opacity-0'} transition-opacity duration-1000`}
          />
          <path
            d="M50,300 Q400,100 800,300 T1150,300"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className={`${animateRoutes ? 'animate-draw-path-delay' : 'opacity-0'} transition-opacity duration-1000`}
          />
          <path
            d="M50,500 Q350,700 700,500 T1150,500"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className={`${animateRoutes ? 'animate-draw-path-delay-2' : 'opacity-0'} transition-opacity duration-1000`}
          />
          
          {/* Puntos de conexión animados */}
          <circle cx="600" cy="400" r="4" fill="#00BFFF" className={`${animateRoutes ? 'animate-pulse-blue' : 'opacity-0'}`}>
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="300" cy="300" r="3" fill="#1E90FF" className={`${animateRoutes ? 'animate-pulse-blue' : 'opacity-0'}`}>
            <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="800" cy="500" r="3" fill="#00BFFF" className={`${animateRoutes ? 'animate-pulse-blue' : 'opacity-0'}`}>
            <animate attributeName="r" values="3;6;3" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>

        {/* Partículas flotantes de conectividad */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-blue ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t('transport.title')}
              </span>
            </h2>

            <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
              <p>
                {t('transport.intro')} <span className="text-cyan-400 font-bold">{t('transport.advantages')}</span>:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🚗</span>
                  <span className="text-cyan-400 font-semibold">{t('transport.feature1')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🌍</span>
                  <span className="text-blue-400 font-semibold">{t('transport.feature2')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">💸</span>
                  <span className="text-green-400 font-semibold">{t('transport.feature3')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🔐</span>
                  <span className="text-purple-400 font-semibold">{t('transport.feature4')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">💼</span>
                  <span className="text-yellow-400 font-semibold">{t('transport.feature5')}</span>
                </div>
              </div>
              
              <blockquote className="text-xl font-bold text-center p-6 border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-r-lg mt-8">
                <span className="text-cyan-300">{t('transport.quote')}</span>
              </blockquote>
            </div>

            {/* Características destacadas */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '💸', text: t('transport.highlights.commission'), color: 'text-green-300' },
                { icon: '🔐', text: t('transport.highlights.blockchain'), color: 'text-purple-300' },
                { icon: '🌍', text: t('transport.highlights.global'), color: 'text-blue-300' },
                { icon: '💼', text: t('transport.highlights.tokens'), color: 'text-yellow-300' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-cyan-500/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${1000 + index * 200}ms` }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className={`${feature.color} font-medium`}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visualización futurista del transporte */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Auto futurista central */}
              <div className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-2xl p-8 shadow-2xl border border-cyan-400/50">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Viazen Transport</h3>
                  <p className="text-cyan-200 text-sm">Conectando el mundo</p>
                </div>

                {/* Indicadores de conexión */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Elementos flotantes de conectividad */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-4 w-8 h-8 bg-cyan-400/30 rounded-full blur-sm animate-float"></div>
                <div className="absolute bottom-1/4 -right-4 w-6 h-6 bg-blue-400/30 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-cyan-300/40 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de neón en los bordes */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
    </section>
  );
};

export default TransporteSection;
