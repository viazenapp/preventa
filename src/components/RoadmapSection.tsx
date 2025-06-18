import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RoadmapSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPhases, setAnimatedPhases] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar fases secuencialmente
          const phases = [0, 1, 2, 3, 4, 5];
          phases.forEach((phase, index) => {
            setTimeout(() => {
              setAnimatedPhases(prev => [...prev, phase]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('roadmap-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const roadmapData = [
    {
      phase: "FASE 1",
      title: "Fundación y Concepto",
      period: "Junio 2025",
      icon: "🚀",
      status: "completed",
      items: [
        "Compra del dominio viazen.app",
        "Diseño conceptual del ecosistema: Transporte, Alojamiento y Pagos",
        "Desarrollo de identidad visual y logo"
      ],
      color: "from-yellow-400 to-amber-500",
      bgColor: "from-yellow-500/10 to-amber-500/10",
      glowColor: "shadow-yellow-500/30"
    },
    {
      phase: "FASE 2",
      title: "Lanzamiento Web y Comunidad",
      period: "Julio 2025",
      icon: "📱",
      status: "active",
      items: [
        "Publicación de la web oficial",
        "Creación de cuentas en redes sociales (X, Instagram, Telegram)",
        "Campañas de captación de interesados"
      ],
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10",
      glowColor: "shadow-orange-500/30"
    },
    {
      phase: "FASE 3",
      title: "Preventa del Token VIAZ",
      period: "15 de Julio 2025",
      icon: "🏨",
      status: "upcoming",
      items: [
        "Apertura oficial de la preventa",
        "Venta inicial del token a precio exclusivo",
        "Recompensas por referidos y airdrops"
      ],
      color: "from-purple-400 to-violet-500",
      bgColor: "from-purple-500/10 to-violet-500/10",
      glowColor: "shadow-purple-500/30"
    },
    {
      phase: "FASE 4",
      title: "Desarrollo de la App",
      period: "Octubre 2025",
      icon: "💳",
      status: "upcoming",
      items: [
        "Inicio del desarrollo de la App de Transporte (como Uber/Didi)",
        "Integración de pagos tradicionales y cripto",
        "App sin límites geográficos y con comisiones del 5%"
      ],
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      glowColor: "shadow-blue-500/30"
    },
    {
      phase: "FASE 5",
      title: "Expansión del Ecosistema",
      period: "2026",
      icon: "🌐",
      status: "upcoming",
      items: [
        "Lanzamiento del módulo de Alojamiento (como Airbnb)",
        "Desarrollo del módulo de Pagos (como MercadoPago)",
        "Creación de la blockchain propia para bajas comisiones y control de inflación"
      ],
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      glowColor: "shadow-green-500/30"
    },
    {
      phase: "FASE 6",
      title: "Escalamiento Global",
      period: "2027 en adelante",
      icon: "📈",
      status: "upcoming",
      items: [
        "Expansión a toda Latinoamérica, luego Europa y Asia",
        "Inclusión de más servicios dentro del ecosistema VIAZEN",
        "Desarrollo de alianzas estratégicas y DAO comunitaria"
      ],
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-500/10 to-blue-500/10",
      glowColor: "shadow-cyan-500/30"
    }
  ];

  return (
    <section
      id="roadmap-section"
      className="min-h-screen relative bg-gradient-to-br from-black via-slate-900 to-purple-900 overflow-hidden py-20"
    >
      {/* Efectos de fondo espacial */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/30 via-purple-900/20 to-black"></div>
        
        {/* Partículas espaciales brillantes */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 4}px`,
                height: `${1 + Math.random() * 4}px`,
                background: `${
                  Math.random() > 0.6 ? '#00FFFF' : 
                  Math.random() > 0.3 ? '#8B5CF6' : 
                  Math.random() > 0.1 ? '#FFFFFF' : '#FFD700'
                }`,
                animation: `pulse ${1 + Math.random() * 3}s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 10px ${
                  Math.random() > 0.5 ? '#00FFFF' : '#8B5CF6'
                }`
              }}
            />
          ))}
        </div>

        {/* Líneas en movimiento */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent h-px"
              style={{
                top: `${15 + i * 15}%`,
                left: '0',
                right: '0',
                animation: `slideRight ${8 + i * 2}s infinite linear`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        {/* Líneas de conexión holográficas */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8"/>
              <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.6"/>
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <path
            d="M100,400 Q300,200 500,400 T900,400 T1100,300"
            stroke="url(#roadmapGradient)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200,600 Q400,400 600,600 T1000,600"
            stroke="url(#roadmapGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>

        {/* Nebulosas de colores */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-white bg-clip-text text-transparent">
            ROADMAP VIAZEN
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8 animate-pulse"></div>
          
          {/* Texto introductorio */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-3xl animate-pulse">🔭</span>
            <p className="text-lg md:text-xl text-cyan-400 font-semibold italic">
              {t('roadmap.subtitle')}
            </p>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('roadmap.masterPlan')} <span className="text-cyan-400 font-bold">VIAZEN</span>{' '}
            {t('roadmap.revolutionize')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea central del timeline - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full opacity-30 hidden md:block"></div>
          
          {/* Línea lateral del timeline - Mobile */}
          <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full opacity-30 block md:hidden"></div>
          
          <div className="space-y-8 md:space-y-16">
            {roadmapData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  // Desktop: alterna izquierda/derecha, Mobile: siempre a la derecha
                  index % 2 === 0 ? 'md:flex-row flex-row' : 'md:flex-row-reverse flex-row'
                } transform transition-all duration-1000 ${
                  animatedPhases.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Contenido de la fase */}
                <div className={`
                  w-full md:w-5/12 
                  ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} 
                  text-left pl-16 md:pl-0
                `}>
                  <div className={`relative p-8 rounded-2xl border border-transparent bg-gradient-to-br ${item.bgColor} backdrop-blur-sm hover:scale-105 transition-all duration-500 group shadow-2xl ${(item as any).glowColor || 'shadow-cyan-500/20'}`}>
                    {/* Marco holográfico animado */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse`}></div>
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur transition-all duration-500`}></div>
                    
                    {/* Efectos de esquinas brillantes */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl opacity-60"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl opacity-60"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                            {item.phase}
                          </h3>
                          <h4 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h4>
                          <p className="text-cyan-400 font-medium text-sm">{item.period}</p>
                        </div>
                        <div className={`text-5xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg`} style={{
                          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
                        }}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {item.items.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} mt-2 animate-pulse`}></div>
                            <p className="text-gray-300 text-sm leading-relaxed flex-1">{feature}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Indicador de estado mejorado */}
                      <div className="mt-6 flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${
                          item.status === 'completed' ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' :
                          item.status === 'active' ? 'bg-cyan-500 animate-ping shadow-lg shadow-cyan-500/50' :
                          'bg-gray-500 opacity-50'
                        }`}></div>
                        <span className={`text-sm font-medium uppercase tracking-wider ${
                          item.status === 'completed' ? 'text-green-400' :
                          item.status === 'active' ? 'text-cyan-400' :
                          'text-gray-400'
                        }`}>
                          {item.status === 'completed' ? '✅ Completado' :
                           item.status === 'active' ? '🔄 En Progreso' : '⏳ Próximamente'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nodo del timeline */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border-3 md:border-4 border-purple-500 bg-gray-900 flex items-center justify-center z-10">
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${item.color} animate-pulse`}></div>
                </div>

                {/* Espacio vacío del otro lado - Solo desktop */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje final */}
        <div className={`text-center mt-20 transform transition-all duration-1000 ${
          animatedPhases.length >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              🌟 Únete a la <span className="text-cyan-400">Revolución VIAZEN</span>
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Este roadmap representa nuestro compromiso con la <span className="text-cyan-400 font-bold">innovación descentralizada</span>. 
              Cada fase nos acerca más a un futuro donde los <span className="text-purple-400 font-bold">viajes, alojamientos y pagos</span> sean 
              <span className="text-yellow-400 font-bold"> libres, justos y globales</span>.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Fundación ✓</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                  <span className="text-cyan-400">Web & Comunidad</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-400">Preventa Próximamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default RoadmapSection;
