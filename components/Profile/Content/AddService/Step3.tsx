"use client";

import { motion } from "framer-motion";
import { Checkbox, Input, Textarea } from "@nextui-org/react";
import { BsImage } from "react-icons/bs";
import { CreateAdType } from "@/types/createAd";

const Step3 = ({ adData, setCreateAd }) => {
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
          value={adData?.counter}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              counter: e,
            }));
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
        value={adData?.desciption}
        onValueChange={(e) => {
          setCreateAd((prevState: CreateAdType) => ({
            ...prevState,
            desciption: e,
          }));
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
          value={adData?.email}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              email: e,
            }));
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
          value={adData?.phone}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              phone: e,
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Checkbox
          value={adData?.isMessenger}
          classNames={{
            base: "w-full",
            label: "w-full",
            wrapper: "custom-checkbox w-6 h-6",
          }}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              isMessenger: e,
            }));
          }}
        >
          Мессэнжер нээх
        </Checkbox>
        <Checkbox
          value={adData?.isTermOfService}
          classNames={{
            base: "w-full",
            label: "w-full",
            wrapper: "custom-checkbox w-6 h-6",
          }}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              isTermOfService: e,
            }));
          }}
        >
          Үйлчилгээний нөхцөл зөвшөөрөх
        </Checkbox>
      </div>
    </motion.div>
  );
};

export default Step3;
