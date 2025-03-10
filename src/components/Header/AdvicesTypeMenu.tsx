'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReferenceService } from '@services/reference/reference.service';
import { MainDirection } from '@typeDefs/reference';
import CatItem from '../GridCategory/CatItem';

const AdvicesTypeMenu: React.FC = () => {
  const router = useRouter();
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);

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
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top relative w-full no-scrollbar overflow-x-auto whitespace-nowrap mb-4"
    >
      <div className="overflow-x-scroll flex justify-center md:gap-8 gap-2 no-scrollbar w-full px-4">
        {(mainDirections || []).map((item, idx) => (
          <div key={idx} className="w-full max-w-[280px]">
            <CatItem mainDirection={item} queryId={router.query?.mainDirectionId || ''} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdvicesTypeMenu;
