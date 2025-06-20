import { useEffect, useState } from 'react';
import { generateWelcomeEmail } from './EmailTemplate';
import { useLanguage } from '../contexts/LanguageContext';
import { sendNotificationWithName } from '../services/simpleEmailService';

const PresaleAnnouncementBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasLaunched, setHasLaunched] = useState(false);

  const targetDate = new Date('2025-07-15T00:00:00');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        const subscribers = JSON.parse(localStorage.getItem('viazen_subscribers') || '[]');
        if (subscribers.length === 0) {
          alert('📧 No hay suscriptores registrados aún.');
          return;
        }
        const subscriberList = subscribers.map((s: any, index: number) =>
          `${index + 1}. ${s.email} - ${new Date(s.timestamp).toLocaleString('es-ES')} - ${s.source}`
        ).join('\n');
        const modalContent = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000; font-family: Arial, sans-serif;">
            <div style="background: #1a1a2e; color: #fff; padding: 30px; border-radius: 15px; max-width: 600px; max-height: 70vh; overflow-y: auto; border: 2px solid #00d4ff; box-shadow: 0 0 30px #00d4ff;">
              <h3 style="color: #00d4ff; margin-top: 0;">📊 Suscriptores de Viazen (${subscribers.length})</h3>
              <div style="background: #16213e; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap;">${subscriberList}</div>
              <button onclick="this.parentElement.parentElement.remove()" style="background: #00d4ff; border: none; padding: 10px 20px; border-radius: 8px; color: #1a1a2e; font-weight: bold; cursor: pointer; margin-top: 15px;">Cerrar</button>
            </div>
          </div>
        `;
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalContent;
        document.body.appendChild(modalDiv);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        setHasLaunched(true);
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleNotifyMe = () => {
    setShowEmailModal(true);
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    setEmail('');
    setName('');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !name.trim()) {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Por favor, ingresa un email válido');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await sendNotificationWithName(email, name, 'emailjs');
      if (success) {
        setEmailSent(true);
        setIsSubscribed(true);
        setShowEmailModal(false);
        setEmail('');
        setName('');
        alert(`¡Perfecto ${name}! 🎉 Te has suscrito exitosamente. Te avisaremos cuando inicie la preventa de Viazen.`);
        setTimeout(() => setEmailSent(false), 10000);
      } else {
        throw new Error('No se pudo enviar la notificación');
      }
    } catch (error) {
      console.error('Error en handleEmailSubmit:', error);
      alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
      setEmailSent(true);
      setIsSubscribed(true);
      setShowEmailModal(false);
      setEmail('');
      setName('');
      alert('¡Te has registrado exitosamente! 🎉 Aunque hubo un problema enviando el email de confirmación, tu suscripción está guardada y te avisaremos cuando inicie la preventa.');
      setTimeout(() => setEmailSent(false), 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-cyan-900/20 to-black"></div>
      </div>

      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          {t('presale.title')}
        </h1>

        {/* MODIFICADO: Contador más profesional */}
        {!hasLaunched && (
          <div className="mb-10">
            <p className="text-xl text-cyan-400 font-bold mb-6 flex items-center justify-center space-x-2">
              <span>🕒</span>
              <span>{t('presale.countdown')}</span>
            </p>

            <div className="flex items-center justify-center space-x-6 mb-4">
              {[
                { value: timeLeft.days, label: t('presale.days'), icon: '⏳' },
                { value: timeLeft.hours, label: t('presale.hours'), icon: '🕘' },
                { value: timeLeft.minutes, label: t('presale.minutes'), icon: '🔁' },
                { value: timeLeft.seconds, label: t('presale.seconds'), icon: '⏱️' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-gray-900 border border-cyan-400/50 rounded-xl px-6 py-4 shadow-lg shadow-cyan-500/20">
                    <div className="text-4xl font-mono font-bold text-cyan-400 min-w-[3.5rem] text-center">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-cyan-300 uppercase tracking-wider flex items-center space-x-1">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aquí continúa todo el resto de tu sección */}
        {/* ... */}
      </div>
    </section>
  );
};

export default PresaleAnnouncementBanner;
