'use client';
import React from 'react';
import { motion } from 'framer-motion';
import SpecialServiceData from '@datas/SpecialServiceData';
import SpecialWork from '@components/atoms/specialWork';

const SpecialTypeMenu: React.FC = () => {
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
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top flex no-scrollbar flex-row md:justify-center justify-start overflow-x-scroll whitespace-nowrap md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-12.5 gap-2"
    >
      {SpecialServiceData.map((item, index: number) => (
        <SpecialWork specialService={item} key={index} />
      ))}
    </motion.div>
  );
};

export default SpecialTypeMenu;
