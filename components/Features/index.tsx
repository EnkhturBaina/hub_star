'use client';
import React from 'react';
import SingleFeature from './SingleFeature';
import { useAppContext } from '@/app/app-context';
import { Button } from '@nextui-org/react';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import { motion } from 'framer-motion';

const Feature = () => {
  const { categories } = useAppContext();
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
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
        className="animate_top"
        id="features"
      >
        <div className="w-full overflow-hidden">
          <Button
            isDisabled
            radius="full"
            className="h-8 w-50 bg-gradient-to-r from-blue-500 to-blue-900 font-bold uppercase leading-none tracking-wide text-white !opacity-100"
          >
            Онцгой үйлчилгээ
          </Button>
        </div>
        <div className="max-w-c-1315 lg:mx-auto lg:px-4 xl:px-0">
          <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {/* <!-- Features item Start --> */}

            {SpecialServiceData.map((item, index) => (
              <SingleFeature specialService={item} key={index} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </motion.div>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
