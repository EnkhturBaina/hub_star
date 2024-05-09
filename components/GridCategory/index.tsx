import React, { useCallback, useEffect, useRef, useState } from 'react';
import CatItem from './CatItem';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useDraggable } from 'react-use-draggable-scroll';
import { ReferenceService } from '@/service/reference/reference.service';
import { MainDirection } from '@/types/reference';
import Title from '../Common/Title';

const GridCategory = () => {
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
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
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top relative overflow-auto mt-6"
    >
      <div className="w-full overflow-hidden">
        <Title label="Зөвлөмжүүд" />
      </div>
      <div className="mx-auto mt-5 max-w-c-1280 overflow-x-auto flex min-w-0">
        <div className="overflow-x-scroll flex gap-8 no-scrollbar" {...events} ref={ref}>
          {mainDirections.map((item, index) => (
            <CatItem mainDirection={item} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GridCategory;
