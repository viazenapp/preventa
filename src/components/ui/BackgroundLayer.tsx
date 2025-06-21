// src/components/ui/BackgroundLayer.tsx

const BackgroundLayer = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Gradiente radial de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/30 to-black"></div>

      {/* Partículas animadas */}
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

      {/* Líneas SVG animadas */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="warmCircuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
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
        </svg>
      </div>

      {/* Ondas */}
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
  );
};

export default BackgroundLayer;
