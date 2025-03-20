import classNames from '@utils/classNames';
import React from 'react';

interface TextAreaFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  disabled = false,
  className = '',
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-bold">{label}</label>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={classNames(
          'w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-mainColor',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default TextAreaField;
