import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'primary' | 'muted';
  underline?: 'none' | 'hover' | 'always';
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  variant = 'default',
  underline = 'hover',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
    primary: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium',
    muted: 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200',
  };

  const underlineStyles = {
    none: 'no-underline',
    hover: 'no-underline hover:underline',
    always: 'underline',
  };

  const classes = `${variantStyles[variant]} ${underlineStyles[underline]} transition-colors cursor-pointer ${className}`;

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};
