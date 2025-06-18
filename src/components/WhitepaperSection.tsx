import { useState } from 'react';
import { FileText, Download, ExternalLink, Shield, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhitepaperSection = () => {
  const { t } = useLanguage();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Arquitectura Descentralizada",
      description: "Sistema distribuido sin puntos únicos de falla",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Transacciones Instantáneas",
      description: "Procesamiento ultrarrápido con comisiones mínimas",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Expansión Global",
      description: "Ecosistema escalable para mercados mundiales",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const handleDownload = () => {
    // Descargar el whitepaper original en formato PDF
    const link = document.createElement('a');
    link.href = '/VIAZEN_Whitepaper.pdf';
    link.download = 'VIAZEN_Whitepaper.pdf';
    link.click();
  };

  const handlePreview = () => {
    // Abrir el PDF en nueva pestaña
    window.open('/VIAZEN_Whitepaper.pdf', '_blank');
  };

  return (
    <section id="whitepaper-section" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Líneas de circuito */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 10 10 L 90 10 L 90 50 L 50 50 L 50 90 L 10 90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className="text-cyan-500"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-cyan-500/25">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('whitepaper.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('whitepaper.subtitle')}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Izquierda - Información */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Documento Funcional Completo
              </h3>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  El whitepaper de VIAZEN presenta una super app global que integra tres servicios esenciales en una sola plataforma:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>🏠 Alojamiento entre particulares (tipo Airbnb)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>🚗 Viajes y movilidad (tipo Uber)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>💳 Pagos y cobros con criptomonedas (tipo MercadoPago)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>{t('whitepaper.download')}</span>
              </button>
              
              <button
                onClick={handlePreview}
                className="group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold rounded-xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>{t('whitepaper.preview')}</span>
              </button>
            </div>
          </div>

          {/* Derecha - Características técnicas */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg transition-transform duration-300 ${
                    hoveredFeature === index ? 'scale-110' : ''
                  }`}>
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Efecto glow en hover */}
                {hoveredFeature === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección de estadísticas */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
              <div className="text-gray-400">Servicios integrados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">7</div>
              <div className="text-gray-400">Idiomas soportados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">&lt;3%</div>
              <div className="text-gray-400">Comisiones mínimas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
              <div className="text-gray-400">Año de lanzamiento</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
