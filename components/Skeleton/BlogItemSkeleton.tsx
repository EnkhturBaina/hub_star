'use client';
import { Skeleton } from '@nextui-org/react';
import { motion } from 'framer-motion';

const BlogItemSkeleton = () => {
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
      className="animate_top mt-10 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
    >
      <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-white p-2 shadow-md">
        <div className="flex w-full flex-row items-center ">
          <Skeleton className="h-50 w-full rounded-lg" />
        </div>
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 self-start rounded-lg" />
      </div>
      <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-white p-2 shadow-md">
        <div className="flex w-full flex-row items-center ">
          <Skeleton className="h-50 w-full rounded-lg" />
        </div>
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 self-start rounded-lg" />
      </div>
      <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-white p-2 shadow-md">
        <div className="flex w-full flex-row items-center ">
          <Skeleton className="h-50 w-full rounded-lg" />
        </div>
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 self-start rounded-lg" />
      </div>
    </motion.div>
  );
};

export default BlogItemSkeleton;
