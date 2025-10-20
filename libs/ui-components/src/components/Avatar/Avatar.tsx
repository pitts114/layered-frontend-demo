import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const [imageError, setImageError] = React.useState(false);
  const showFallback = !src || imageError;

  return (
    <div
      className={`inline-flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {showFallback ? (
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
