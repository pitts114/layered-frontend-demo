import React from 'react';

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: 'auto' | 'initial' | 'none' | '1';
  grow?: boolean | 0 | 1;
  shrink?: boolean | 0 | 1;
  basis?: 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  children: React.ReactNode;
}

export const FlexItem: React.FC<FlexItemProps> = ({
  flex,
  grow,
  shrink,
  basis,
  children,
  className = '',
  ...props
}) => {
  const flexClasses = {
    auto: 'flex-auto',
    initial: 'flex-initial',
    none: 'flex-none',
    '1': 'flex-1',
  };

  const growClasses = {
    true: 'flex-grow',
    1: 'flex-grow',
    false: 'flex-grow-0',
    0: 'flex-grow-0',
  };

  const shrinkClasses = {
    true: 'flex-shrink',
    1: 'flex-shrink',
    false: 'flex-shrink-0',
    0: 'flex-shrink-0',
  };

  const basisClasses = {
    auto: 'basis-auto',
    full: 'basis-full',
    '1/2': 'basis-1/2',
    '1/3': 'basis-1/3',
    '2/3': 'basis-2/3',
    '1/4': 'basis-1/4',
    '3/4': 'basis-3/4',
  };

  const classes = `
    ${flex ? flexClasses[flex] : ''}
    ${grow !== undefined ? growClasses[String(grow) as keyof typeof growClasses] : ''}
    ${shrink !== undefined ? shrinkClasses[String(shrink) as keyof typeof shrinkClasses] : ''}
    ${basis ? basisClasses[basis] : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
