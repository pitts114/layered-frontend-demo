import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
  ...props
}) => {
  const variantStyles = {
    info: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg ${variantStyles[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg hover:opacity-70"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};
