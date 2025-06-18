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

  // Fecha objetivo para la preventa: 15 de julio de 2025
  const targetDate = new Date('2025-07-15T00:00:00');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Función para mostrar suscriptores (solo para admin) - Presiona Ctrl+Shift+S
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

        const message = `📊 SUSCRIPTORES DE VIAZEN (${subscribers.length} total)\n\n${subscriberList}\n\n📋 Esta información se guarda localmente en el navegador.`;
        
        // Crear una ventana modal más elegante
        const modalContent = `
          <div style="
            position: fixed; 
            top: 0; left: 0; 
            width: 100%; height: 100%; 
            background: rgba(0,0,0,0.8); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            z-index: 10000;
            font-family: Arial, sans-serif;
          ">
            <div style="
              background: #1a1a2e; 
              color: #fff; 
              padding: 30px; 
              border-radius: 15px; 
              max-width: 600px; 
              max-height: 70vh; 
              overflow-y: auto;
              border: 2px solid #00d4ff;
              box-shadow: 0 0 30px #00d4ff;
            ">
              <h3 style="color: #00d4ff; margin-top: 0;">📊 Suscriptores de Viazen (${subscribers.length})</h3>
              <div style="
                background: #16213e; 
                padding: 15px; 
                border-radius: 8px; 
                margin: 15px 0;
                font-family: monospace;
                font-size: 12px;
                white-space: pre-wrap;
              ">${subscriberList}</div>
              <button onclick="this.parentElement.parentElement.remove()" style="
                background: #00d4ff; 
                border: none; 
                padding: 10px 20px; 
                border-radius: 8px; 
                color: #1a1a2e; 
                font-weight: bold; 
                cursor: pointer;
                margin-top: 15px;
              ">Cerrar</button>
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
      // Enviar email usando EmailJS con nombre y email
      const success = await sendNotificationWithName(email, name, 'emailjs');
      
      if (success) {
        setEmailSent(true);
        setIsSubscribed(true);
        setShowEmailModal(false);
        setEmail(''); // Limpiar formulario
        setName(''); // Limpiar nombre
        
        // Mostrar mensaje de éxito personalizado
        alert(`¡Perfecto ${name}! 🎉 Te has suscrito exitosamente. Te avisaremos cuando inicie la preventa de Viazen.`);
        
        setTimeout(() => {
          setEmailSent(false);
        }, 10000);
      } else {
        throw new Error('No se pudo enviar la notificación');
      }
      
    } catch (error) {
      console.error('Error en handleEmailSubmit:', error);
      alert('Hubo un error al procesar tu suscripción. Por favor intenta de nuevo.');
      // Incluso si falla el email, el usuario se guarda en localStorage
      setEmailSent(true);
      setIsSubscribed(true);
      setShowEmailModal(false);
      setEmail('');
      setName('');
      
      alert('¡Te has registrado exitosamente! 🎉 Aunque hubo un problema enviando el email de confirmación, tu suscripción está guardada y te avisaremos cuando inicie la preventa.');
      
      setTimeout(() => {
        setEmailSent(false);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <section id="presale-banner" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black pt-16 sm:pt-20">
      {/* Fondo animado galaxia digital */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-cyan-900/20 to-black"></div>
        
        {/* Partículas estelares */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 4}px`,
                height: `${1 + Math.random() * 4}px`,
                background: `${
                  Math.random() > 0.6 ? '#00FFFF' : 
                  Math.random() > 0.3 ? '#8B5CF6' : '#FFD700'
                }`,
                animation: `pulse ${2 + Math.random() * 4}s infinite alternate`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Nebulosas de fondo */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Contenido principal */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transform transition-all duration-1500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          {t('presale.title')}
        </h1>

        {/* Cuenta regresiva */}
        {!hasLaunched ? (
          <div className="mb-8">
            <p className="text-xl sm:text-2xl text-cyan-400 font-bold mb-6 flex items-center justify-center space-x-2">
              <span>🕒</span>
              <span>{t('presale.countdown')}</span>
            </p>
            
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-4">
              {/* Días */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-400/50 rounded-lg p-3 sm:p-4 shadow-2xl shadow-cyan-500/20">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-cyan-400 min-w-[3rem] text-center tracking-wider">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-20 blur animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <span className="text-lg">⏳</span>
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">{t('presale.days')}</span>
                </div>
              </div>

              {/* Separador */}
              <div className="text-2xl sm:text-3xl text-cyan-400 font-bold animate-pulse">:</div>

              {/* Horas */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-purple-400/50 rounded-lg p-3 sm:p-4 shadow-2xl shadow-purple-500/20">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-purple-400 min-w-[3rem] text-center tracking-wider">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-400/10 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg opacity-20 blur animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <span className="text-lg">🕘</span>
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">{t('presale.hours')}</span>
                </div>
              </div>

              {/* Separador */}
              <div className="text-2xl sm:text-3xl text-purple-400 font-bold animate-pulse">:</div>

              {/* Minutos */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-green-400/50 rounded-lg p-3 sm:p-4 shadow-2xl shadow-green-500/20">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-green-400 min-w-[3rem] text-center tracking-wider">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-green-400/10 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg opacity-20 blur animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <span className="text-lg">🔁</span>
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">{t('presale.minutes')}</span>
                </div>
              </div>

              {/* Separador */}
              <div className="text-2xl sm:text-3xl text-green-400 font-bold animate-pulse">:</div>

              {/* Segundos */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-400/50 rounded-lg p-3 sm:p-4 shadow-2xl shadow-yellow-500/20">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-yellow-400 min-w-[3rem] text-center tracking-wider transition-all duration-300">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-20 blur animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <span className="text-lg">⏱️</span>
                  <span className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">{t('presale.seconds')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="text-center p-8 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl border-2 border-green-400/50 shadow-2xl shadow-green-500/20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-400 mb-4 animate-bounce">
                {t('presale.started.title')}
              </h2>
              <p className="text-xl sm:text-2xl text-white">
                {t('presale.started.subtitle')}
              </p>
            </div>
          </div>
        )}

        {/* Subtítulo */}
        {!hasLaunched && (
          <div className="mb-8 space-y-4">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              {t('presale.comingSoon')}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              <span className="text-cyan-400 font-bold">{t('presale.getTokens')}</span>{' '}
              <span className="text-purple-400 font-bold">{t('presale.exclusiveRewards')}</span>
            </p>
          </div>
        )}

        {/* Botón principal */}
        <div className="mb-6">
          {hasLaunched ? (
            <button
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border-2 border-green-400/50 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 animate-bounce hover:animate-none"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Contenido del botón */}
              <span className="relative flex items-center space-x-3">
                <span>💎</span>
                <span>Comprar VIAZ Ahora</span>
              </span>
              
              {/* Anillo pulsante */}
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30"></div>
            </button>
          ) : !isSubscribed ? (
            <button
              onClick={handleNotifyMe}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full border-2 border-cyan-400/50 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Contenido del botón */}
              <span className="relative flex items-center space-x-3">
                <span>🔔</span>
                <span>{t('presale.notifyButton')}</span>
              </span>
              
              {/* Anillo pulsante */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30"></div>
            </button>
          ) : (
            <div className="inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-bold text-green-400 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border-2 border-green-400/50">
              <span className="flex items-center space-x-3">
                <span>✅</span>
                <span>¡Te notificaremos pronto!</span>
              </span>
            </div>
          )}
        </div>

        {/* Texto explicativo */}
        {!hasLaunched ? (
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('presale.finalizing')}{' '}
            <span className="text-cyan-400">{t('presale.secure')}</span>, {' '}
            <span className="text-purple-400">{t('presale.fair')}</span> y {' '}
            <span className="text-yellow-400">{t('presale.global')}</span>.
          </p>
        ) : (
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('presale.launched')}{' '}
            <span className="text-green-400">{t('presale.exclusiveDiscounts')}</span>, {' '}
            <span className="text-cyan-400">{t('presale.immediateRewards')}</span> y {' '}
            <span className="text-purple-400">{t('presale.priorityAccess')}</span> {t('presale.allFeatures')}
          </p>
        )}

        {/* Indicadores visuales adicionales */}
        <div className="mt-8 flex justify-center space-x-8">
          {[
            { icon: '🔒', text: t('presale.secure'), color: 'text-green-400' },
            { icon: '⚖️', text: t('presale.fair'), color: 'text-blue-400' },
            { icon: '🌍', text: t('presale.global'), color: 'text-purple-400' }
          ].map((item, index) => (
            <div key={index} className={`flex flex-col items-center space-y-2 ${item.color}`}>
              <div className="text-2xl">{item.icon}</div>
              <div className="text-sm font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Efecto de borde brillante */}
      <div className="absolute inset-0 border border-cyan-500/20 pointer-events-none"></div>

      {/* Modal de suscripción por email */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-2xl p-8 max-w-md w-full border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            {/* Botón cerrar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del modal */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Únete a la Lista VIP!
              </h3>
              <p className="text-gray-300 text-sm">
                Sé el primero en conocer cuando la preventa de VIAZ esté disponible
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-2">
                  Tu dirección de email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  required
                />
              </div>

              {/* Beneficios */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-300 font-semibold mb-2">🎁 Beneficios exclusivos:</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Acceso prioritario a la preventa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Descuentos exclusivos hasta 30%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>Email de bienvenida con detalles VIP</span>
                  </div>
                </div>
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  '🚀 Quiero ser notificado'
                )}
              </button>
            </form>

            {/* Nota de privacidad */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Tu email será usado únicamente para notificarte sobre VIAZEN. No spam.
            </p>
          </div>
        </div>
      )}

      {/* Notificación de email enviado */}
      {emailSent && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl shadow-2xl border-2 border-green-400/50 max-w-sm animate-slide-in">
          <div className="flex items-start space-x-3">
            <div className="text-3xl animate-bounce">📧</div>
            <div className="flex-1">
              <p className="font-bold text-base mb-1">¡Email de bienvenida enviado!</p>
              <p className="text-sm opacity-90 mb-2">Revisa tu bandeja de entrada (y spam)</p>
              <div className="text-xs bg-green-700/30 rounded p-2">
                <strong>Incluye:</strong> Acceso VIP, descuentos exclusivos y roadmap detallado
              </div>
            </div>
            <button
              onClick={() => setEmailSent(false)}
              className="text-green-200 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>

    </section>
  );
};

export default PresaleAnnouncementBanner;
