import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Loader, User } from 'lucide-react';
import { sendNotificationWithName } from '../services/simpleEmailService';

interface SimpleEmailFormProps {
  buttonText?: string;
  emailPlaceholder?: string;
  namePlaceholder?: string;
  className?: string;
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
  showNameField?: boolean;
}

export const SimpleEmailForm: React.FC<SimpleEmailFormProps> = ({
  buttonText = "Avisame cuando inicie",
  emailPlaceholder = "Tu email aquí",
  namePlaceholder = "Tu nombre",
  className = "",
  onSuccess,
  onError,
  showNameField = true
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showNameField && !name.trim()) {
      if (onError) {
        onError('Por favor ingresa tu nombre');
      }
      return;
    }

    if (!email.trim()) {
      if (onError) {
        onError('Por favor ingresa tu dirección de email');
      }
      return;
    }

    if (!validateEmail(email)) {
      if (onError) {
        onError('Por favor ingresa una dirección de email válida');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendNotificationWithName(email, name || 'Usuario Interesado', 'emailjs');
      
      if (success) {
        setIsSubmitted(true);
        const submittedEmail = email;
        const submittedName = name;
        setEmail('');
        setName('');
        
        if (onSuccess) {
          onSuccess(`¡Gracias ${submittedName || 'por tu interés'}! Te notificaremos cuando Viazen se lance.`);
        }

        // Call success callback
        if (onSuccess) {
          setTimeout(() => onSuccess(submittedEmail), 100);
        }
        
        // Reset submitted state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
        
      } else {
        throw new Error('No se pudo enviar la notificación');
      }
    } catch (error: any) {
      console.error('Error al registrar email:', error);
      if (onError) {
        onError('No se pudo registrar el email. Por favor intenta de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`flex items-center justify-center space-x-2 px-6 py-3 bg-green-600/20 border border-green-500/30 rounded-lg ${className}`}>
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span className="text-green-300 font-medium">
          ¡Email registrado exitosamente!
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`}>
      {showNameField && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            disabled={isSubmitting}
            className="
              w-full pl-10 pr-4 py-3 
              bg-white/10 backdrop-blur-sm 
              border border-white/20 
              rounded-lg text-white placeholder-gray-300 
              focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 
              focus:outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            required
          />
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={isSubmitting}
          className="
            w-full pl-10 pr-4 py-3 
            bg-white/10 backdrop-blur-sm 
            border border-white/20 
            rounded-lg text-white placeholder-gray-300 
            focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 
            focus:outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || !email.trim() || (showNameField && !name.trim())}
        className="
          px-6 py-3 
          bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
          hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 
          text-white font-bold rounded-lg 
          transition-all duration-300 transform hover:scale-105 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50
          flex items-center justify-center space-x-2
          min-w-[180px] w-full
        "
      >
        {isSubmitting ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </form>
  );
};

// Simplified version for hero section
export const SimpleHeroEmailSignup: React.FC<{
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}> = ({ onSuccess, onError }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <SimpleEmailForm 
        buttonText="Unite a la Preventa"
        emailPlaceholder="tu@email.com"
        namePlaceholder="Tu nombre"
        className="w-full"
        showNameField={true}
        onSuccess={(email) => {
          console.log('Email registrado:', email);
          if (onSuccess) {
            onSuccess('¡Registrado exitosamente! Te notificaremos cuando Viazen se lance.');
          }
        }}
        onError={onError}
      />
      
      <p className="text-xs text-gray-400 mt-2 text-center">
        Te enviaremos un email cuando inicie la preventa oficial
      </p>
    </div>
  );
};

// Version for other sections
export const SimpleSectionEmailSignup: React.FC<{ 
  title?: string; 
  subtitle?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}> = ({ 
  title = "¿Interesado en Viazen?", 
  subtitle = "Sé el primero en conocer cuando lancemos",
  onSuccess,
  onError
}) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{subtitle}</p>
      </div>
      
      <SimpleEmailForm 
        buttonText="Notificarme"
        emailPlaceholder="Ingresa tu email"
        namePlaceholder="Tu nombre"
        className="w-full"
        showNameField={true}
        onSuccess={(email) => {
          console.log('Email registrado:', email);
          if (onSuccess) {
            onSuccess('¡Email registrado! Te mantendremos actualizado.');
          }
        }}
        onError={onError}
      />
    </div>
  );
};