"use client";

import { motion } from "framer-motion";
import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  SelectedItems,
  Textarea,
} from "@nextui-org/react";
import { animals } from "./animals";
import { useState } from "react";
import { BsImage } from "react-icons/bs";

const Confirmation = () => {
  const [values, setValues] = useState<any>(["cat", "dog"]);
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
      <Select
        label="Хэрэглэгчийн төрөл"
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
        label="Үйл ажиллагааны чиглэл"
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
        label="Төрөл"
        showScrollIndicators={true}
        selectionMode="multiple"
        labelPlacement="outside"
        placeholder="Сонгох"
        radius="sm"
        size="lg"
        variant="bordered"
        selectedKeys={values}
        onSelectionChange={setValues}
        isMultiline={true}
        classNames={{
          label: "font-bold",
          trigger: "custom-select-trigger bg-white p-2",
        }}
        renderValue={(items: SelectedItems<any>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          );
        }}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <div className="font-bold">Иргэний үнэмлэхний зураг</div>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
          <BsImage className="text-2xl text-mainBgGray" />
          <span className="mt-2 text-sm">Үнэмлэхний урд талын зураг</span>
        </div>
        <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
          <BsImage className="text-2xl text-mainBgGray" />
          <span className="mt-2 text-sm">Селфи зураг</span>
        </div>
        <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
          <BsImage className="text-2xl text-mainBgGray" />
          <span className="mt-2 text-sm">Үнэмлэхний ард талын зураг</span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex h-45 w-45 min-w-[180px] cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
          <BsImage className="text-2xl text-mainBgGray" />
          <span className="mt-2 text-sm">Лого</span>
        </div>
        <div className="flex w-full flex-col gap-4 p-1">
          <Input
            key="companyName"
            type="text"
            label="Байгууллагын нэр"
            labelPlacement="outside"
            placeholder="Байгууллагын нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              key="companyRegister"
              type="text"
              label="Байгууллагын регистрийн дугаар"
              labelPlacement="outside"
              placeholder="Байгууллагын регистрийн дугаар"
              radius="sm"
              size="lg"
              variant="bordered"
              classNames={{
                label: "font-bold",
                inputWrapper: ["custom-input-wrapper", "bg-white"],
              }}
            />
            <Input
              key="courseComp"
              type="text"
              label="Сургалтын байгууллага"
              labelPlacement="outside"
              placeholder="Сургалтын байгууллага"
              radius="sm"
              size="lg"
              variant="bordered"
              classNames={{
                label: "font-bold",
                inputWrapper: ["custom-input-wrapper", "bg-white"],
              }}
            />
          </div>
        </div>
      </div>
      <Textarea
        variant="bordered"
        label="Байгууллагын  танилцуулга ба ажлын туршлага"
        labelPlacement="outside"
        radius="sm"
        minRows={5}
        placeholder="Байгууллагын  танилцуулга ба ажлын туршлага"
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

export default Confirmation;
