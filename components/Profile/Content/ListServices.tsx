'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { Advertisement } from '@/types/advertisement';
import Rating from '@/components/Common/Rating';

const ListServices = ({ servicesData, isStars }: { servicesData: any; isStars: boolean }) => {
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
      className="animate_top grid grid-cols-1 gap-3 bg-white"
    >
      {servicesData.map((blog: Advertisement, index: number) => {
        return (
          <div
            className="flex h-25 w-full flex-row justify-between rounded-lg bg-white shadow-solid-8"
            key={'list' + index}
          >
            <div className="flex flex-row">
              <Link href={`/adv/`} className="relative block aspect-[368/239]">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + blog.images[0].id}
                  alt={blog.title}
                  width={100}
                  height={80}
                  className="h-full w-35"
                />
              </Link>
              <div className="flex max-w-2xl flex-col px-3 pb-2">
                <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold  duration-300 hover:text-primary ">
                  <Link href={`/adv/${blog?.id}`} className="!text-black">
                    {`${blog.title.slice(0, 100)}...`}
                  </Link>
                </h3>
                <span className="line-clamp-3">{blog.desciption}</span>
              </div>
            </div>
            {isStars && (
              <div className="flex w-50 flex-col items-center justify-center">
                <Rating point={blog.rating} />
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default ListServices;
