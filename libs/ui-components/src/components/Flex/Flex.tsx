import React from 'react';

type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  sm?: FlexDirection;
  md?: FlexDirection;
  lg?: FlexDirection;
  xl?: FlexDirection;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean | 'reverse';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  children: React.ReactNode;
}

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  sm,
  md,
  lg,
  xl,
  align,
  justify,
  wrap = false,
  gap,
  children,
  className = '',
  ...props
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const smDirectionClasses = {
    row: 'sm:flex-row',
    col: 'sm:flex-col',
    'row-reverse': 'sm:flex-row-reverse',
    'col-reverse': 'sm:flex-col-reverse',
  };

  const mdDirectionClasses = {
    row: 'md:flex-row',
    col: 'md:flex-col',
    'row-reverse': 'md:flex-row-reverse',
    'col-reverse': 'md:flex-col-reverse',
  };

  const lgDirectionClasses = {
    row: 'lg:flex-row',
    col: 'lg:flex-col',
    'row-reverse': 'lg:flex-row-reverse',
    'col-reverse': 'lg:flex-col-reverse',
  };

  const xlDirectionClasses = {
    row: 'xl:flex-row',
    col: 'xl:flex-col',
    'row-reverse': 'xl:flex-row-reverse',
    'col-reverse': 'xl:flex-col-reverse',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapClasses = {
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
  };

  const wrapClass = wrap === true ? 'flex-wrap' : wrap === 'reverse' ? 'flex-wrap-reverse' : '';

  const classes = `
    flex
    ${directionClasses[direction]}
    ${sm ? smDirectionClasses[sm] : ''}
    ${md ? mdDirectionClasses[md] : ''}
    ${lg ? lgDirectionClasses[lg] : ''}
    ${xl ? xlDirectionClasses[xl] : ''}
    ${align ? alignClasses[align] : ''}
    ${justify ? justifyClasses[justify] : ''}
    ${wrapClass}
    ${gap !== undefined ? gapClasses[gap] : ''}
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
