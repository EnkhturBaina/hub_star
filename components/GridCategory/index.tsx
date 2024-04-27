import React from 'react';
import CatItem from './CatItem';
import { useAppContext } from '@/app/app-context';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';

const GridCategory = () => {
  const { mainDirections } = useAppContext();
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top relative overflow-auto mt-6"
    >
      <div className="w-full overflow-hidden">
        <Button
          isDisabled
          radius="full"
          className="h-8 w-50 bg-gradient-to-r from-blue-500 to-blue-900 font-bold uppercase leading-none tracking-wide text-white !opacity-100"
        >
          Зөвлөмжүүд
        </Button>
      </div>
      <div className="mx-auto mt-5 max-w-c-1280 overflow-x-auto flex min-w-0">
        <div className="overflow-x-auto flex gap-8 no-scrollbar">
          {mainDirections.map((item, index) => (
            <CatItem mainDirection={item} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GridCategory;
