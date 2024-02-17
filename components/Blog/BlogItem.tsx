"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata } = blog;

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
        className="animate_top rounded-lg bg-white shadow-solid-8 dark:bg-blacksection"
      >
        <Link href={`/blog/`} className="relative block aspect-[368/239]">
          <Image src={mainImage} alt={title} fill />
        </Link>

        <div className="flex flex-col px-6 pb-2">
          <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold text-black duration-300 hover:text-primary ">
            <Link href={`/blog/blog-details`}>
              {`${title.slice(0, 30)}...`}
            </Link>
          </h3>
          <span className="line-clamp-3">{metadata}</span>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
