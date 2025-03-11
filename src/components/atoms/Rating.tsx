import { Fragment } from 'react';
import { FaStar } from 'react-icons/fa';

type Props = {
  point: number;
  noText?: boolean;
};
const Rating: React.FC<Props> = ({ point = 0, noText = false }) => {
  return (
    <div className="flex gap-1 items-center justify-end rounded-sm py-0 px-2">
      {!noText && <span className="font-bold md:text-base text-sm">Үнэлгээ:</span>}
      <div className="flex flex-row items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`md:text-2xl text-lg text-mainColor ${index < point ? 'text-mainColor' : 'text-slate-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
