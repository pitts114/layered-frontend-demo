import React from 'react';

export interface NavbarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ left, center, right, className = '' }) => {
  return (
    <nav
      className={`flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center gap-4">{left}</div>
      <div className="flex items-center gap-4">{center}</div>
      <div className="flex items-center gap-4">{right}</div>
    </nav>
  );
};
