'use client';
import { useAppContext } from '@/context/app-context';
import { setAdvParam } from '@/lib/features/adv-param';
import { useTypedSelector } from '@/lib/reducer';
import { IAdParam } from '@/interfaces/request.interface';
import { Pagination } from '@heroui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
interface IProps {
  page: number;
  pageCount: number;
}
const PaginationComp: React.FC<IProps> = ({ page, pageCount }) => {
  const dispatch = useDispatch();
  const advParam = useTypedSelector(state => state.advParam);

  const handlePagination = (param: IAdParam) => {
    dispatch(setAdvParam(param));
  };
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
          handlePagination({
            ...advParam,
            process: 'CREATED',
            page,
            limit: 10,
          })
        }
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
