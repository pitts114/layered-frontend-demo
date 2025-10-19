import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
}

export const Switch: React.FC<SwitchProps> = ({ label, helperText, id, className = '', disabled, checked, ...props }) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <div className="flex items-center">
        <label htmlFor={switchId} className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={switchId}
            disabled={disabled}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div className={`w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed ${className}`}></div>
        </label>
        {label && (
          <label htmlFor={switchId} className="ml-3 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
      {helperText && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
};
