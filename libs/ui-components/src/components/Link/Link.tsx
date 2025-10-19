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
    default: 'text-blue-600 hover:text-blue-800',
    primary: 'text-blue-600 hover:text-blue-700 font-medium',
    muted: 'text-gray-600 hover:text-gray-800',
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
