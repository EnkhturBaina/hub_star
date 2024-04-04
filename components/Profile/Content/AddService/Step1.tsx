'use client';

import { motion } from 'framer-motion';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/utils/context/app-context';
import { Category, Direction, MainDirection, SubDirection } from '@/types/reference';
import { ICreateAd } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step1: React.FC<IProps> = ({ adData, setAdData }) => {
  const { categories, mainDirections } = useAppContext();
  const [directions, setDirections] = useState<Direction[]>([]);
  const [subDirections, setSubDirections] = useState<SubDirection[]>([]);

  if (!categories) return null;

  useEffect(() => {
    ReferenceService.getDirection({
      mainDirectionId: adData.mainDirectionId,
    }).then(response => {
      if (response.success) {
        setDirections(response.response);
      }
    });
  }, [adData.mainDirectionId]);

  useEffect(() => {
    ReferenceService.getSubDirection({ directionId: adData.directionId }).then(response => {
      if (response.success) {
        setSubDirections(response.response);
      }
    });
  }, [adData.directionId]);

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
          label: 'font-bold',
          trigger: 'custom-select-trigger bg-white',
        }}
        value={adData?.categoryId?.toString()}
        onChange={e => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            categoryId: parseInt(e.target.value),
          }));
        }}
      >
        {categories?.map((data: Category, index: number) => (
          <SelectItem key={data.id} value={data.id}>
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
          label: 'font-bold',
          trigger: 'custom-select-trigger bg-white',
        }}
        onChange={e => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            mainDirectionId: parseInt(e.target.value),
          }));
        }}
        value={adData?.mainDirectionId?.toString()}
      >
        {mainDirections.map((data: MainDirection) => (
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
          label: 'font-bold',
          trigger: 'custom-select-trigger bg-white',
        }}
        value={adData?.directionId?.toString()}
        onChange={e => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            directionId: parseInt(e.target.value),
          }));
        }}
      >
        {directions.map((data: Direction) => (
          <SelectItem key={data.id} value={data.id}>
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
          label: 'font-bold',
          trigger: 'custom-select-trigger bg-white',
        }}
        value={adData?.subDirectionId?.toString()}
        onChange={e => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            subDirectionId: parseInt(e.target.value),
          }));
        }}
      >
        {subDirections.map((data: SubDirection) => (
          <SelectItem key={data.id} value={data.id}>
            {data.name}
          </SelectItem>
        ))}
      </Select>
    </motion.div>
  );
};

export default Step1;
