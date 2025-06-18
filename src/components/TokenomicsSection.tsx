import { useEffect, useState } from 'react';

const TokenomicsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar items secuencialmente
          const items = [0, 1, 2, 3, 4, 5];
          items.forEach((item, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, item]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('tokenomics-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const tokenData = [
    {
      title: "Preventa pública",
      icon: "🔥",
      amount: "300.000.000",
      percentage: 30,
      color: "#FF6B6B",
      glowColor: "rgba(255, 107, 107, 0.5)",
      description: "Acceso temprano para inversores con descuentos exclusivos",
      lockPeriod: "Sin bloqueo",
      purpose: "Financiar el desarrollo inicial y crear liquidez para el ecosistema. Los inversores tempranos obtienen el mejor precio y beneficios adicionales."
    },
    {
      title: "Recompensas por participación y staking",
      icon: "💎",
      amount: "200.000.000",
      percentage: 20,
      color: "#4ECDC4",
      glowColor: "rgba(78, 205, 196, 0.5)",
      description: "Incentivos para usuarios activos y holders de largo plazo",
      lockPeriod: "Liberación gradual 36 meses",
      purpose: "Recompensar la participación activa en el ecosistema, hacer staking y generar liquidez. Asegura retención de usuarios y estabilidad del token."
    },
    {
      title: "Equipo fundador",
      icon: "🧠",
      amount: "150.000.000",
      percentage: 15,
      color: "#96CEB4",
      glowColor: "rgba(150, 206, 180, 0.5)",
      description: "Reserva del equipo con vesting de 12 meses",
      lockPeriod: "Bloqueado 12 meses + vesting 24 meses",
      purpose: "Alinear incentivos del equipo fundador con el éxito a largo plazo del proyecto. Previene dumping y demuestra compromiso."
    },
    {
      title: "Marketing y expansión",
      icon: "📢",
      amount: "100.000.000",
      percentage: 10,
      color: "#FF9F43",
      glowColor: "rgba(255, 159, 67, 0.5)",
      description: "Campañas publicitarias y crecimiento global",
      lockPeriod: "Liberación según métricas de crecimiento",
      purpose: "Financiar campañas de marketing, partnerships estratégicos y expansión global. Liberación condicionada a objetivos de adopción."
    },
    {
      title: "Liquidez DEX",
      icon: "🌐",
      amount: "100.000.000",
      percentage: 10,
      color: "#45B7D1",
      glowColor: "rgba(69, 183, 209, 0.5)",
      description: "Liquidez para exchanges descentralizados",
      lockPeriod: "Gradual según demanda de mercado",
      purpose: "Mantener liquidez saludable en DEXs como Uniswap y PancakeSwap. Permite trading eficiente y reduce volatilidad."
    },
    {
      title: "Desarrollo de plataforma",
      icon: "💻",
      amount: "100.000.000",
      percentage: 10,
      color: "#6C5CE7",
      glowColor: "rgba(108, 92, 231, 0.5)",
      description: "Desarrollo técnico y mejoras continuas",
      lockPeriod: "Liberación por hitos de desarrollo",
      purpose: "Financiar desarrollo de apps, infraestructura blockchain, auditorías de seguridad y actualizaciones tecnológicas."
    },
    {
      title: "Airdrops y recompensas comunitarias",
      icon: "🎁",
      amount: "50.000.000",
      percentage: 5,
      color: "#FD79A8",
      glowColor: "rgba(253, 121, 168, 0.5)",
      description: "Distribución gratuita para construir comunidad",
      lockPeriod: "Eventos programados",
      purpose: "Atraer nuevos usuarios, recompensar early adopters y crear buzz en redes sociales. Estrategia de adquisición de usuarios."
    }
  ];

  // Calcular ángulos para el gráfico circular
  const calculateAngles = () => {
    let currentAngle = 0;
    return tokenData.map((item) => {
      const startAngle = currentAngle;
      const angle = (item.percentage / 100) * 360;
      currentAngle += angle;
      return { startAngle, angle, endAngle: currentAngle };
    });
  };

  const angles = calculateAngles();

  const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <section
      id="tokenomics-section"
      className="min-h-screen relative bg-gradient-to-br from-black via-indigo-900 to-purple-900 overflow-hidden py-20"
    >
      {/* Efectos de fondo futurista */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-purple-900/20 to-black"></div>
        
        {/* Partículas brillantes */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                background: `${
                  Math.random() > 0.5 ? '#00BFFF' : 
                  Math.random() > 0.3 ? '#8A2BE2' : '#FFD700'
                }`,
                animation: `pulse ${1 + Math.random() * 2}s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 15px ${
                  Math.random() > 0.5 ? '#00BFFF' : '#8A2BE2'
                }`
              }}
            />
          ))}
        </div>

        {/* Líneas de circuito */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path
              d="M0,400 Q300,100 600,400 T1200,400"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M0,200 Q200,500 400,200 T800,200 T1200,200"
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            TOKENOMICS DEL TOKEN VIAZ
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full mb-8 animate-pulse"></div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Nuestro token <span className="text-blue-400 font-bold">VIAZ</span> es el motor financiero del ecosistema VIAZEN. 
            Diseñado con un modelo <span className="text-purple-400 font-bold">deflacionario</span>, 
            <span className="text-cyan-400 font-bold"> transparente</span> y con beneficios para los 
            <span className="text-yellow-400 font-bold"> primeros inversores</span>.
          </p>
          
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-blue-500/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🎯 Modelo Económico Sostenible
            </h3>
            <p className="text-gray-300 leading-relaxed text-center">
              La distribución de 1.000.000.000 tokens VIAZ está diseñada para garantizar 
              <span className="text-cyan-400 font-semibold"> liquidez saludable</span>, 
              <span className="text-purple-400 font-semibold"> crecimiento sostenible</span> y 
              <span className="text-yellow-400 font-semibold"> alineación de incentivos</span> entre todos los participantes del ecosistema.
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Gráfico circular 3D */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="relative flex items-center justify-center">
              <div className="relative w-96 h-96">
                <svg className="w-full h-full transform hover:scale-105 transition-transform duration-300" viewBox="0 0 400 400">
                  <defs>
                    {tokenData.map((item, index) => (
                      <filter key={index} id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  
                  {/* Sombra del gráfico */}
                  <circle cx="205" cy="205" r="150" fill="rgba(0,0,0,0.3)" />
                  
                  {/* Segmentos del gráfico */}
                  {tokenData.map((item, index) => {
                    const { startAngle, angle } = angles[index];
                    const path = createArcPath(200, 200, 150, startAngle, startAngle + angle);
                    
                    return (
                      <g key={index}>
                        <path
                          d={path}
                          fill={item.color}
                          stroke="#fff"
                          strokeWidth="2"
                          filter={`url(#glow-${index})`}
                          className={`transition-all duration-300 cursor-pointer ${
                            hoveredSegment === index ? 'opacity-100 scale-105' : 'opacity-80'
                          }`}
                          style={{
                            transformOrigin: '200px 200px',
                            filter: hoveredSegment === index ? `drop-shadow(0 0 20px ${item.glowColor})` : 'none'
                          }}
                          onMouseEnter={() => setHoveredSegment(index)}
                          onMouseLeave={() => setHoveredSegment(null)}
                        />
                        
                        {/* Etiquetas de porcentaje */}
                        <text
                          x={200 + Math.cos((startAngle + angle/2 - 90) * Math.PI/180) * 100}
                          y={200 + Math.sin((startAngle + angle/2 - 90) * Math.PI/180) * 100}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-white font-bold text-lg"
                          style={{
                            filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))'
                          }}
                        >
                          {item.percentage}%
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Centro del gráfico */}
                  <circle cx="200" cy="200" r="40" fill="url(#centerGradient)" stroke="#fff" strokeWidth="3"/>
                  <defs>
                    <radialGradient id="centerGradient">
                      <stop offset="0%" stopColor="#4A90E2"/>
                      <stop offset="100%" stopColor="#8A2BE2"/>
                    </radialGradient>
                  </defs>
                  <text x="200" y="190" textAnchor="middle" className="fill-white font-bold text-sm">TOTAL</text>
                  <text x="200" y="205" textAnchor="middle" className="fill-white font-bold text-xs">1.000M</text>
                  <text x="200" y="220" textAnchor="middle" className="fill-cyan-400 font-bold text-xs">VIAZ</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Lista de distribución */}
          <div className={`space-y-6 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            {tokenData.map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  animatedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${hoveredSegment === index ? 'scale-105' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 group">
                  {/* Efecto de brillo */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(45deg, ${item.color}, transparent)`
                    }}
                  ></div>
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    <div 
                      className="text-4xl p-3 rounded-full"
                      style={{ 
                        backgroundColor: `${item.color}20`,
                        boxShadow: `0 0 20px ${item.glowColor}`
                      }}
                    >
                      {item.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      
                      {/* Información de bloqueo */}
                      <div className="mb-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs">🔒</span>
                          <span className="text-xs font-semibold text-gray-300">Período de bloqueo:</span>
                        </div>
                        <span className="text-xs text-cyan-400">{(item as any).lockPeriod}</span>
                      </div>
                      
                      {/* Propósito técnico */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 leading-relaxed">{(item as any).purpose}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold" style={{ color: item.color }}>
                          {item.amount} VIAZ
                        </span>
                        <span className="text-lg font-semibold text-gray-300">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Análisis técnico y estadísticas */}
        <div className={`mt-16 space-y-8 transform transition-all duration-1000 ${
          animatedItems.length >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Estadísticas principales */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-blue-400">1.000M</div>
              <div className="text-gray-400 text-sm">Total Supply</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl border border-red-500/30">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-red-400">30%</div>
              <div className="text-gray-400 text-sm">Preventa Pública</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-purple-400">Deflacionario</div>
              <div className="text-gray-400 text-sm">Modelo económico</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl border border-cyan-500/30">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-cyan-400">ERC-20</div>
              <div className="text-gray-400 text-sm">Estándar blockchain</div>
            </div>
          </div>

          {/* Garantías de sostenibilidad */}
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🛡️ Garantías de Sostenibilidad y Transparencia
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-600/10 rounded-xl border border-green-500/20">
                <h4 className="text-lg font-bold text-green-400 mb-2">📊 Vesting Inteligente</h4>
                <p className="text-sm text-gray-300">
                  El 65% de los tokens tienen períodos de bloqueo o liberación gradual, 
                  evitando dumping masivo y asegurando estabilidad del precio.
                </p>
              </div>
              
              <div className="text-center p-4 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <h4 className="text-lg font-bold text-blue-400 mb-2">🔍 Transparencia Total</h4>
                <p className="text-sm text-gray-300">
                  Todas las wallets del equipo y reservas son públicas. 
                  Smart contracts auditados y código open source disponible.
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-600/10 rounded-xl border border-purple-500/20">
                <h4 className="text-lg font-bold text-purple-400 mb-2">🎯 Utilidad Real</h4>
                <p className="text-sm text-gray-300">
                  VIAZ no es solo especulación: es el token de utilidad para 
                  transporte, alojamiento y pagos en todo el ecosistema.
                </p>
              </div>
            </div>
          </div>

          {/* Cronograma de liberación */}
          <div className="bg-gradient-to-r from-indigo-800/40 to-purple-800/40 backdrop-blur-sm rounded-3xl p-8 border border-indigo-500/30">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              📅 Cronograma de Liberación de Tokens
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <div className="font-semibold text-white">Lanzamiento (Mes 0)</div>
                    <div className="text-sm text-gray-400">Preventa pública + Liquidez inicial</div>
                  </div>
                </div>
                <div className="text-cyan-400 font-bold">400M tokens (40%)</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="font-semibold text-white">Año 1</div>
                    <div className="text-sm text-gray-400">Marketing + Desarrollo + Recompensas</div>
                  </div>
                </div>
                <div className="text-purple-400 font-bold">300M tokens (30%)</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="font-semibold text-white">Años 2-3</div>
                    <div className="text-sm text-gray-400">Equipo fundador + Staking + Expansión</div>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">300M tokens (30%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${
          animatedItems.length >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-2 border-blue-400/50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Contenido del botón */}
            <span className="relative flex items-center space-x-3">
              <span>📊</span>
              <span>Ver más detalles técnicos del token</span>
            </span>
            
            {/* Anillo pulsante */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
