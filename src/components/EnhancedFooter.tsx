import { useEffect, useState } from 'react';

interface EnhancedFooterProps {
  isVisible: boolean;
}

const EnhancedFooter = ({ isVisible }: EnhancedFooterProps) => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowFooter(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: 'https://twitter.com/viazen_official',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Discord',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: 'https://discord.gg/viazen',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      url: 'https://t.me/viazen_app',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://linkedin.com/company/viazen',
      gradient: 'from-blue-600 to-blue-800'
    }
  ];

  const footerLinks = [
    {
      title: 'Legal',
      links: [
        { name: 'Términos y Condiciones', url: '#' },
        { name: 'Política de Privacidad', url: '#' },
        { name: 'Disclaimer', url: '#' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Whitepaper', url: '#' },
        { name: 'Roadmap', url: '#' },
        { name: 'Documentación', url: '#' }
      ]
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Centro de Ayuda', url: '#' },
        { name: 'FAQ', url: '#' },
        { name: 'Contacto', url: 'mailto:info@viazen.io' }
      ]
    }
  ];

  return (
    <footer
      className={`relative z-30 bg-gradient-to-t from-gray-900 to-gray-800/50 transform transition-all duration-1000 ease-out ${
        showFooter
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Línea separadora superior con gradiente */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L18 7L16.91 13.26L22 14L12 22L2 14L7.09 13.26L6 7L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Viazen
                </h3>
                <p className="text-xs text-blue-200 opacity-80">DESCENTRALIZADO</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              La primera plataforma descentralizada que combina transporte, alojamiento y pagos en un solo ecosistema.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
                <a href="mailto:info@viazen.io" className="hover:text-white transition-colors">
                  info@viazen.io
                </a>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Lema principal */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              "Libertad, recompensa y expansión global."
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} Viazen. Todos los derechos reservados.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm hidden md:block">Síguenos:</span>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-8 pt-6 border-t border-gray-700/50">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Plataforma Descentralizada</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>Comisiones Mínimas</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>Recompensas Reales</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>Preventa Activa</span>
            </span>
          </div>
        </div>

        {/* Elemento decorativo */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full opacity-50"
                style={{
                  animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
