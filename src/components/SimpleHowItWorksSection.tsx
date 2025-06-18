import { useLanguage } from '../contexts/LanguageContext';

const SimpleHowItWorksSection = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      gradient: "from-yellow-400 to-amber-600"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      gradient: "from-gray-400 to-gray-600"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.77 4.18 3.85 0 1.97-1.78 2.49-3.12 2.62z"/>
        </svg>
      ),
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      gradient: "from-amber-500 to-yellow-700"
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-800/60 to-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent" style={{textShadow: '0 0 30px rgba(255, 215, 0, 0.4)'}}>
              {t('howItWorks.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Tarjeta principal */}
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  {/* Icono */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-300 leading-relaxed text-base">
                    {service.description}
                  </p>

                  {/* Indicador paso */}
                  <div className="flex items-center mt-6">
                    <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div className="ml-3 h-px bg-gradient-to-r from-amber-500 to-transparent flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action secundario */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-amber-300 bg-amber-900/20 px-6 py-3 rounded-full border border-amber-500/30">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-medium">{t('howItWorks.integrated')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHowItWorksSection;
