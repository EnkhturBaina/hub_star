'use client';
import React from 'react';
import SpecialServiceData from '@datas/SpecialServiceData';
import { motion } from 'framer-motion';
import Title from '../../atoms/Title';
import { useTranslations } from 'next-intl';
import SpecialWork from '@components/atoms/specialWork';

const Feature = () => {
  const t = useTranslations();
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
    >
      <div className="w-full overflow-hidden">
        <Title label={t('specialService')} />
      </div>
      <div className="max-w-c-1315 lg:mx-auto lg:px-4 xl:px-0">
        <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {SpecialServiceData.map((item, index) => (
            <SpecialWork specialService={item} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
