import classNames from '@utils/classNames';
import React, { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  handleChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  className,
  handleChange,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1 py-2">
      {label && <label className="font-bold">{label}</label>}
      <input
        className={classNames(
          'w-full px-3 py-2 border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-mainColor',
          error ? 'border-red-500' : 'border-gray-300',
          className ?? ''
        )}
        {...props}
        onChange={e => handleChange(e.target.value)}
      />
      {(error || helperText) && (
        <span className={classNames('text-sm', error ? 'text-red-500' : 'text-gray-500')}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;
