import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

// Componentes de logos para medios de pago
const USDTIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#26A17B"/>
    <path d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66V10.3h4.04v3.766c3.946.174 6.9.851 6.9 1.66 0 .81-2.954 1.487-6.9 1.66zm0-3.949v-.427h-4.04v.427c-3.426.16-5.91.746-5.91 1.449 0 .704 2.484 1.29 5.91 1.45v4.613h4.04v-4.613c3.482-.16 6.02-.746 6.02-1.45 0-.703-2.538-1.289-6.02-1.449z" fill="white"/>
  </svg>
);

const BUSDIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#F0B90B"/>
    <path d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.26L16 26l-6.144-6.144 2.26-2.26zm9.764-5.74L26 16l-2.26 2.26L21.48 16l2.26-2.26z" fill="white"/>
  </svg>
);

const ETHIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#627EEA"/>
    <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="white" fillOpacity="0.6"/>
    <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="white"/>
    <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="white" fillOpacity="0.6"/>
    <path d="M16.498 27.995v-6.028L9 17.616l7.498 10.379z" fill="white"/>
    <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z" fill="white" fillOpacity="0.2"/>
    <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z" fill="white" fillOpacity="0.6"/>
  </svg>
);

const BNBIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
    <path d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.26L16 26l-6.144-6.144 2.26-2.26zm9.764-5.74L26 16l-2.26 2.26L21.48 16l2.26-2.26z" fill="white"/>
    <path d="M16 18.5l-1.45-1.45L16 15.6l1.45 1.45L16 18.5z" fill="white"/>
  </svg>
);

const BTCIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#F7931A"/>
    <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.181-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313L8.53 19.998l2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.874 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white"/>
  </svg>
);

const VisaIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="4" fill="#1A1F71"/>
    <path d="M13.8 22.4L11.2 9.6h2.8l2.6 12.8h-2.8zm8.2-12.8l-2.4 12.8h-2.6l1.8-10.4-2.2 10.4h-2.4L15.4 9.6h2.8l1.4 8.8 2.2-8.8h2.2zm6.4 0c.6 0 1 .4 1 1v10.8c0 .6-.4 1-1 1h-2.8c-.6 0-1-.4-1-1V10.6c0-.6.4-1 1-1h2.8zm-8.8 8.4c0-1.2-1.2-2.2-2.6-2.2s-2.6 1-2.6 2.2 1.2 2.2 2.6 2.2 2.6-1 2.6-2.2z" fill="white"/>
  </svg>
);

const MastercardIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="4" fill="#EB001B"/>
    <circle cx="12" cy="16" r="8" fill="#EB001B"/>
    <circle cx="20" cy="16" r="8" fill="#F79E1B"/>
    <path d="M16 8c1.4 1.4 2.3 3.3 2.3 5.5s-.9 4.1-2.3 5.5c-1.4-1.4-2.3-3.3-2.3-5.5S14.6 9.4 16 8z" fill="#FF5F00"/>
  </svg>
);

const BankIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="4" fill="#50C878"/>
    <path d="M16 4l12 6v2H4V10l12-6zm-8 8h2v8h-2v-8zm4 0h2v8h-2v-8zm4 0h2v8h-2v-8zm4 0h2v8h-2v-8zm4 0h2v8h-2v-8zm-14 10h16v2H6v-2z" fill="white"/>
  </svg>
);

const PagoFacilIcon = ({ size = 24 }) => (
  <div className="flex items-center justify-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 240 80" fill="none">
      {/* Logo real de Pago Fácil */}
      <rect width="240" height="80" rx="8" fill="#FF4D00"/>
      <text x="20" y="30" fontSize="16" fontWeight="bold" fill="white">PAGO</text>
      <text x="20" y="50" fontSize="16" fontWeight="bold" fill="white">FÁCIL</text>
      <circle cx="180" cy="25" r="15" fill="white"/>
      <path d="M175 25h10M180 20v10" stroke="#FF4D00" strokeWidth="2"/>
      <rect x="160" y="45" width="60" height="20" rx="10" fill="white"/>
      <text x="175" y="58" fontSize="10" fontWeight="bold" fill="#FF4D00">RÁPIDO</text>
    </svg>
  </div>
);

const MercadoPagoIcon = ({ size = 24 }) => (
  <div className="flex items-center justify-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 120 80" fill="none">
      {/* Logo real de MercadoPago */}
      <rect width="120" height="80" rx="8" fill="#009EE3"/>
      <circle cx="25" cy="40" r="15" fill="white"/>
      <path d="M20 35h10M20 40h10M20 45h10" stroke="#009EE3" strokeWidth="2" strokeLinecap="round"/>
      <text x="45" y="25" fontSize="8" fontWeight="bold" fill="white">Mercado</text>
      <text x="45" y="40" fontSize="8" fontWeight="bold" fill="white">PAGO</text>
      <circle cx="100" cy="25" r="8" fill="#FFD100"/>
      <path d="M96 25l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="75" y="50" width="35" height="15" rx="7" fill="white"/>
      <text x="85" y="60" fontSize="6" fontWeight="bold" fill="#009EE3">SEGURO</text>
    </svg>
  </div>
);

const NewTokenomicsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar los porcentajes progresivamente
          const percentages = [20, 10, 12, 20, 15, 10, 10, 3];
          percentages.forEach((percentage, index) => {
            setTimeout(() => {
              setAnimatedPercentages(prev => [...prev, percentage]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('tokenomics-section');
    if (element) {
      observer.observe(element);
    } else {
      // Fallback: activar animaciones después de un pequeño delay si no se encuentra el elemento
      setTimeout(() => {
        setIsVisible(true);
        const percentages = [20, 10, 12, 20, 15, 10, 10, 3];
        percentages.forEach((percentage, index) => {
          setTimeout(() => {
            setAnimatedPercentages(prev => [...prev, percentage]);
          }, index * 100);
        });
      }, 1000);
    }

    return () => observer.disconnect();
  }, []);

  // Datos para el gráfico de torta - Distribución del Token VIAZ
  const distributionData = [
    { 
      name: 'Preventa pública', 
      value: 20, 
      color: '#3B82F6', 
      icon: '🔵',
      description: '200.000.000 VIAZ',
      details: 'Se venderán en etapas, con precios crecientes'
    },
    { 
      name: 'Recompensas / Airdrops', 
      value: 10, 
      color: '#8B5CF6', 
      icon: '🟣',
      description: '100.000.000 VIAZ',
      details: 'Incentivos por uso, referidos, comunidad'
    },
    { 
      name: 'Incentivo por holding', 
      value: 12, 
      color: '#EF4444', 
      icon: '🔴',
      description: '120.000.000 VIAZ',
      details: 'Sistema de tenencia con recompensas mensuales'
    },
    { 
      name: 'Comunidad y usuarios', 
      value: 20, 
      color: '#10B981', 
      icon: '🟢',
      description: '200.000.000 VIAZ',
      details: 'Bonificaciones para early adopters y usuarios activos'
    },
    { 
      name: 'Desarrollo del ecosistema', 
      value: 15, 
      color: '#F59E0B', 
      icon: '🟡',
      description: '150.000.000 VIAZ',
      details: 'Equipos técnicos, servidores, infraestructura descentralizada'
    },
    { 
      name: 'Liquidez inicial en DEXs', 
      value: 10, 
      color: '#F97316', 
      icon: '🟠',
      description: '100.000.000 VIAZ',
      details: 'Para exchanges como PancakeSwap, Uniswap'
    },
    { 
      name: 'Equipo fundador y advisors', 
      value: 10, 
      color: '#6B7280', 
      icon: '⚪',
      description: '100.000.000 VIAZ',
      details: 'Bloqueados por 12 meses con desbloqueo gradual'
    },
    { 
      name: 'Marketing, alianzas, expansión', 
      value: 3, 
      color: '#06B6D4', 
      icon: '🔷',
      description: '30.000.000 VIAZ',
      details: 'Campañas, influencers, alianzas estratégicas'
    }
  ];

  // Datos para las fases de preventa
  const presalePhases = [
    { fase: 'Fase 1', precio: '$0.010 USD', cantidad: '80.000.000 VIAZ', acceso: 'Preventa privada', color: '#FF6B6B' },
    { fase: 'Fase 2', precio: '$0.020 USD', cantidad: '60.000.000 VIAZ', acceso: 'Comunidad y whitelist', color: '#4ECDC4' },
    { fase: 'Fase 3', precio: '$0.030 USD', cantidad: '40.000.000 VIAZ', acceso: 'Preventa pública', color: '#45B7D1' },
    { fase: 'Lanzamiento', precio: '$0.10 USD', cantidad: '—', acceso: 'Precio en exchanges', color: '#96CEB4' }
  ];

  // Objetivos de recaudación
  const fundraisingGoals = [
    {
      icon: '🚀',
      title: 'Desarrollo de la app',
      description: 'Financiar el desarrollo de la app de transporte y expansión inicial',
      color: '#FF6B6B'
    },
    {
      icon: '💧',
      title: 'Liquidez en exchanges',
      description: 'Asegurar liquidez en exchanges descentralizados',
      color: '#4ECDC4'
    },
    {
      icon: '🎁',
      title: 'Recompensas usuarios',
      description: 'Recompensar a los primeros usuarios del ecosistema',
      color: '#45B7D1'
    },
    {
      icon: '🔒',
      title: 'Seguridad técnica',
      description: 'Cubrir costos técnicos y de seguridad (auditorías, servidores, APIs)',
      color: '#96CEB4'
    }
  ];

  // Métodos de pago
  const paymentMethods = [
    { name: 'USDT', icon: <USDTIcon size={20} />, type: 'crypto', color: '#26A17B' },
    { name: 'BUSD', icon: <BUSDIcon size={20} />, type: 'crypto', color: '#F0B90B' },
    { name: 'ETH', icon: <ETHIcon size={20} />, type: 'crypto', color: '#627EEA' },
    { name: 'BNB', icon: <BNBIcon size={20} />, type: 'crypto', color: '#F3BA2F' },
    { name: 'BTC', icon: <BTCIcon size={20} />, type: 'crypto', color: '#F7931A' },
    { name: 'Visa/Mastercard', icon: <VisaIcon size={20} />, type: 'traditional', color: '#1A1F71' },
    { name: 'Transferencias', icon: <BankIcon size={20} />, type: 'traditional', color: '#50C878' },
    { name: 'Pago Fácil', icon: <PagoFacilIcon size={20} />, type: 'traditional', color: '#FF6B6B' },
    { name: 'MercadoPago', icon: <MercadoPagoIcon size={20} />, type: 'traditional', color: '#00A0FF' }
  ];

  const handlePresaleParticipation = () => {
    // Scroll a la sección de preventa o abrir modal
    const presaleElement = document.getElementById('presale-banner');
    if (presaleElement) {
      presaleElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tokenomics-section" className="relative py-20 bg-gray-900 overflow-x-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
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
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tokenomics-circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 20 20 L 100 20 L 100 60 L 60 60 L 60 100 L 20 100 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tokenomics-circuit)" className="text-cyan-500"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado principal */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-6 shadow-lg shadow-purple-500/25">
            <span className="text-2xl">🪙</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {t('tokenomics.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('tokenomics.subtitle')}
          </p>
          
          <div className="mt-8 inline-flex items-center space-x-4 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-full px-8 py-4 border border-purple-500/30">
            <span className="text-2xl font-bold text-purple-300">{t('tokenomics.totalSupply')}</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              1.000.000.000 VIAZ
            </span>
          </div>
        </div>

        {/* Distribución del Token VIAZ - Gráfico Principal */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {t('tokenomics.distribution.title')}
              </span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t('tokenomics.distribution.subtitle')}
            </p>
          </div>

          {/* Gráfico centralizado */}
          <div className="flex flex-col items-center justify-center">
            {/* Gráfico de torta - Desktop centrado */}
            <div className="w-full max-w-4xl relative mb-12 px-4 py-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-visible">
                {/* Efectos de fondo futurista */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
                
                <div className="relative z-10">
                  {/* Gráfico circular - Desktop */}
                  <div className="hidden md:block h-[500px] relative px-8 py-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={distributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={90}
                          outerRadius={180}
                          paddingAngle={3}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={2500}
                          animationEasing="ease-out"
                          label={({ name, value, percent, payload }) => `${value}%\n${payload.name}`}
                          labelLine={false}
                        >
                          {distributionData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              stroke={entry.color}
                              strokeWidth={3}
                              style={{
                                filter: `drop-shadow(0 0 8px ${entry.color}40)`,
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [
                            `${value}% - ${props.payload.description}`, 
                            props.payload.details
                          ]}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{ 
                            backgroundColor: '#111827', 
                            border: '1px solid #374151',
                            borderRadius: '12px',
                            color: '#e5e7eb',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            position: 'relative'
                          }}
                          wrapperStyle={{ 
                            zIndex: 9999,
                            position: 'relative'
                          }}
                          allowEscapeViewBox={{ x: true, y: true }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Centro del gráfico con información clave */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center bg-gray-900/95 backdrop-blur-md rounded-full p-10 border-2 border-purple-500/40 shadow-2xl">
                        <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">{t('tokenomics.totalSupply')}</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          1.000.000.000
                        </div>
                        <div className="text-xl font-bold text-white mt-1">VIAZ</div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de barras - Mobile */}
                  <div className="md:hidden h-80 px-4 py-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={distributionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis 
                          dataKey="icon" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF', fontSize: 16 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                          formatter={(value, name, props) => [
                            `${value}% - ${props.payload.description}`, 
                            props.payload.details
                          ]}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{ 
                            backgroundColor: '#111827', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#e5e7eb',
                            zIndex: 9999,
                            position: 'relative'
                          }}
                          wrapperStyle={{ 
                            zIndex: 9999,
                            position: 'relative'
                          }}
                          allowEscapeViewBox={{ x: true, y: true }}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[4, 4, 0, 0]}
                          animationDuration={2000}
                        >
                          {distributionData.map((entry, index) => (
                            <Cell 
                              key={`bar-${index}`} 
                              fill={entry.color}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Leyenda detallada centrada */}
            <div className="w-full max-w-7xl mx-auto">
              <h4 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <span className="mr-3">📊</span>
                Distribución total del suministro (1.000.000.000 VIAZ)
              </h4>
              
              {/* Tabla detallada para Desktop */}
              <div className="hidden md:block bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/80">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Uso</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">Porcentaje</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">Tokens asignados</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Detalles clave</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {distributionData.map((item, index) => (
                        <tr 
                          key={index}
                          className={`hover:bg-gray-700/30 transition-all duration-500 ${
                            animatedPercentages.includes(item.value) ? 'opacity-100 transform-none' : 'opacity-60 translate-y-2'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
                              >
                                {item.icon}
                              </div>
                              <span className="font-bold text-white group-hover:text-purple-300 transition-colors">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-2xl font-bold" style={{ color: item.color }}>
                              {item.value}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-bold text-white">
                              {item.description}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-300">
                              {item.details}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cards para Mobile */}
              <div className="md:hidden grid gap-4">
                {distributionData.map((item, index) => (
                  <div
                    key={index}
                    className={`group p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02] ${
                      animatedPercentages.includes(item.value) ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}40` }}
                          >
                            {item.icon}
                          </div>
                          <h5 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                            {item.name}
                          </h5>
                        </div>
                        <div className="text-xl font-bold" style={{ color: item.color }}>
                          {item.value}%
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tokens asignados:</span>
                          <span className="font-bold text-white">{item.description}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Detalles: </span>
                          <span className="text-gray-300">{item.details}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estrategia Anti-inflacionaria */}
              <div className="mt-12 bg-gradient-to-r from-green-800/30 to-emerald-800/30 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
                <h5 className="text-2xl font-bold text-green-300 mb-6 flex items-center justify-center">
                  <span className="mr-3">🛡️</span>
                  Estrategia Anti-inflacionaria
                </h5>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-white mb-1">Suministro fijo (Hard Cap)</h6>
                        <p className="text-gray-300 text-sm">No se emitirá más del suministro total establecido</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">🔥</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-white mb-1">Mecanismos de quema (Burn)</h6>
                        <p className="text-gray-300 text-sm">Parte de las comisiones recaudadas serán quemadas</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">💎</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-white mb-1">Staking y holding beneficioso</h6>
                        <p className="text-gray-300 text-sm">Genera beneficios en lugar de inflar la oferta</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">📈</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-white mb-1">Utilidad real del ecosistema</h6>
                        <p className="text-gray-300 text-sm">La demanda aumentará sin intervención artificial</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="mt-8 bg-gradient-to-r from-blue-800/30 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <h5 className="text-lg font-bold text-blue-300 mb-3 flex items-center">
                  <span className="mr-2">🔒</span>
                  Información de Vesting
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      <span className="font-medium">Preventa:</span>
                      <span className="ml-2 text-gray-400">Sin bloqueo</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
                      <span className="font-medium">Equipo:</span>
                      <span className="ml-2 text-gray-400">24 meses vesting</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                      <span className="font-medium">Desarrollo:</span>
                      <span className="ml-2 text-gray-400">Por hitos</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      <span className="font-medium">Comunidad:</span>
                      <span className="ml-2 text-gray-400">Gradual 36 meses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información complementaria sobre distribución */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <div className="text-2xl font-bold text-blue-300 mb-2">40%</div>
              <div className="text-white font-medium mb-2">Acceso Público</div>
              <div className="text-sm text-gray-400">Preventa + Recompensas + Holding</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-800/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-2xl font-bold text-purple-300 mb-2">35%</div>
              <div className="text-white font-medium mb-2">Desarrollo</div>
              <div className="text-sm text-gray-400">Tecnología + Comunidad + Marketing</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-800/30 to-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <div className="text-center">
              <div className="text-3xl mb-3">💧</div>
              <div className="text-2xl font-bold text-green-300 mb-2">20%</div>
              <div className="text-white font-medium mb-2">Liquidez + Equipo</div>
              <div className="text-sm text-gray-400">Exchanges + Fundadores</div>
            </div>
          </div>
        </div>



        {/* Fases de Preventa */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              📈 FASES DE PREVENTA
            </span>
          </h3>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600/50 to-pink-600/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-white">Fase</th>
                    <th className="px-6 py-4 text-left font-bold text-white">Precio por VIAZ</th>
                    <th className="px-6 py-4 text-left font-bold text-white">Cantidad disponible</th>
                    <th className="px-6 py-4 text-left font-bold text-white">Acceso</th>
                  </tr>
                </thead>
                <tbody>
                  {presalePhases.map((phase, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: phase.color }}
                          ></div>
                          <span className="font-bold text-white">{phase.fase}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-green-400">{phase.precio}</td>
                      <td className="px-6 py-4 text-gray-300">{phase.cantidad}</td>
                      <td className="px-6 py-4 text-gray-300">{phase.acceso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-6 space-y-4">
              {presalePhases.map((phase, index) => (
                <div key={index} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      ></div>
                      <span className="font-bold text-white">{phase.fase}</span>
                    </div>
                    <span className="font-bold text-green-400">{phase.precio}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cantidad:</span>
                      <span className="text-gray-300">{phase.cantidad}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Acceso:</span>
                      <span className="text-gray-300">{phase.acceso}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de participar */}
          <div className="text-center mt-8">
            <button
              onClick={handlePresaleParticipation}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-xl text-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 overflow-hidden"
            >
              {/* Efecto pulso animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-xl animate-pulse opacity-75"></div>
              
              {/* Contenido del botón */}
              <span className="relative z-10 flex items-center space-x-2">
                <span>🎁</span>
                <span>PARTICIPAR DE LA PREVENTA</span>
              </span>
              
              {/* Efecto glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
            </button>
          </div>
        </div>

        {/* Objetivos de la recaudación */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              🎯 OBJETIVOS DE LA RECAUDACIÓN
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundraisingGoals.map((goal, index) => (
              <div
                key={index}
                className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-2xl shadow-lg"
                    style={{ 
                      backgroundColor: `${goal.color}20`,
                      border: `2px solid ${goal.color}50`
                    }}
                  >
                    {goal.icon}
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {goal.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {goal.description}
                  </p>
                </div>

                {/* Efecto glow en hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Medios de pago aceptados */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              💳 MEDIOS DE PAGO ACEPTADOS
            </span>
          </h3>

          {/* Criptomonedas */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">✅</span>
              Criptomonedas
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {paymentMethods.filter(method => method.type === 'crypto').map((method, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div 
                    className="mb-2 p-3 rounded-full shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    {method.icon}
                  </div>
                  <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                    {method.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Métodos tradicionales */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">💳</span>
              Métodos Tradicionales
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paymentMethods.filter(method => method.type === 'traditional').map((method, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div 
                    className="mb-2 p-3 rounded-full shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    {method.icon}
                  </div>
                  <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
                    {method.name}
                  </span>
                </div>
              ))}
            </div>
          </div>



          {/* Advertencia KYC */}
          <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">📢</div>
              <div>
                <h4 className="text-lg font-bold text-blue-300 mb-2">Información importante</h4>
                <p className="text-gray-300 leading-relaxed">
                  Pagos en cripto y efectivo no requieren KYC obligatorio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTokenomicsSection;
