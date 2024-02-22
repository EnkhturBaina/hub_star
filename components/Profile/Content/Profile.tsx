"use client";

import { motion } from "framer-motion";
import { Button, Input, Textarea } from "@nextui-org/react";

const Profile = () => {
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
        key="lName"
        type="text"
        label="Овог"
        labelPlacement="outside"
        placeholder="Овог"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="fName"
        type="text"
        label="Нэр"
        labelPlacement="outside"
        placeholder="Нэр"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="position"
        type="text"
        label="Албан тушаал"
        labelPlacement="outside"
        placeholder="Албан тушаал"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="mobileNumber"
        type="text"
        label="Утасны дугаар"
        labelPlacement="outside"
        placeholder="Утасны дугаар"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Input
        key="email"
        type="email"
        label="И-мэйл хаяг"
        labelPlacement="outside"
        placeholder="И-мэйл хаяг"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <Textarea
        variant="bordered"
        label="Хаяг"
        labelPlacement="outside"
        radius="sm"
        placeholder="Хаяг"
        classNames={{
          base: "w-full",
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

export default Profile;
