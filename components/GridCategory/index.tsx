import React from 'react';
import CatItem from './CatItem';
import { useAppContext } from '@/utils/context/app-context';

const GridCategory = () => {
  const { mainDirections } = useAppContext();
  return (
    <section className="">
      <div className="mx-auto mt-5 max-w-c-1280">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          {mainDirections.map((item, key) => (
            <CatItem mainDirection={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridCategory;
