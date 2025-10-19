import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ variant = 'default', onRemove, children, className = '', ...props }) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-sm font-medium ${variantStyles[variant]} ${className}`} {...props}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70" aria-label="Remove">×</button>
      )}
    </span>
  );
};
