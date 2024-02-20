"use client";
import { Services } from "@/types/services";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const GridServices = ({
  servicesData,
  isAddService,
  isStars,
}: {
  servicesData: any;
  isAddService: boolean;
  isStars: boolean;
}) => {
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
      className="animate_top grid grid-cols-1 gap-6 bg-mainProfileCardBg md:grid-cols-2 lg:grid-cols-3"
    >
      {servicesData.map((blog: Services, index: any) => (
        <div
          className="rounded-lg bg-white shadow-solid-8"
          key={"grid" + index}
        >
          <Link href={`/blog/`} className="relative block aspect-[368/239]">
            <Image
              src={blog.mainImage}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="flex w-50 flex-row items-center justify-center">
              <span className="font-bold">Үнэлгээ: 10/10</span>
              <div className="flex flex-row items-center">
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
              </div>
            </div>
          </Link>

          <div className="flex flex-col px-6 pb-2">
            <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold  duration-300 hover:text-primary ">
              <Link href={`/blog/blog-details`} className="!text-black">
                {`${blog.title.slice(0, 25)}...`}
              </Link>
            </h3>
            <span className="line-clamp-3">{blog.metadata}</span>
          </div>
        </div>
      ))}
      {isAddService ? (
        <div className="flex h-67 cursor-pointer items-center justify-center rounded-lg bg-mainGray">
          <IoAddCircle className="text-[150px] text-mainBgGray" />
        </div>
      ) : null}
    </motion.div>
  );
};

export default GridServices;