import { useEffect, useState } from 'react';

// Componentes de iconos SVG para redes sociales
const TelegramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const DiscordIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189z"/>
  </svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FoundersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar tarjetas secuencialmente
          const cards = [0, 1, 2];
          cards.forEach((card, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, card]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('founders-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Danilo Ponce",
      role: "Fundador y CEO", 
      bio: "Programador y visionario. Creador del ecosistema VIAZEN como alternativa libre, descentralizada e inclusiva.",
      image: "/danilo-ponce.png",
      gradient: "from-blue-400 to-purple-600",
      accentColor: "#4F46E5"
    },
    {
      name: "Próximamente",
      role: "Co-fundador/a",
      bio: "Buscamos talento excepcional para unirse a nuestra misión de revolucionar el transporte, alojamiento y pagos descentralizados.",
      image: "/api/placeholder/150/150",
      gradient: "from-purple-400 to-pink-600",
      accentColor: "#EC4899"
    },
    {
      name: "Únete al equipo",
      role: "Desarrollador/a",
      bio: "¿Eres desarrollador blockchain, diseñador UX/UI o experto en fintech? Contáctanos para ser parte de la revolución VIAZEN.",
      image: "/api/placeholder/150/150",
      gradient: "from-cyan-400 to-blue-600",
      accentColor: "#06B6D4"
    }
  ];

  const socialLinks = [
    { name: "Telegram", icon: <TelegramIcon size={24} />, url: "https://t.me/viazen", color: "#0088cc" },
    { name: "Discord", icon: <DiscordIcon size={24} />, url: "https://discord.gg/viazen", color: "#5865F2" },
    { name: "Twitter", icon: <TwitterIcon size={24} />, url: "https://twitter.com/viazen", color: "#1DA1F2" },
    { name: "Instagram", icon: <InstagramIcon size={24} />, url: "https://instagram.com/viazen", color: "#E4405F" },
    { name: "LinkedIn", icon: <LinkedInIcon size={24} />, url: "https://linkedin.com/company/viazen", color: "#0077B5" },
    { name: "YouTube", icon: <YouTubeIcon size={24} />, url: "https://youtube.com/@viazen", color: "#FF0000" }
  ];

  return (
    <section
      id="founders-section"
      className="min-h-screen relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden py-20"
    >
      {/* Efectos de fondo digital */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/30 to-black"></div>
        
        {/* Partículas de fondo cálidas */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `${
                  Math.random() > 0.6 ? '#F59E0B' : 
                  Math.random() > 0.3 ? '#8B5CF6' : '#EC4899'
                }`,
                animation: `pulse ${2 + Math.random() * 3}s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: `0 0 20px ${
                  Math.random() > 0.5 ? '#F59E0B' : '#8B5CF6'
                }`
              }}
            />
          ))}
        </div>

        {/* Líneas de circuito cálidas */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="warmCircuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path
              d="M0,300 Q300,100 600,300 T1200,300"
              stroke="url(#warmCircuitGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M200,500 Q500,200 800,500 T1200,500"
              stroke="url(#warmCircuitGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1.5s' }}
            />
            
            {/* Nodos de conexión */}
            <circle cx="300" cy="200" r="4" fill="#F59E0B" className="animate-pulse">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="800" cy="350" r="4" fill="#8B5CF6" className="animate-pulse">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="500" cy="600" r="4" fill="#EC4899" className="animate-pulse">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
          </svg>
        </div>

        {/* Ondas de energía */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-amber-500/10 to-transparent h-px"
              style={{
                top: `${20 + i * 20}%`,
                left: '0',
                right: '0',
                animation: `slideWave ${6 + i * 2}s infinite linear`,
                animationDelay: `${i * 1.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            UN EQUIPO CON VISIÓN Y UNA COMUNIDAD EN CRECIMIENTO
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 animate-pulse"></div>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <span className="text-amber-400 font-bold">VIAZEN</span> nace de la unión de emprendedores apasionados por la 
            <span className="text-purple-400 font-bold"> descentralización</span>, el 
            <span className="text-cyan-400 font-bold"> transporte libre</span>, el 
            <span className="text-pink-400 font-bold"> alojamiento sin fronteras</span> y los 
            <span className="text-yellow-400 font-bold"> pagos sin intermediarios</span>.
          </p>
        </div>

        {/* Tarjetas del equipo */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                animatedCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="relative group">
                {/* Efecto holográfico de fondo */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500 group-hover:scale-105`}></div>
                
                {/* Tarjeta principal */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 group-hover:border-purple-500/50 transition-all duration-500">
                  
                  {/* Foto circular con efecto holograma */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Anillos holográficos */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${member.gradient} rounded-full opacity-20 animate-pulse`}></div>
                      <div className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-full opacity-30 animate-ping`} style={{ animationDuration: '3s' }}></div>
                      
                      {/* Imagen del miembro */}
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        {index === 0 ? (
                          /* Foto real de Danilo */
                          <img 
                            src="/danilo-circle.png" 
                            alt="Danilo Ponce"
                            className="w-full h-full object-cover object-center rounded-full"
                            style={{ 
                              filter: 'brightness(1.1) contrast(1.05)',
                              boxShadow: `0 0 30px ${member.accentColor}40`
                            }}
                          />
                        ) : (
                          /* Emojis para otros miembros */
                          <div 
                            className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl"
                            style={{ backgroundColor: member.accentColor + '20' }}
                          >
                            {index === 1 ? '❓' : '🚀'}
                          </div>
                        )}
                        
                        {/* Overlay holográfico */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Resplandor futurista adicional para Danilo */}
                        {index === 0 && (
                          <div 
                            className="absolute -inset-1 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-sm"
                            style={{ 
                              background: `radial-gradient(circle, ${member.accentColor}40 0%, transparent 70%)`,
                              animation: 'pulse 2s infinite'
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Información del miembro */}
                  <div className="text-center space-y-4">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                      {member.name}
                    </h3>
                    
                    <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                         style={{ 
                           backgroundColor: member.accentColor + '20',
                           color: member.accentColor,
                           border: `1px solid ${member.accentColor}40`
                         }}>
                      {member.role}
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>

                  {/* Efectos de esquinas tecnológicas */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 opacity-40"
                       style={{ borderColor: member.accentColor }}></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 opacity-40"
                       style={{ borderColor: member.accentColor }}></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 opacity-40"
                       style={{ borderColor: member.accentColor }}></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 opacity-40"
                       style={{ borderColor: member.accentColor }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de comunidad */}
        <div className={`transform transition-all duration-1000 ${
          animatedCards.length >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative">
            {/* Fondo brillante */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-600/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-10 border-2 border-gradient-to-r border-purple-500/30">
              <div className="text-center space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  🌍 Somos una comunidad que construye un nuevo paradigma
                </h3>
                
                <p className="text-xl text-gray-300 mb-8">
                  Sumate a nuestros canales de Telegram, Discord y redes sociales.
                </p>
                
                {/* Redes sociales */}
                <div className="flex flex-wrap justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center space-x-3 px-6 py-3 rounded-full border-2 border-gray-600/50 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
                      style={{
                        backgroundColor: social.color + '10',
                        borderColor: social.color + '40'
                      }}
                    >
                      {/* Efecto de brillo en hover */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: social.color }}
                      ></div>
                      
                      <div className="w-6 h-6" style={{ color: social.color }}>{social.icon}</div>
                      <span className="font-semibold text-white relative z-10">{social.name}</span>
                      
                      {/* Pulso animado */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:animate-ping"
                        style={{ 
                          border: `2px solid ${social.color}`,
                          animationDuration: '2s'
                        }}
                      ></div>
                    </a>
                  ))}
                </div>
                
                {/* Estadísticas de comunidad */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-600/30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">1K+</div>
                    <div className="text-gray-400 text-sm">Seguidores tempranos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                    <div className="text-gray-400 text-sm">Países interesados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Comunidad activa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideWave {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default FoundersSection;
