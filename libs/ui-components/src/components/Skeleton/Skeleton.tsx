import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Simplified - both use pulse
    none: '',
  };

  const defaultHeight = variant === 'text' ? '1rem' : variant === 'circular' ? '3rem' : '3rem';
  const defaultWidth = variant === 'circular' ? '3rem' : '100%';

  const inlineStyles = {
    width: width ?? defaultWidth,
    height: height ?? defaultHeight,
    ...style,
  };

  return (
    <div
      className={`bg-gray-200 ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={inlineStyles}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
};
