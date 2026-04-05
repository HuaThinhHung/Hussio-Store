import { useState } from "react";

function Toast({ message, type = "success", onClose }) {
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };
  const bgMap = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    warning: "bg-amber-600",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white ${bgMap[type] || bgMap.success} transition-all duration-300 ease-out translate-x-0 opacity-100 animate-in slide-in-from-right-4 fade-in`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 flex-shrink-0">
        {icons[type] || icons.success}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
        aria-label="Đóng"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function useToast(initialDuration = 3000) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = initialDuration) => {
    setToast({ message, type });
    if (duration > 0) {
      setTimeout(() => setToast(null), duration);
    }
  };

  const hideToast = () => setToast(null);

  return { toast, showToast, hideToast };
}

export function ToastContainer({ toast, onClose }) {
  if (!toast) return null;
  return <Toast message={toast.message} type={toast.type} onClose={onClose} />;
}

export default Toast;
