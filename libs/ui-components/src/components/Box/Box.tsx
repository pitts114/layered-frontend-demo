import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  margin?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  bg?: 'white' | 'gray' | 'transparent';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'aside' | 'main';
}

export const Box: React.FC<BoxProps> = ({
  padding,
  margin,
  bg,
  rounded = 'none',
  shadow = 'none',
  border = false,
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const paddingClasses = {
    0: 'p-0',
    1: 'p-1',
    2: 'p-2',
    3: 'p-3',
    4: 'p-4',
    5: 'p-5',
    6: 'p-6',
    8: 'p-8',
    10: 'p-10',
    12: 'p-12',
  };

  const marginClasses = {
    0: 'm-0',
    1: 'm-1',
    2: 'm-2',
    3: 'm-3',
    4: 'm-4',
    5: 'm-5',
    6: 'm-6',
    8: 'm-8',
    10: 'm-10',
    12: 'm-12',
  };

  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    transparent: 'bg-transparent',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const classes = `
    ${padding !== undefined ? paddingClasses[padding] : ''}
    ${margin !== undefined ? marginClasses[margin] : ''}
    ${bg ? bgClasses[bg] : ''}
    ${roundedClasses[rounded]}
    ${shadowClasses[shadow]}
    ${border ? 'border border-gray-300' : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
