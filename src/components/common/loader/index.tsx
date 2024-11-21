import React from 'react';
import style from './loader.module.scss';

interface LoaderProps {
  size?: number;
  colors?: string[];
}

const Loader: React.FC<LoaderProps> = ({
  size = 20,
  colors = ['#177AD6', '#F1583C', '#177AD6', '#177AD6'],
}) => {
  return (
    <div
      className="flex justify-center items-center h-screen w-full fixed top-0 left-0 z-50"
      role="status"
      aria-label="Loading..."
    >
      <div className={style.ldsellipsis}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: `${size}px`,
              height: `${size}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
