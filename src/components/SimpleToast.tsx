import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type SimpleToastType = 'success' | 'error' | 'info' | 'warning';

export interface SimpleToast {
  id: string;
  type: SimpleToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface SimpleToastContextType {
  showToast: (toast: Omit<SimpleToast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const SimpleToastContext = createContext<SimpleToastContextType | undefined>(undefined);

export const useSimpleToast = () => {
  const context = useContext(SimpleToastContext);
  if (!context) {
    throw new Error('useSimpleToast must be used within a SimpleToastProvider');
  }
  return context;
};

interface SimpleToastProviderProps {
  children: ReactNode;
}

export const SimpleToastProvider: React.FC<SimpleToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<SimpleToast[]>([]);

  const showToast = useCallback((toast: Omit<SimpleToast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: SimpleToast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <SimpleToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <SimpleToastContainer toasts={toasts} removeToast={removeToast} />
    </SimpleToastContext.Provider>
  );
};

interface SimpleToastContainerProps {
  toasts: SimpleToast[];
  removeToast: (id: string) => void;
}

const SimpleToastContainer: React.FC<SimpleToastContainerProps> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <SimpleToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface SimpleToastItemProps {
  toast: SimpleToast;
  onRemove: (id: string) => void;
}

const SimpleToastItem: React.FC<SimpleToastItemProps> = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-500/50';
      case 'error':
        return 'border-red-500/50';
      case 'warning':
        return 'border-yellow-500/50';
      case 'info':
      default:
        return 'border-blue-500/50';
    }
  };

  const getGlowColor = () => {
    switch (toast.type) {
      case 'success':
        return 'shadow-green-500/20';
      case 'error':
        return 'shadow-red-500/20';
      case 'warning':
        return 'shadow-yellow-500/20';
      case 'info':
      default:
        return 'shadow-blue-500/20';
    }
  };

  return (
    <div
      className={`
        relative bg-gray-900/95 backdrop-blur-sm border ${getBorderColor()} 
        rounded-lg p-4 shadow-lg ${getGlowColor()} 
        transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-right-2 fade-in-0
      `}
      style={{
        animation: 'slideInFromRight 0.3s ease-out',
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="mt-1 text-sm text-gray-300">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Utility functions for easy toast usage
export const simpleToast = {
  success: (title: string, message?: string, duration?: number) => ({
    type: 'success' as const,
    title,
    message,
    duration,
  }),
  error: (title: string, message?: string, duration?: number) => ({
    type: 'error' as const,
    title,
    message,
    duration,
  }),
  info: (title: string, message?: string, duration?: number) => ({
    type: 'info' as const,
    title,
    message,
    duration,
  }),
  warning: (title: string, message?: string, duration?: number) => ({
    type: 'warning' as const,
    title,
    message,
    duration,
  }),
};

// Hook to show toasts easily
export const useToastMessage = () => {
  const { showToast } = useSimpleToast();

  return {
    success: (title: string, message?: string) => 
      showToast(simpleToast.success(title, message)),
    error: (title: string, message?: string) => 
      showToast(simpleToast.error(title, message)),
    info: (title: string, message?: string) => 
      showToast(simpleToast.info(title, message)),
    warning: (title: string, message?: string) => 
      showToast(simpleToast.warning(title, message)),
  };
};