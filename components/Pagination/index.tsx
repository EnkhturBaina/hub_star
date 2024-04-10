'use client';
import { useAppContext } from '@/app/app-context';
import { Pagination } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React from 'react';
interface IProps {
  page: number;
  pageCount: number;
}
const PaginationComp: React.FC<IProps> = ({ page, pageCount }) => {
  const { adParam, setAdParam } = useAppContext();
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
        onChange={page =>
          setAdParam({
            order: adParam.order,
            page,
            limit: 10,
            categoryId: adParam.categoryId,
            mainDirectionId: adParam.mainDirectionId,
            directionIds: adParam.directionIds,
            subDirectionIds: adParam.subDirectionIds,
          })
        }
        total={pageCount}
        initialPage={page}
        classNames={{
          wrapper: 'w-full gap-4',
          cursor: 'bg-mainColor shadow-lg text-white font-bold',
        }}
      />
    </motion.div>
  );
};

export default PaginationComp;
