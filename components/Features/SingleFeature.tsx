import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top z-40 flex h-30 cursor-pointer flex-col items-center justify-center rounded-lg border border-white bg-white text-mainBlue shadow-md transition-all hover:bg-primary  hover:text-white hover:shadow-solid-4"
      >
        <Link
          href={`/adv/`}
          className="flex h-full flex-col items-center justify-center p-2 hover:text-white"
        >
          <div className="flex h-2/3 w-16 rounded-[4px] bg-primary">
            <Image
              src={icon}
              width={55}
              height={55}
              alt="title"
              className="max-h-16"
            />
          </div>
          <span className=" flex h-1/3 items-center justify-center text-center align-middle text-xs font-bold leading-none hover:text-white">
            {title}
          </span>
        </Link>
      </motion.div>
    </>
  );
};

export default SingleFeature;
