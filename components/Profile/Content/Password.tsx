"use client";

import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";

const Password = () => {
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
      className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden p-2"
    >
      <Input
        key="oldPassword"
        type="password"
        label="Хуучин нууц үг"
        labelPlacement="outside"
        placeholder="Хуучин нууц үг"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="newPassword"
        type="password"
        label="Шинэ нууц үг"
        labelPlacement="outside"
        placeholder="Шинэ нууц үг"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="repeatPassword"
        type="password"
        label="Нууц үг давтах"
        labelPlacement="outside"
        placeholder="Нууц үг давтах"
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

export default Password;
