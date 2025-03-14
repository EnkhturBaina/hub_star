'use client';
import { Blog } from '@typeDefs/blog';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SpecialPost = ({ blog }: { blog: Blog }) => {
  const { title, desciption } = blog;

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
        className="animate_top rounded-lg bg-white shadow-md"
      >
        <Link href={`/adv/`} className="relative block aspect-[368/239]">
          {/* <Image src={mainImage} alt={title} fill /> */}
        </Link>

        <div className="flex flex-col px-6 pb-2">
          <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold text-black duration-300 hover:text-primary ">
            <Link href={`/adv/${blog?.id}`}>{`${title.slice(0, 20)}...`}</Link>
          </h3>
          <span className="line-clamp-3">{desciption}</span>
        </div>
      </motion.div>
    </>
  );
};

export default SpecialPost;
