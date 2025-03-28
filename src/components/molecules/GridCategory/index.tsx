import React, { useCallback, useEffect, useState } from 'react';
import CatItem from './CatItem';
import { motion } from 'framer-motion';
import ReferenceService from '@services/reference';
import { MainDirection } from '@typeDefs/reference';
import Title from '../../atoms/Title';
import { useTranslations } from 'next-intl';

const GridCategory = () => {
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const t = useTranslations();

  const getMainDirection = useCallback(async () => {
    await ReferenceService.getMainDirection({ isAdvice: true }).then(res => {
      if (res.success) {
        setMainDirections(res.response);
      }
    });
  }, []);
  useEffect(() => {
    getMainDirection();
  }, [getMainDirection]);

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
        <Title label={t('advices')} />
      </div>
      <div className="mx-auto mt-5 max-w-c-1280 overflow-x-auto flex min-w-0">
        <div className="overflow-x-scroll grid md:grid-cols-4 grid-cols-2 gap-8 no-scrollbar w-full">
          {mainDirections.map((item, index) => (
            <CatItem mainDirection={item} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GridCategory;
