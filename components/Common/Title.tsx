import { Divider } from '@nextui-org/react';

type Props = {
  label: string;
};
const Title: React.FC<Props> = ({ label }) => {
  return (
    <>
      <h4 className="lg:text-lg text-base font-semibold text-black">{label}</h4>
      <Divider className="my-4" />
    </>
  );
};

export default Title;
