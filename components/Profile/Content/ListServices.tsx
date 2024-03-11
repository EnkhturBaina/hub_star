"use client";
import { Services } from "@/types/services";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ListServices = ({
  servicesData,
  showAddBtn,
  isStars,
  isAddService,
  setIsAddService,
}: {
  servicesData: any;
  showAddBtn: boolean;
  isStars: boolean;
  isAddService?: boolean;
  setIsAddService?: any;
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
      className="animate_top grid grid-cols-1 gap-3 bg-mainProfileCardBg"
    >
      {servicesData.map((blog: Services, index: any) => (
        <div
          className="flex h-25 w-full flex-row justify-between rounded-lg bg-white shadow-solid-8"
          key={"list" + index}
        >
          <div className="flex flex-row">
            <Link href={`/adv/`} className="relative block aspect-[368/239]">
              <Image
                src={blog.mainImage}
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
          {isStars ? (
            <div className="flex w-50 flex-col items-center justify-center">
              <span className="font-bold">Үнэлгээ: 10/10</span>
              <div className="flex flex-row items-center">
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
                <FaStar className="text-2xl text-mainColor" />
              </div>
            </div>
          ) : null}
        </div>
      ))}
      {showAddBtn ? (
        <div
          className="flex h-25 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
          onClick={() => setIsAddService(true)}
        >
          <IoAddCircle className="text-[70px] text-mainBgGray" />
        </div>
      ) : null}
    </motion.div>
  );
};

export default ListServices;
