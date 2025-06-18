import { useState } from 'react';
import { Star, Shield, Globe, Zap, CreditCard, Home, Car } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhitepaperHighlightsSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'services',
      label: 'Servicios Integrados',
      icon: <Star className="w-5 h-5" />,
      content: {
        title: 'Ecosistema VIAZEN Completo',
        description: 'Tres aplicaciones descentralizadas interconectadas que revolucionan industrias tradicionales',
        features: [
          {
            icon: <Car className="w-8 h-8 text-cyan-400" />,
            title: 'VIAZEN MOVE',
            description: 'Transporte P2P con tarifas negociables, pagos cripto/fiat y recompensas por reputación'
          },
          {
            icon: <Home className="w-8 h-8 text-purple-400" />,
            title: 'VIAZEN STAY',
            description: 'Alojamiento con comisiones 1%-5% vs 18% Airbnb, pagos multimoneda sin restricciones'
          },
          {
            icon: <CreditCard className="w-8 h-8 text-green-400" />,
            title: 'VIAZEN PAY',
            description: 'Billetera descentralizada con QR, 0% comisión con VIAZ, cashback y beneficios VIP'
          }
        ]
      }
    },
    {
      id: 'technology',
      label: 'Tecnología',
      icon: <Shield className="w-5 h-5" />,
      content: {
        title: 'Infraestructura Blockchain',
        description: 'Binance Smart Chain (BEP-20) evolucionando hacia blockchain propia',
        features: [
          {
            icon: <Shield className="w-8 h-8 text-blue-400" />,
            title: 'Contratos Inteligentes',
            description: 'Smart contracts auditados, código abierto en GitHub, EVM compatible'
          },
          {
            icon: <Globe className="w-8 h-8 text-emerald-400" />,
            title: 'VIAZEN Chain 2028',
            description: 'Blockchain propia planificada: gobernanza total on-chain, comisiones mínimas'
          },
          {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: 'Interoperabilidad',
            description: 'Compatible con Metamask, Trust Wallet, puentes a Polygon, Arbitrum, Avalanche'
          }
        ]
      }
    },
    {
      id: 'tokenomics',
      label: 'Tokenomics',
      icon: <Star className="w-5 h-5" />,
      content: {
        title: 'Token VIAZ (BEP-20)',
        description: 'Suministro fijo de 1,000,000,000 VIAZ con distribución estratégica',
        features: [
          {
            icon: <Star className="w-8 h-8 text-purple-400" />,
            title: 'Preventa por Fases',
            description: 'Fase 1: $0.010 → Fase 2: $0.020 → Fase 3: $0.030 → Launch: $0.10'
          },
          {
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            title: 'Distribución Estratégica',
            description: '20% Preventa, 20% Comunidad, 15% Desarrollo, 12% Holding, 10% Liquidez DEX'
          },
          {
            icon: <Globe className="w-8 h-8 text-green-400" />,
            title: 'Utilidad Real',
            description: 'Pagos, recompensas, gobernanza DAO, descuentos especiales, staking'
          }
        ]
      }
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-500/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Whitepaper Highlights
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre los aspectos clave del ecosistema VIAZEN y su revolucionaria propuesta de valor
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del tab activo */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {tabs[activeTab].content.title}
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {tabs[activeTab].content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tabs[activeTab].content.features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gray-700/50 rounded-full group-hover:bg-gray-700 transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Efecto glow en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas del proyecto */}
        <div className="mt-16 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">1B</div>
              <div className="text-xs md:text-sm text-gray-400">VIAZ Tokens</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">$0.01</div>
              <div className="text-xs md:text-sm text-gray-400">Fase 1 Precio</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-green-400">1%</div>
              <div className="text-xs md:text-sm text-gray-400">Comisión STAY</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">Q3</div>
              <div className="text-xs md:text-sm text-gray-400">2025 Launch</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-pink-400">BSC</div>
              <div className="text-xs md:text-sm text-gray-400">Blockchain</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">DAO</div>
              <div className="text-xs md:text-sm text-gray-400">Gobernanza</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperHighlightsSection;
