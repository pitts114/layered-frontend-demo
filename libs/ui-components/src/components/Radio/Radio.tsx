import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
}

export const Radio: React.FC<RadioProps> = ({ label, helperText, id, className = '', disabled, ...props }) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          type="radio"
          id={radioId}
          disabled={disabled}
          className={`w-4 h-4 mt-0.5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        />
        {label && (
          <label htmlFor={radioId} className="ml-2 text-sm text-gray-700 cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
      {helperText && <p className="mt-1 ml-6 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
