import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const RewardsSection = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const rewards = [
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Tokens por Uso",
      value: "5-15%",
      description: "Gana VZN tokens en cada transacción que realices en la plataforma"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      title: "APY Staking",
      value: "12-25%",
      description: "Rendimientos anuales por mantener tus tokens en staking"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      title: "Referidos",
      value: "500 VZN",
      description: "Tokens de bonificación por cada nuevo usuario que invites"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Governance",
      value: "1 VZN = 1 Voto",
      description: "Participa en las decisiones del futuro de la plataforma"
    }
  ];

  const stats = [
    {
      number: "500K+",
      label: "Tokens en Circulación",
      icon: "💎"
    },
    {
      number: "15%",
      label: "APY Promedio",
      icon: "📈"
    },
    {
      number: "10K+",
      label: "Holders Activos",
      icon: "👥"
    },
    {
      number: "$2.5M",
      label: "Market Cap",
      icon: "💰"
    }
  ];

  return (
    <section ref={elementRef} className="relative py-20 md:py-32 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Sistema de Recompensas
            </span>
          </h2>
          <p 
            className={`text-lg md:text-xl text-blue-100 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Gana tokens VZN por cada interacción y construye tu patrimonio digital
          </p>
        </div>

        {/* Estadísticas principales */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tarjetas de recompensas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`relative group transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 group-hover:scale-105 relative overflow-hidden">
                {/* Efecto de brillo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {reward.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                        {reward.title}
                      </h3>
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        {reward.value}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de token VZN */}
        <div 
          className={`bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-8 md:p-12 border border-yellow-500/20 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">VZN</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Viazen Token</h3>
                <p className="text-yellow-300">El futuro del transporte descentralizado</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Nuestro token nativo VZN es el corazón del ecosistema Viazen. Úsalo para pagar servicios, 
              ganar recompensas, participar en governance y acceder a beneficios exclusivos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🔄</div>
                <h4 className="text-lg font-semibold text-white mb-2">Utility Token</h4>
                <p className="text-gray-300 text-sm">Paga servicios y reduce comisiones</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🏆</div>
                <h4 className="text-lg font-semibold text-white mb-2">Rewards Token</h4>
                <p className="text-gray-300 text-sm">Gana tokens por participar</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🗳️</div>
                <h4 className="text-lg font-semibold text-white mb-2">Governance Token</h4>
                <p className="text-gray-300 text-sm">Vota en decisiones importantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
