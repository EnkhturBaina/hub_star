import React, { useState } from 'react';
import TextField from '../textField';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

interface PasswordFieldProps {
  label?: string;
  value: string;
  handleChange: (value: string) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  value,
  handleChange,
  error,
  helperText = '',
  placeholder = 'Enter password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-fit relative flex items-center justify-center">
      <TextField
        type={showPassword ? 'text' : 'password'}
        label={label}
        value={value}
        handleChange={handleChange}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
      />
      <button onClick={handleClickShowPassword}>
        {showPassword ? (
          <EyeSlashIcon width={16} className="absolute right-5 top-[55%] cursor-pointer" />
        ) : (
          <EyeIcon width={16} className="absolute right-5 top-[55%] cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
