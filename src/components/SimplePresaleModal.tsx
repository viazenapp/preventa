import { useState, useEffect } from 'react';

interface SimplePresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  tokenAmount: string;
  walletConnected: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  tokenAmount?: string;
}

const SimplePresaleModal = ({ isOpen, onClose }: SimplePresaleModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    tokenAmount: '1000',
    walletConnected: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Success

  const tokenPackages = [
    { amount: '1000', usd: '100', bonus: '5%' },
    { amount: '5000', usd: '450', bonus: '10%' },
    { amount: '10000', usd: '800', bonus: '20%' },
    { amount: 'custom', usd: 'custom', bonus: 'varies' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (formData.tokenAmount !== 'custom') {
      const amount = parseInt(formData.tokenAmount);
      if (isNaN(amount) || amount < 100) {
        newErrors.tokenAmount = 'La cantidad mínima es 100 tokens';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleConnectWallet = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, walletConnected: true }));
      setIsSubmitting(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      
      setTimeout(() => {
        handleClose();
      }, 8000);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      tokenAmount: '1000',
      walletConnected: false
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  console.log('SimplePresaleModal render - isOpen:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-gray-900 rounded-2xl border border-amber-500/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Preventa VZN</h2>
              <p className="text-amber-100 text-sm">Únete a la revolución descentralizada</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre completo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.fullName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-amber-500'
                  }`}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-amber-500'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Cantidad de tokens */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Cantidad de Tokens VZN
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {tokenPackages.map((pkg) => (
                    <div
                      key={pkg.amount}
                      onClick={() => handleInputChange('tokenAmount', pkg.amount)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.tokenAmount === pkg.amount
                          ? 'border-amber-500 bg-amber-900/30'
                          : 'border-gray-600 bg-gray-800 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-white font-bold">
                          {pkg.amount === 'custom' ? 'Personalizado' : `${pkg.amount} VZN`}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {pkg.usd === 'custom' ? 'Cantidad libre' : `$${pkg.usd} USD`}
                        </div>
                        <div className="text-amber-400 text-xs">
                          +{pkg.bonus} bonus
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.tokenAmount === 'custom' && (
                  <input
                    type="number"
                    placeholder="Cantidad personalizada (mín. 100)"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="100"
                  />
                )}
              </div>

              {/* Conectar wallet */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Billetera Digital
                </label>
                {!formData.walletConnected ? (
                  <button
                    type="button"
                    onClick={handleConnectWallet}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Conectando...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1"/>
                          <polyline points="15,10 20,15 15,20"/>
                          <path d="m4 15 5-5-5-5"/>
                        </svg>
                        <span>Conectar Wallet</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-green-300 font-medium">Wallet Conectado</div>
                        <div className="text-green-400 text-sm">0x1234...5678</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.walletConnected}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Reservar mi Lugar</span>
                  </>
                )}
              </button>

              <div className="text-xs text-gray-400 text-center">
                Al continuar, aceptas nuestros{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300">Términos y Condiciones</a>
                {' '}y{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300">Política de Privacidad</a>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                ¡Bienvenido a Viazen! 🎉
              </h3>
              
              <p className="text-gray-300 mb-6">
                Tu lugar en la preventa ha sido reservado exitosamente. 
                Recibirás un email de confirmación en los próximos minutos.
              </p>
              
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Tokens reservados:</span>
                  <span className="text-white font-bold">{formData.tokenAmount} VZN</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-300">Estado:</span>
                  <span className="text-green-400 font-medium">Confirmado</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">
                Únete a nuestra comunidad para recibir actualizaciones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePresaleModal;
