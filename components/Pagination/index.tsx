"use client";
import { Pagination } from "@nextui-org/react";
import { motion } from "framer-motion";

const PaginationComp = () => {
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
      className="animate_top my-14 flex w-full items-center justify-center"
    >
      <Pagination
        showControls
        total={4}
        initialPage={1}
        classNames={{
          wrapper: "w-full gap-4",
          cursor: "bg-mainColor shadow-lg text-white font-bold",
        }}
      />
    </motion.div>
  );
};

export default PaginationComp;
