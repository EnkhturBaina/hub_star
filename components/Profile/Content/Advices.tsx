"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Advices = () => {
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
      className="animate_top grid grid-cols-5 gap-3"
    >
      {[...new Array(8)].map((element, i) => {
        return (
          <div
            key={i}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-8"
          >
            <Image
              src="/pdf_icon.png"
              alt={"alt" + i}
              width={100}
              height={80}
              className="h-full w-12"
            />
            <span className="mt-2 text-center text-sm leading-none">
              Ажил гүйцэтгэхэд мөрдөж хөтлөх бичиг баримт
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Advices;
