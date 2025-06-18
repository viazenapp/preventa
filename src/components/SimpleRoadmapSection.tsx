const SimpleRoadmapSection = () => {
  const roadmapItems = [
    {
      quarter: "Q3 2025",
      title: "Preventa y Comunidad",
      description: "Lanzamiento de la preventa de tokens VZN, construcción de la comunidad y desarrollo del MVP.",
      status: "current",
      items: [
        "Preventa de tokens VZN",
        "Comunidad Discord y Telegram",
        "Whitepaper v2.0",
        "Partnerships estratégicos"
      ],
      icon: "🚀",
      color: "blue"
    },
    {
      quarter: "Q4 2025",
      title: "App de Transporte",
      description: "Lanzamiento de la aplicación de transporte descentralizado en ciudades piloto.",
      status: "upcoming",
      items: [
        "MVP de transporte",
        "Lanzamiento en 3 ciudades",
        "Onboarding de conductores",
        "Sistema de pagos básico"
      ],
      icon: "🚗",
      color: "purple"
    },
    {
      quarter: "Q1 2026",
      title: "Alojamiento y Pagos",
      description: "Integración del módulo de alojamiento y sistema completo de pagos descentralizados.",
      status: "upcoming",
      items: [
        "Módulo de alojamiento",
        "Billeteras integradas",
        "Staking de tokens",
        "Programa de recompensas"
      ],
      icon: "🏠",
      color: "green"
    },
    {
      quarter: "Q2 2026",
      title: "Lanzamiento Global",
      description: "Expansión global, governance descentralizado y marketplace completo.",
      status: "future",
      items: [
        "Lanzamiento global",
        "DAO governance",
        "Marketplace NFT",
        "Expansión a 50+ ciudades"
      ],
      icon: "🌍",
      color: "yellow"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'from-yellow-400 to-amber-600';
      case 'upcoming':
        return 'from-amber-400 to-yellow-600';
      case 'future':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-yellow-400 to-amber-600';
    }
  };

  const getItemColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-yellow-400 to-amber-600';
      case 'purple':
        return 'from-gray-400 to-gray-600';
      case 'green':
        return 'from-amber-500 to-yellow-700';
      case 'yellow':
        return 'from-yellow-300 to-amber-500';
      default:
        return 'from-yellow-400 to-amber-600';
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-800/60 to-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-gray-400 bg-clip-text text-transparent" style={{textShadow: '0 0 30px rgba(255, 215, 0, 0.4)'}}>
              Roadmap 2025-2026
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Nuestro plan para revolucionar el futuro del transporte, alojamiento y pagos descentralizados
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea principal del timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 via-amber-500 to-gray-500 hidden md:block"></div>

          {/* Items del roadmap */}
          <div className="space-y-12 md:space-y-24">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Indicador del timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full border-4 border-gray-900 z-10 hidden md:block"></div>

                {/* Contenido */}
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Tarjeta del contenido */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500 group hover:scale-105 relative overflow-hidden">
                      {/* Status indicator */}
                      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getStatusColor(item.status)}`}></div>
                      
                      {/* Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${getItemColor(item.color)} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-amber-300 mb-1">{item.quarter}</div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Lista de características */}
                      <div className="space-y-3">
                        {item.items.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${getItemColor(item.color)} rounded-full`}></div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Status badge */}
                      <div className="mt-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'current' 
                            ? 'bg-blue-900/30 text-blue-300 border border-blue-500/30' 
                            : item.status === 'upcoming'
                            ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
                            : 'bg-gray-900/30 text-gray-400 border border-gray-500/30'
                        }`}>
                          {item.status === 'current' && '🔥 En Progreso'}
                          {item.status === 'upcoming' && '⏳ Próximamente'}
                          {item.status === 'future' && '🔮 Planificado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer para mantener el layout */}
                  <div className="hidden md:block w-2/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border border-amber-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 ¡Únete desde el principio!
            </h3>
            <p className="text-gray-300 mb-6">
              Participa en la preventa y sé parte de la revolución del transporte descentralizado
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-amber-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Descuentos exclusivos para early adopters</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Acceso prioritario a nuevas funciones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleRoadmapSection;
