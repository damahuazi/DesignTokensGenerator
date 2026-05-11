/**
 * Toast 通知组件
 */

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm
            animate-in slide-in-from-right fade-in duration-300
            ${toast.type === 'success' ? 'bg-green-500/95 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500/95 text-white' : ''}
            ${toast.type === 'info' ? 'bg-primary/95 text-white' : ''}
          `}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 flex-shrink-0" />}

          <span className="text-sm font-medium">{toast.message}</span>

          <button
            onClick={() => onRemove(toast.id)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
