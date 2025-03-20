import React from 'react';
import classNames from '@utils/classNames';

interface SelectFieldProps {
  options: { value: any; label: string }[];
  onChange?: (value: string) => void;
  value?: any;
  label?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  options,
  onChange,
  value,
  label = 'Select an option',
  className,
  disabled = false,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const baseClassName =
    'w-full p-1 md:p-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor';

  return (
    <div className="relative">
      <label className="text-sm md:text-medium block mb-2 font-semibold text-gray-900">
        {label}
      </label>
      <select
        className={classNames('text-sm md:text-medium', baseClassName, className)}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      >
        {!value && <option value={null}>{label}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default SelectField;
