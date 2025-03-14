import React from 'react';
import classNames from '@utils/classNames';

interface IProps {
  message: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
}

const MyAlert: React.FC<IProps> = ({ message, variant = 'error', onClose }) => {
  const getAlertStyle = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-400';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-400';
    }
  };

  return (
    <div
      className={classNames('w-full px-4 py-3 rounded border relative', getAlertStyle())}
      role="alert"
    >
      {message}
      <button onClick={onClose} className="absolute top-0 right-0 p-2" aria-label="Close alert">
        <span className="text-xl">&times;</span>
      </button>
    </div>
  );
};

export default MyAlert;
