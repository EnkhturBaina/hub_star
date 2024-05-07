import { Fragment } from 'react';
import { FaStar } from 'react-icons/fa';

type Props = {
  point: number;
};
const Rating: React.FC<Props> = ({ point = 0 }) => {
  return (
    <Fragment>
      <span className="font-bold">Үнэлгээ:</span>
      <div className="flex flex-row items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-2xl text-mainColor ${index < point ? 'text-mainColor' : 'text-slate-400'}`}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Rating;
