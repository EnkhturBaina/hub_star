import React from 'react';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@heroui/react';

interface IOption {
  label: string;
  value: string; // Remove optional since it's needed as a key
}

interface CustomSelectProps extends Omit<AutocompleteProps, 'children'> {
  options: IOption[];
  onSelectionChange?: (key: string) => void; // More specific type
  size?: 'sm' | 'md' | 'lg';
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  size = 'lg',
  className,
  label,
  onSelectionChange,
  options,
  ...restProps // Allow passing other Autocomplete props
}) => {
  const defaultClassNames = {
    label: 'font-bold',
    input: '!outline-none !shadow-none',
    inputWrapper: '!outline-none !shadow-none',
  };

  return (
    <Autocomplete
      className={className}
      label={label}
      labelPlacement="outside"
      placeholder="Сонгох"
      radius="sm"
      size={size}
      variant="bordered"
      onSelectionChange={onSelectionChange}
      clearIcon={false}
      inputProps={{
        classNames: defaultClassNames,
      }}
      {...restProps}
    >
      {options.map(({ value, label }) => (
        <AutocompleteItem key={value} value={value}>
          {label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default CustomSelect;
