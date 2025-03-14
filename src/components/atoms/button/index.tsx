import React, { ReactNode } from 'react';
import classNames from '@utils/classNames';

interface IProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean; // Add loading prop
  className?: string;
  onClick?: () => void;
}

const MyButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false, // Add loading default value
  className = '',
  onClick,
}: IProps) => {
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none relative';

  const variants = {
    primary: 'bg-mainColor text-white hover:bg-mainColor/90',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    link: 'text-blue-600 hover:bg-blue-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {loading ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default MyButton;
