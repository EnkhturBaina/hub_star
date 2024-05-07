import { Spinner } from '@nextui-org/react';

const Loading: React.FC = () => {
  return (
    <div className="h-unit-9xl flex justify-center items-center">
      <Spinner />
    </div>
  );
};
export default Loading;
