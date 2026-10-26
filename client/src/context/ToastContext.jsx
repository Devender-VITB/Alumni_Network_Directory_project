import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../utils/cn';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 4000, title }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message, options) => addToast({ message, type: 'success', ...options }),
    error: (message, options) => addToast({ message, type: 'error', ...options }),
    warning: (message, options) => addToast({ message, type: 'warning', ...options }),
    info: (message, options) => addToast({ message, type: 'info', ...options }),
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-status-error shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-brand-blue shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-status-success/30 bg-status-success-bg/40';
      case 'warning':
        return 'border-status-warning/30 bg-status-warning-bg/40';
      case 'error':
        return 'border-status-error/30 bg-status-error-bg/40';
      default:
        return 'border-brand-blue/30 bg-brand-blue-50';
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-soft-lg bg-white backdrop-blur-md transition-all duration-200 transform translate-y-0 opacity-100',
              getBorderColor(item.type)
            )}
          >
            {getIcon(item.type)}
            <div className="flex-1 text-left min-w-0">
              {item.title && (
                <h4 className="text-sm font-semibold text-text-primary capitalize mb-0.5">
                  {item.title}
                </h4>
              )}
              <p className="text-sm text-text-primary leading-snug">
                {item.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(item.id)}
              className="text-text-muted hover:text-text-primary p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
