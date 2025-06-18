import { useState } from 'react';
import { Calendar, Rocket, Building, Wallet, Globe, Zap, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DetailedRoadmapSection = () => {
  const { t } = useLanguage();
  const [activePhase, setActivePhase] = useState(0);

  const roadmapPhases = [
    {
      phase: 'Fase 1',
      period: 'Q3 2025',
      title: 'Lanzamiento Fundacional',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-500',
      status: 'upcoming',
      achievements: [
        'Lanzamiento del token VIAZ (testnet y mainnet)',
        'Inicio de preventa por fases',
        'Construcción de comunidad base',
        'Campañas educativas y onboarding'
      ]
    },
    {
      phase: 'Fase 2',
      period: 'Q4 2025',
      title: 'VIAZEN MOVE',
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      status: 'upcoming',
      achievements: [
        'Lanzamiento de transporte descentralizado',
        'Incentivos para conductores y pasajeros',
        'Integración de pagos VIAZ y stablecoins',
        'Sistema de reputación on-chain'
      ]
    },
    {
      phase: 'Fase 3',
      period: 'Q2 2026',
      title: 'VIAZEN STAY',
      icon: <Building className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      status: 'planned',
      achievements: [
        'Lanzamiento de alojamiento P2P',
        'Comisiones mínimas del 1% con VIAZ',
        'Pagos multimoneda (fiat y cripto)',
        'Sistema sin restricciones geográficas'
      ]
    },
    {
      phase: 'Fase 4',
      period: 'Q4 2026',
      title: 'VIAZEN PAY',
      icon: <Wallet className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      status: 'planned',
      achievements: [
        'Billetera descentralizada completa',
        'Sistema de recompensas con VIAZ',
        'QR para pagos en comercios',
        'Cashback y beneficios VIP'
      ]
    },
    {
      phase: 'Fase 5',
      period: '2027',
      title: 'Expansión Global',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-500',
      status: 'planned',
      achievements: [
        'Expansión LATAM: Chile, Paraguay, Perú, México',
        'Alianzas con ciudades descentralizadas',
        'Integración con DAOs locales',
        'Penetración en mercados emergentes'
      ]
    },
    {
      phase: 'Fase 6',
      period: '2028',
      title: 'VIAZEN Chain',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-cyan-500',
      status: 'vision',
      achievements: [
        'Blockchain propia de VIAZEN',
        'Eliminación de comisiones a terceros',
        'Gobernanza total on-chain',
        'Infraestructura autónoma y escalable'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      case 'planned': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'vision': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'planned': return 'Planificado';
      case 'vision': return 'Visión';
      default: return '';
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10 overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,107,0,0.1),transparent_50%)]"></div>
        
        {/* Líneas de conexión */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path d="M 50 100 Q 200 200 400 100 T 800 100" fill="none" stroke="url(#roadmapGradient)" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full mb-6 shadow-lg shadow-purple-500/25">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Roadmap 2025-2028
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hoja de ruta detallada hacia la autonomía financiera y la descentralización completa
          </p>
        </div>

        {/* Timeline Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Línea de tiempo */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
            
            <div className="grid grid-cols-6 gap-4">
              {roadmapPhases.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Punto en la línea */}
                  <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${getStatusColor(phase.status)} border-4 border-gray-900 z-10`}></div>
                  
                  {/* Tarjeta de fase */}
                  <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    activePhase === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/25' : ''
                  }`}
                  onClick={() => setActivePhase(index)}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 bg-gradient-to-br ${phase.color} rounded-lg shadow-lg`}>
                        {phase.icon}
                      </div>
                      
                      <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 ${getStatusColor(phase.status)}`}>
                          {getStatusText(phase.status)}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{phase.phase}</h3>
                        <p className="text-sm text-purple-400 font-semibold mb-2">{phase.period}</p>
                        <p className="text-sm text-gray-300">{phase.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Mobile */}
        <div className="lg:hidden space-y-6">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`p-3 bg-gradient-to-br ${phase.color} rounded-full shadow-lg`}>
                  {phase.icon}
                </div>
                {index < roadmapPhases.length - 1 && (
                  <div className="w-px h-20 bg-gradient-to-b from-current to-transparent mt-4 opacity-30"></div>
                )}
              </div>
              
              <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${getStatusColor(phase.status)}`}>
                  {getStatusText(phase.status)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.phase} - {phase.period}</h3>
                <p className="text-lg text-cyan-400 font-semibold mb-4">{phase.title}</p>
                <ul className="space-y-2">
                  {phase.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Detalles de la fase activa (Desktop) */}
        <div className="hidden lg:block mt-16">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {roadmapPhases[activePhase].phase} - {roadmapPhases[activePhase].period}
              </h3>
              <p className="text-xl text-cyan-400 font-semibold">
                {roadmapPhases[activePhase].title}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {roadmapPhases[activePhase].achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Únete a la Revolución Descentralizada
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Sé parte de VIAZEN desde el inicio y ayuda a construir el futuro de los servicios descentralizados
            </p>
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
              <Star className="w-5 h-5" />
              <span>Participar en la Preventa</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedRoadmapSection;
