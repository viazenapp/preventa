import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PagosSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animateTransactions, setAnimateTransactions] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateTransactions(true), 600);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('pagos-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pagos-section"
      className="min-h-screen relative bg-gradient-to-br from-gray-900 via-slate-800 to-purple-900 overflow-hidden flex items-center"
    >
      {/* Fondo con efectos digitales */}
      <div className="absolute inset-0">
        {/* Grid digital de fondo */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="digital-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="none" stroke="#00FF7F" strokeWidth="0.5"/>
                <circle cx="5" cy="5" r="0.5" fill="#32CD32"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#digital-grid)"/>
          </svg>
        </div>

        {/* Flujo de datos digital */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                background: i % 3 === 0 ? '#00FF7F' : i % 3 === 1 ? '#32CD32' : '#8A2BE2',
                animation: `digital-flow ${4 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 4}s`,
                boxShadow: `0 0 10px ${i % 3 === 0 ? '#00FF7F' : i % 3 === 1 ? '#32CD32' : '#8A2BE2'}`
              }}
            />
          ))}
        </div>

        {/* Líneas de conexión financiera */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="moneyFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF7F" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#32CD32" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8"/>
            </linearGradient>
            <filter id="digitalGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Rutas de transacciones */}
          <path
            d="M100,200 Q300,100 500,200 Q700,300 900,200 Q1000,150 1100,200"
            stroke="url(#moneyFlow)"
            strokeWidth="2"
            fill="none"
            filter="url(#digitalGlow)"
            className={`${animateTransactions ? 'animate-draw-path' : 'opacity-0'} transition-opacity duration-1000`}
          />
          <path
            d="M100,400 Q400,300 600,400 Q800,500 1100,400"
            stroke="url(#moneyFlow)"
            strokeWidth="2"
            fill="none"
            filter="url(#digitalGlow)"
            className={`${animateTransactions ? 'animate-draw-path-delay' : 'opacity-0'} transition-opacity duration-1000`}
          />
          <path
            d="M100,600 Q350,700 600,600 Q850,500 1100,600"
            stroke="url(#moneyFlow)"
            strokeWidth="2"
            fill="none"
            filter="url(#digitalGlow)"
            className={`${animateTransactions ? 'animate-draw-path-delay-2' : 'opacity-0'} transition-opacity duration-1000`}
          />

          {/* Nodos de transacción */}
          {animateTransactions && (
            <>
              <circle cx="300" cy="200" r="6" fill="#00FF7F" className="animate-pulse-green">
                <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="600" cy="400" r="5" fill="#32CD32" className="animate-pulse-green">
                <animate attributeName="r" values="5;8;5" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="900" cy="600" r="4" fill="#8A2BE2" className="animate-pulse-purple">
                <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite"/>
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-purple-600 bg-clip-text text-transparent">
                {t('payments.title')}
              </span>
            </h2>

            <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
              <p>
                {t('payments.intro')} <span className="text-green-400 font-bold">{t('payments.improvements')}</span>:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🔗</span>
                  <span className="text-green-400 font-semibold">{t('payments.feature1')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">💱</span>
                  <span className="text-emerald-400 font-semibold">{t('payments.feature2')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">📲</span>
                  <span className="text-cyan-400 font-semibold">{t('payments.feature3')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-purple-400 font-semibold">{t('payments.feature4')}</span>
                </div>
                <div className="flex items-center space-x-3 text-lg">
                  <span className="text-2xl">🌟</span>
                  <span className="text-yellow-400 font-semibold">{t('payments.feature5')}</span>
                </div>
              </div>
              
              <blockquote className="text-xl font-bold text-center p-6 border-l-4 border-green-500 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-r-lg mt-8">
                <span className="text-green-300">{t('payments.quote')}</span>
              </blockquote>
            </div>

            {/* Métodos de pago */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🔗', text: t('payments.highlights.decentralized'), color: 'from-green-500 to-emerald-600' },
                { icon: '🛡️', text: t('payments.highlights.commission'), color: 'from-emerald-500 to-green-600' },
                { icon: '💱', text: t('payments.highlights.qrcrypto'), color: 'from-purple-500 to-violet-600' },
                { icon: '🌟', text: t('payments.highlights.tokens'), color: 'from-violet-500 to-purple-600' }
              ].map((method, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gradient-to-br ${method.color} rounded-xl shadow-lg border border-gray-500/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${1000 + index * 200}ms`,
                    boxShadow: '0 8px 25px rgba(0, 255, 127, 0.15)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-white font-medium text-sm">{method.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualización de pagos digitales */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Wallet central en 3D */}
              <div className="relative bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900 rounded-3xl p-8 shadow-2xl border border-green-400/30 backdrop-blur-sm">
                <div className="text-center space-y-6">
                  {/* Wallet principal */}
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-white">Viazen Wallet</h3>
                  <p className="text-gray-400 text-sm">Pagos instantáneos globales</p>

                  {/* QR Code animado */}
                  <div className="bg-white rounded-xl p-4 mx-auto w-24 h-24 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-0.5">
                      {[...Array(64)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 ${
                            Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                          } transition-colors duration-1000`}
                          style={{
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Monedas animadas */}
                  <div className="flex justify-center space-x-4">
                    {['₿', '₡', '$', '€'].map((currency, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm transform transition-all duration-500 ${
                          animateTransactions ? 'animate-spin-slow' : ''
                        }`}
                        style={{
                          animationDelay: `${index * 0.5}s`
                        }}
                      >
                        {currency}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indicadores de transacción */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-1/2 -left-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
              </div>

              {/* Transacciones flotantes */}
              <div className="absolute inset-0 pointer-events-none">
                {animateTransactions && (
                  <>
                    <div className="absolute top-1/4 -left-8 bg-green-400/20 rounded-lg p-2 text-xs text-green-300 font-mono animate-float">
                      +$250 VIAZ
                    </div>
                    <div className="absolute bottom-1/4 -right-8 bg-purple-400/20 rounded-lg p-2 text-xs text-purple-300 font-mono animate-float" style={{ animationDelay: '1s' }}>
                      -0.05 BTC
                    </div>
                    <div className="absolute top-3/4 left-1/4 bg-emerald-400/20 rounded-lg p-2 text-xs text-emerald-300 font-mono animate-float" style={{ animationDelay: '2s' }}>
                      +€180
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de borde digital */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
    </section>
  );
};

export default PagosSection;
