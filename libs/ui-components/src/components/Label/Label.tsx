import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ required, children, className = '', ...props }) => {
  return (
    <label
      className={`block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
    </label>
  );
};
