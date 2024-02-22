"use client";

import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { Progress } from "semantic-ui-react";

const Step2 = () => {
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
      className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden"
    >
      <Input
        key="bankName"
        type="text"
        label="Банкны нэр"
        labelPlacement="outside"
        placeholder="Банкны нэр"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="accountNumber"
        type="number"
        label="Дансны дугаар"
        labelPlacement="outside"
        placeholder="Дансны дугаар"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="accountHolder"
        type="text"
        label="Эзэмшигчийн нэр"
        labelPlacement="outside"
        placeholder="Эзэмшигчийн нэр"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />

      <div className="flex flex-row justify-end">
        <Button className="mr-4 bg-mainColor !text-white" radius="sm" size="md">
          Хадгалах
        </Button>
        <Button
          variant="bordered"
          radius="sm"
          className="border-mainGray !bg-white !text-black"
          size="md"
        >
          Цуцлах
        </Button>
      </div>
    </motion.div>
  );
};

export default Step2;
