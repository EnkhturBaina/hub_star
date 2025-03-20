import React from 'react';
import { motion } from 'framer-motion';
import classNames from '@utils/classNames';

interface IProps {
  steps?: {
    state: string;
  }[];
  current?: number;
  handleCurrent?: (current: number) => void;
}
const Stepper = ({ steps = [], current = 0, handleCurrent }: IProps) => {
  return (
    <>
      {/* <!-- ===== Features Tab Start ===== --> */}
      <section className="relative">
        <div className="relative mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0">
          {/* <!-- Tab Menues Start --> */}
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
            className="animate_top flex flex-wrap justify-center rounded-md border border-stroke bg-white shadow-solid-5 dark:border-strokedark dark:bg-blacksection dark:shadow-solid-6 md:flex-nowrap md:items-center lg:gap-7.5 xl:mb-1 xl:gap-12.5"
          >
            {steps.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCurrent(index)}
                className={classNames(
                  'relative flex w-full cursor-pointer items-center gap-4 border-b border-stroke px-6 last:border-0 dark:border-strokedark md:w-auto md:border-0 xl:px-13.5',
                  current === index
                    ? 'active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-primary'
                    : ''
                )}
              >
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle3 font-medium text-black dark:text-white">
                    {index + 1}
                  </p>
                </div>
                <div className="md:w-3/5 lg:w-auto">
                  <button className="text-sm font-medium text-black dark:text-white xl:text-regular">
                    {item.state}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          {/* <!-- Tab Menues End --> */}

          {/* <!-- Tab Content Start --> */}
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
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top mx-auto max-w-c-1154"
          ></motion.div>
          {/* <!-- Tab Content End --> */}
        </div>
      </section>
      {/* <!-- ===== Features Tab End ===== --> */}
    </>
  );
};

export default Stepper;
