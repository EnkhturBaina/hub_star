'use client';
import { Blog } from '@/types/blog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const AdviceItem = ({ blog }: { blog: Blog }) => {
  const { id, mainImage, title, desciption, pdfId } = blog;

  return (
    <>
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
        className="animate_top rounded-lg overflow-hidden bg-white shadow-md"
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_MEDIA_URL + pdfId}`}
          target="_blank"
          className="relative h-56 w-full bg-[#DADADA] flex flex-col justify-center items-center"
        >
          <Image
            src="/pdf_icon.png"
            alt={'alt' + id}
            width={54}
            height={70}
            className="h-24 w-20"
          />
        </Link>

        <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-base font-bold text-center text-[#909294] duration-300 px-6 pb-2">
          {title}
        </h3>
      </motion.div>
    </>
  );
};

export default AdviceItem;
