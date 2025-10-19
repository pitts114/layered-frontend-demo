import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 4,
  align,
  justify,
  wrap = false,
  children,
  className = '',
  ...props
}) => {
  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';

  const spacingClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const classes = `
    flex
    ${directionClass}
    ${spacingClasses[spacing]}
    ${align ? alignClasses[align] : ''}
    ${justify ? justifyClasses[justify] : ''}
    ${wrap ? 'flex-wrap' : ''}
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
