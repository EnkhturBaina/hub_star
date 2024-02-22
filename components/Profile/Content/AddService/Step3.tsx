"use client";

import { motion } from "framer-motion";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Progress } from "semantic-ui-react";
import { BsImage } from "react-icons/bs";

const Step3 = () => {
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          key="negj"
          type="text"
          label="Хэмжих нэгж"
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
        <Input
          key="too"
          type="text"
          label="Ажлын тоо хэмжээ"
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
      <span className="font-bold">Зураг оруулах</span>
      <div className="grid grid-cols-3 gap-4">
        {[...new Array(6)].map((element, i) => {
          return (
            <div
              className="flex h-40 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
              key={i}
            >
              <BsImage className="text-2xl text-gray-500" />
            </div>
          );
        })}
      </div>
      <Textarea
        variant="bordered"
        label="Тайлбар"
        labelPlacement="outside"
        radius="sm"
        placeholder="Тайлбар"
        classNames={{
          base: "w-full",
          label: "font-bold",
          inputWrapper: ["custom-input-wrapper", "bg-white"],
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          key="email"
          type="email"
          label="Имэйл"
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
        <Input
          key="utas"
          type="text"
          label="Утас"
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
      <CheckboxGroup
        label=""
        defaultValue={["buenos-aires", "london"]}
        color="warning"
        className="my-4"
      >
        <Checkbox
          value="buenos-aires"
          classNames={{
            base: "w-full",
            label: "w-full",
            wrapper: "custom-checkbox w-6 h-6",
          }}
        >
          Мессэнжер нээх
        </Checkbox>
        <Checkbox
          value="buenos-aires"
          classNames={{
            base: "w-full",
            label: "w-full",
            wrapper: "custom-checkbox w-6 h-6",
          }}
        >
          Үйлчилгээний нөхцөл зөвшөөрөх
        </Checkbox>
      </CheckboxGroup>
    </motion.div>
  );
};

export default Step3;
