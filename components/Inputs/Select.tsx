import { Autocomplete, AutocompleteItem } from '@heroui/react';
interface IOption {
  label: string;
  value?: string | number;
}
type Props = {
  label?: string;
  value?: string | number;
  onSelectionChange?: (key: string | number) => void;
  options: IOption[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};
const CustomSelect: React.FC<Props> = ({
  size = 'lg',
  className,
  label,
  value,
  onSelectionChange,
  options,
}) => {
  return (
    <Autocomplete
      className={className}
      label={label}
      labelPlacement="outside"
      placeholder="Сонгох"
      radius="sm"
      size={size}
      variant="bordered"
      selectedKey={String(value)}
      onSelectionChange={onSelectionChange}
      clearIcon={false}
      inputProps={{
        classNames: {
          label: 'font-bold',
          input: '!outline-none !shadow-none',
          inputWrapper: '!outline-none !shadow-none',
        },
      }}
    >
      {options.map(item => (
        <AutocompleteItem key={item.value} value={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
export default CustomSelect;
