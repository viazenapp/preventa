import { useLanguage } from '../contexts/LanguageContext';

const SimpleRewardsSection = () => {
  const { t } = useLanguage();
  
  const rewards = [
    {
      icon: "⭐",
      title: t('rewards.card1.title'),
      value: "5-15%",
      description: t('rewards.card1.desc')
    },
    {
      icon: "💰",
      title: t('rewards.card2.title'),
      value: "12-25%",
      description: t('rewards.card2.desc')
    },
    {
      icon: "👥",
      title: t('rewards.card3.title'),
      value: "500 VZN",
      description: t('rewards.card3.desc')
    },
    {
      icon: "🗳️",
      title: t('rewards.card4.title'),
      value: "1 VZN = 1 Voto",
      description: t('rewards.card4.desc')
    }
  ];

  const stats = [
    {
      number: "500K+",
      label: t('rewards.stats.circulation'),
      icon: "💎"
    },
    {
      number: "15%",
      label: t('rewards.stats.apy'),
      icon: "📈"
    },
    {
      number: "10K+",
      label: t('rewards.stats.holders'),
      icon: "👥"
    },
    {
      number: "$2.5M",
      label: t('rewards.stats.marketcap'),
      icon: "💰"
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-amber-900/30 to-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent" style={{textShadow: '0 0 30px rgba(255, 215, 0, 0.4)'}}>
              {t('rewards.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('rewards.subtitle')}
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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
              className="relative group"
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 group-hover:scale-105 relative overflow-hidden">
                {/* Efecto de brillo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-2xl">
                    {reward.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {reward.title}
                      </h3>
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
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
        <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl p-8 md:p-12 border border-amber-500/20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">VZN</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{t('rewards.token.title')}</h3>
                <p className="text-amber-300">{t('rewards.token.subtitle')}</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('rewards.token.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🔄</div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('rewards.token.utility.title')}</h4>
                <p className="text-gray-300 text-sm">{t('rewards.token.utility.desc')}</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🏆</div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('rewards.token.rewards.title')}</h4>
                <p className="text-gray-300 text-sm">{t('rewards.token.rewards.desc')}</p>
              </div>
              
              <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
                <div className="text-yellow-400 text-2xl mb-2">🗳️</div>
                <h4 className="text-lg font-semibold text-white mb-2">{t('rewards.token.governance.title')}</h4>
                <p className="text-gray-300 text-sm">{t('rewards.token.governance.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleRewardsSection;
