import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
interface IOption {
  label: string;
  value?: string | number;
}
type Props = {
  label: string;
  value?: string | number;
  onSelectionChange?: (key: string | number) => void;
  options: IOption[];
};
const CustomSelect: React.FC<Props> = ({ label, value, onSelectionChange, options }) => {
  return (
    <Autocomplete
      label={label}
      labelPlacement="outside"
      placeholder="Сонгох"
      radius="sm"
      size="lg"
      variant="bordered"
      selectedKey={String(value)}
      onSelectionChange={onSelectionChange}
      inputProps={{
        classNames: {
          label: 'font-bold',
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
