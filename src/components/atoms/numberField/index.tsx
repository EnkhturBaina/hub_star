import classNames from '@utils/classNames';
import React from 'react';

interface NumberFieldProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  disabled,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : Number(e.target.value);
    if (!isNaN(newValue)) {
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;
      onChange(newValue);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 py-2">
      {label && <label className="font-bold">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        className={classNames(
          'w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none',
          'focus:border-mainColor focus:ring-1 focus:ring-mainColor',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          className ?? ''
        )}
      />
    </div>
  );
};

export default NumberField;
