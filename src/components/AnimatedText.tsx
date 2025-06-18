import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  isVisible: boolean;
}

const AnimatedText = ({ text, className = '', delay = 0, isVisible }: AnimatedTextProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        showText
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      <span className="relative inline-block text-glow">
        {text}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-0 animate-pulse-glow"></span>
      </span>
    </div>
  );
};

export default AnimatedText;
