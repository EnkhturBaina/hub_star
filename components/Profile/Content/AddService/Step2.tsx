"use client";

import { motion } from "framer-motion";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Progress } from "semantic-ui-react";
import { animals } from "../animals";

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
        key="postTitle"
        type="text"
        label="Зарын гарчиг"
        labelPlacement="outside"
        placeholder="--"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Хэрэглэгчийн ангилал"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: "font-bold",
            trigger: "custom-select-trigger bg-white",
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          key="price"
          type="text"
          label="Үнэ"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: "font-bold",
            inputWrapper: ["custom-input-wrapper", "bg-white"],
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Аймаг, Хот"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: "font-bold",
            trigger: "custom-select-trigger bg-white",
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Сум, Дүүрэг"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: "font-bold",
            trigger: "custom-select-trigger bg-white",
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Баг, Хороо"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: "font-bold",
            trigger: "custom-select-trigger bg-white",
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Textarea
        variant="bordered"
        label="Байршил"
        labelPlacement="outside"
        radius="sm"
        placeholder="Байршил"
        classNames={{
          base: "w-full",
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
    </motion.div>
  );
};

export default Step2;
