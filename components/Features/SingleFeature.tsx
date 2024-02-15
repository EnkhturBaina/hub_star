import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

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
        className="animate_top z-40 flex flex-col items-center justify-center rounded-lg border border-white bg-white p-2 shadow-solid-3 transition-all hover:shadow-solid-4"
      >
        <div className="flex h-2/3 w-16 items-center justify-center rounded-[4px] bg-primary">
          <Image
            src={icon}
            width={55}
            height={55}
            alt="title"
            className="max-h-14"
          />
        </div>
        <span className=" text-mainBlue flex h-1/3 items-center justify-center text-center align-middle text-sm leading-none">
          {title}
        </span>
      </motion.div>
    </>
  );
};

export default SingleFeature;
