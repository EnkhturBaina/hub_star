"use client";

import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/react";
import { CreateAdType } from "@/types/createAd";
import React, { useContext, useState } from "react";
import MainContext from "@/app/context/MainContext";
import { Direction } from "@/types/directions";

interface Step1Props {
  adData: CreateAdType;
  setCreateAd: React.Dispatch<React.SetStateAction<any>>;
}

const Step1: React.FC<Step1Props> = ({ setCreateAd }) => {
  const state = useContext(MainContext);
  const [direction, setDirection] = useState<Direction[]>([]);
  const [subDirection, setSubDirection] = useState<string[]>([]);

  if (!state?.custTypeData) return null;
  const changeCustType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      categoryId: e.target.value,
    }));
  };

  const changeMainDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      mainDirectionId: e.target.value,
    }));

    state?.mainDirection?.filter((val: any) => {
      if (val.id == e.target.value) {
        setDirection(val.children);
      }
    });
  };

  const changeDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      directionId: e.target.value,
    }));

    direction?.filter((val: any) => {
      if (val.id == e.target.value) {
        setSubDirection(val.sub_children);
      }
    });
  };

  const changeSubDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateAd((prevState: CreateAdType) => ({
      ...prevState,
      subDirectionId: e.target.value,
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
        onChange={changeCustType}
      >
        {state?.custTypeData?.map((data: any, index: number) => (
          <SelectItem key={index} value={data.id}>
            {data.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Үйл ажиллагааны үндсэн чиглэл"
        labelPlacement="outside"
        placeholder="Сонгох"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          trigger: "custom-select-trigger bg-white",
        }}
        onChange={changeMainDirection}
      >
        {state?.mainDirection?.map((data: any) => (
          <SelectItem key={data?.id} value={data.id}>
            {data.name}
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
        onChange={changeDirection}
      >
        {direction?.map((data: any) => (
          <SelectItem key={data?.id} value={data.id}>
            {data.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Үйл ажиллагааны нэр"
        labelPlacement="outside"
        placeholder="Сонгох"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          trigger: "custom-select-trigger bg-white",
        }}
        onChange={changeSubDirection}
      >
        {subDirection?.map((data: any) => (
          <SelectItem key={data?.id} value={data.id}>
            {data.name}
          </SelectItem>
        ))}
      </Select>
    </motion.div>
  );
};

export default Step1;
