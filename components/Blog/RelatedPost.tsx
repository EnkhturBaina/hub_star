'use client';
import { Advertisement } from '@/types/advertisement';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
type Props = {
  advertisement: Advertisement;
};
const RelatedPost: React.FC<Props> = ({ advertisement }) => (
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
    className="animate_top shadow-solid- rounded-lg bg-white"
  >
    <Link href={`/adv/`} className="relative block aspect-[368/239]">
      {/* <Image
        src={process.env.NEXT_PUBLIC_MEDIA_URL + advertisement.images[0].id}
        alt={advertisement.title}
        fill
      /> */}
    </Link>

    <div className="flex flex-col px-6 pb-2">
      <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold text-black duration-300 hover:text-primary ">
        <Link href={`/adv/${advertisement.id}`}>{`${advertisement.title.slice(0, 20)}...`}</Link>
      </h3>
      <span className="line-clamp-3">{advertisement.desciption}</span>
    </div>
  </motion.div>
);

export default RelatedPost;
