// src/components/FuturisticBackground.tsx
import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente general de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: ['#F59E0B', '#8B5CF6', '#EC4899'][Math.floor(Math.random() * 3)],
              animation: `pulse ${2 + Math.random() * 3}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 8px ${
                ['#F59E0B', '#8B5CF6', '#EC4899'][Math.floor(Math.random() * 3)]
              }`
            }}
          />
        ))}
      </div>

      {/* Líneas SVG como circuitos */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M0,300 Q300,100 600,300 T1200,300"
            stroke="url(#circuit-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M200,500 Q500,200 800,500 T1200,500"
            stroke="url(#circuit-gradient)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="300" cy="200" r="4" fill="#F59E0B" />
          <circle cx="800" cy="350" r="4" fill="#8B5CF6" />
          <circle cx="500" cy="600" r="4" fill="#EC4899" />
        </svg>
      </div>

      {/* Ondas de energía */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-amber-500/10 to-transparent h-px"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
              animation: `slideWave ${5 + i * 2}s infinite linear`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FuturisticBackground;
