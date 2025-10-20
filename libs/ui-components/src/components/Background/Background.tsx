import React from 'react';

export interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const Background: React.FC<BackgroundProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};
