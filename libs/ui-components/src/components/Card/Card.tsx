import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  padding = 'md',
  shadow = 'md',
  border = false,
  children,
  className = '',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg ${paddingClasses[padding]} ${shadowClasses[shadow]} ${border ? 'border border-gray-200 dark:border-gray-700' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
