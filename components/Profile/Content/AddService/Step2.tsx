"use client";

import { motion } from "framer-motion";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { animals } from "../animals";
import { AddressType } from "@/types/addressType";
import { useState } from "react";
import { CreateAdType } from "@/types/createAd";

const Step2 = ({ adData, addressData, setCreateAd }) => {
  const [duureg, setDuureg] = useState<AddressType[]>([]);
  const [khoroo, setKhoroo] = useState<AddressType[]>([]);

  const changeAimag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuureg([]);
    setKhoroo([]);

    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      provinceId: e.target.value,
    }));

    addressData?.filter((val: any) => {
      if (val.parentId == e.target.value) {
        setDuureg((duureg) => [...duureg, val]);
      }
    });
  };
  const changeDuureg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKhoroo([]);
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      districtId: e.target.value,
    }));

    addressData?.filter((val: any) => {
      if (val.parentId == e.target.value) {
        setKhoroo((khoroo) => [...khoroo, val]);
      }
    });
  };
  const changeKhoroo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      khorooId: e.target.value,
    }));
  };

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
        value={adData?.title}
        onValueChange={(e) => {
          setCreateAd((prevState: CreateAdType) => ({
            ...prevState,
            title: e,
          }));
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
          value={adData?.price}
          onValueChange={(e) => {
            setCreateAd((prevState: CreateAdType) => ({
              ...prevState,
              price: e,
            }));
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
          selectedKeys={adData?.provinceId}
          onChange={changeAimag}
        >
          {addressData
            ?.filter((val: any) => val.parentId == null)
            ?.map((data: AddressType, index: number) => (
              <SelectItem key={data.id} value={data.id}>
                {data.name}
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
          selectedKeys={adData?.districtId}
          onChange={changeDuureg}
        >
          {duureg?.map((data: AddressType, index: number) => (
            <SelectItem key={data.id} value={data.id}>
              {data.name}
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
          selectedKeys={adData?.khorooId}
          onChange={changeKhoroo}
        >
          {khoroo?.map((data: AddressType, index: number) => (
            <SelectItem key={data.id} value={data.id}>
              {data.name}
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
        value={adData?.address}
        onValueChange={(e) => {
          setCreateAd((prevState: CreateAdType) => ({
            ...prevState,
            address: e,
          }));
        }}
      />
    </motion.div>
  );
};

export default Step2;
