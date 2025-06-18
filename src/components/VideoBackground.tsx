import { useRef, useEffect, useState } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      
      // Manejar errores de carga del video
      const handleError = () => {
        setVideoError(true);
      };
      
      videoRef.current.addEventListener('error', handleError);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, []);

  return (
    <>
      {/* Fondo gradiente animado como base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 animate-gradient-x z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Capas adicionales de gradiente para efecto futurista */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Intento de video solo si no hay error */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          style={{ filter: 'brightness(0.4) contrast(1.2)' }}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/futuristic-city.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default VideoBackground;
