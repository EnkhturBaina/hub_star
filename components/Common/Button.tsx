import { Button } from '@heroui/react';

interface IProps {
  label: string;
  className: string;
  onClick: () => void;
}
const CustomButton: React.FC<IProps> = props => (
  <Button radius="sm" className={props.className} onPress={props.onClick}>
    {props.label}
  </Button>
);
export default CustomButton;
