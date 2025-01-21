import { Button } from '@nextui-org/react';

interface IProps {
  label: string;
  className: string;
  onClick: () => void;
}
const CustomButton: React.FC<IProps> = props => (
  <Button radius="sm" className={props.className} onClick={props.onClick}>
    {props.label}
  </Button>
);
export default CustomButton;
