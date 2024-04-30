'use client';

import { motion } from 'framer-motion';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/app-context';
import { Category, RefDirection, MainDirection, SubDirection, UserTab } from '@/types/reference';
import { ICreateAd } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import UserTabData from '@/app/data/UserTabData';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step1: React.FC<IProps> = ({ adData, setAdData }) => {
  const { categories, mainDirections } = useAppContext();
  const [directions, setDirections] = useState<RefDirection[]>([]);
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
      <Autocomplete
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
        value={adData?.userType?.toString()}
        onChange={e => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            userType: e.target.value,
          }));
        }}
      >
        {UserTabData?.map((data: UserTab, index: number) => (
          <AutocompleteItem key={data.type} value={data.type}>
            {data.title}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
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
          <AutocompleteItem key={data?.id} value={data.id}>
            {data.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Autocomplete
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
        {directions.map((data: RefDirection) => (
          <AutocompleteItem key={data.id} value={data.id}>
            {data.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
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
          <AutocompleteItem key={data.id} value={data.id}>
            {data.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </motion.div>
  );
};

export default Step1;
