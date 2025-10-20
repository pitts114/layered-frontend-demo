import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  disabled,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={`w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};
