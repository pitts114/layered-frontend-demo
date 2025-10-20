import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  variant = 'default',
  onRemove,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    primary: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300',
    error: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-sm font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70" aria-label="Remove">
          ×
        </button>
      )}
    </span>
  );
};
