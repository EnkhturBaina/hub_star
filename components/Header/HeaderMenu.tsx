"use client";
import Image from "next/image";
import { useState } from "react";
import featuresTabData from "./featuresTabData";
import { motion } from "framer-motion";

const HeaderMenu = () => {
  const [currentTab, setCurrentTab] = useState("tab1");

  return (
    <div className="flex w-full flex-row justify-center">
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
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top flex flex-wrap justify-center overflow-x-auto md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-12.5"
      >
        {featuresTabData?.map((el, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentTab(el.id)}
              className={`relative flex h-full w-full cursor-pointer flex-col items-center border-b border-stroke px-6 py-2 last:border-0  md:w-auto md:border-0 xl:px-13.5 xl:pt-5 ${
                currentTab === el.id
                  ? "active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-mainColor"
                  : ""
              }`}
            >
              <Image
                src={el.image}
                alt="logo"
                width={50}
                height={50}
                className="block"
              />
              <div className="md:w-3/5 lg:w-auto">
                <button className="text-xs font-semibold text-black xl:text-sm">
                  {el.title}
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeaderMenu;
