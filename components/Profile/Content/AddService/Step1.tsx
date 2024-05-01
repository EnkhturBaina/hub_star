'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/app-context';
import {
  RefDirection,
  SubDirection,
  UserType,
} from '@/types/reference';
import { ICreateAd } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import UserTabData from '@/app/data/UserTabData';
import CustomSelect from '@/components/Inputs/Select';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step1: React.FC<IProps> = ({ adData, setAdData }) => {
  const { mainDirections } = useAppContext();
  const [directions, setDirections] = useState<RefDirection[]>([]);
  const [subDirections, setSubDirections] = useState<SubDirection[]>([]);

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
      <CustomSelect
        label="Хэрэглэгчийн төрөл"
        value={adData?.userType?.toString()}
        onSelectionChange={value => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            userType: value as UserType,
          }));
        }}
        options={UserTabData.map(item => ({ value: item.type, label: item.title }))}
      />
      <CustomSelect
        label="Үйл ажиллагааны үндсэн чиглэл"
        value={adData.mainDirectionId}
        onSelectionChange={value => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            mainDirectionId: Number(value),
          }));
        }}
        options={mainDirections.map(item => ({ value: item.id, label: item.name }))}
      />
      <CustomSelect
        label="Үйл ажиллагааны чиглэл"
        value={adData?.directionId}
        onSelectionChange={value => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            directionId: Number(value),
          }));
        }}
        options={directions.map(item => ({ value: item.id, label: item.name }))}
      />
      <CustomSelect
        label="Үйл ажиллагааны нэр"
        value={adData?.subDirectionId}
        onSelectionChange={value => {
          setAdData((adData: ICreateAd) => ({
            ...adData,
            subDirectionId: Number(value),
          }));
        }}
        options={subDirections.map(item => ({ value: item.id, label: item.name }))}
      />
    </motion.div>
  );
};

export default Step1;
