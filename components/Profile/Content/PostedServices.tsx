"use client";
import BlogItem from "@/components/Blog/BlogItem";
import servicesData from "./servicesData";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";

const PostedServices = () => {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <div className="mb-4 w-full overflow-hidden ">
      <div className="flex justify-end">
        <Button
          className="min-w-unit-12 !px-0"
          radius="sm"
          onClick={() => {
            setIsGrid(!isGrid);
          }}
        >
          {isGrid ? (
            <CiGrid41 className="text-4xl" />
          ) : (
            <CiGrid2H className="text-4xl" />
          )}
        </Button>
      </div>
      <div className="mx-auto mt-4 max-w-c-1280">
        <div className="grid grid-cols-1 gap-6 bg-mainProfileCardBg md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((blog, key) => (
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
              className="animate_top rounded-lg bg-white shadow-solid-8"
            >
              <Link href={`/blog/`} className="relative block aspect-[368/239]">
                <Image src={blog.mainImage} alt={blog.title} fill />
              </Link>

              <div className="flex flex-col px-6 pb-2">
                <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold text-black duration-300 hover:text-primary ">
                  <Link href={`/blog/blog-details`}>
                    {`${blog.title.slice(0, 30)}...`}
                  </Link>
                </h3>
                <span className="line-clamp-3">{blog.metadata}</span>
              </div>
            </motion.div>
          ))}
          <div className="flex h-67 cursor-pointer items-center justify-center rounded-lg bg-mainGray">
            <IoAddCircle className="text-[150px] text-mainBgGray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedServices;
