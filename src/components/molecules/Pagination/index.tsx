import { Pagination } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useMainState } from '@context/main';
const PaginationComp = ({
  page = 1,
  pageCount = 1,
  limit = 10,
}: {
  page?: number;
  pageCount?: number;
  limit?: number;
}) => {
  const { addQuery } = useMainState();
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
      className="animate_top my-14 flex w-full items-center justify-center"
    >
      <Pagination
        showControls
        onChange={page => addQuery({ page, limit })}
        total={pageCount}
        initialPage={page}
        classNames={{
          wrapper: 'w-full gap-4',
          cursor: 'bg-mainColor text-white font-bold',
        }}
      />
    </motion.div>
  );
};

export default PaginationComp;
