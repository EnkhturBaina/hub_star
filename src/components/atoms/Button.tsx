import { Button } from '@headlessui/react';
import classNames from '@utils/classNames';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const MyButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
}: IProps) => {
  const baseStyles = 'rounded-md font-medium transition-colors focus:outline-none';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
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
    <Button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {children}
    </Button>
  );
};
export default MyButton;
