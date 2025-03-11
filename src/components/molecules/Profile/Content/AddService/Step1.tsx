'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefDirection, SpecialServiceType, SubDirection, UserType } from '@typeDefs/reference';
import ReferenceService from '@services/reference';
import UserTabData from '@datas/UserTabData';
import CustomSelect from '@components/molecules/Inputs/Select';
import SpecialServiceData from '@datas/SpecialServiceData';
import { useTranslations } from 'next-intl';
interface IProps {
  isSpecial: boolean;
  adData: any;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
const Step1: React.FC<IProps> = ({ isSpecial, adData, setAdData }) => {
  const t = useTranslations();
  const mainDirections = [];
  const [directions, setDirections] = useState<RefDirection[]>([]);
  const [subDirections, setSubDirections] = useState<SubDirection[]>([]);

  useEffect(() => {
    ReferenceService.getDirection({
      mainDirectionId: adData.mainDirectionId,
      specialServices: [adData.specialService],
      userType: adData.userType,
    }).then(response => {
      if (response.success) {
        setDirections(response.response);
      }
    });
  }, [adData.mainDirectionId, adData.specialService, adData.userType]);

  useEffect(() => {
    ReferenceService.getSubDirection({
      directionId: adData.directionId,
      userType: adData.userType,
    }).then(response => {
      if (response.success) {
        setSubDirections(response.response);
      }
    });
  }, [adData.directionId, adData.userType]);

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
      {isSpecial ? (
        <CustomSelect
          label="Онцгой үйлчилгээ"
          value={adData?.specialService}
          onSelectionChange={value => {
            setAdData((prevState: any) => ({
              ...prevState,
              specialService: value as SpecialServiceType,
            }));
          }}
          options={SpecialServiceData.map(item => ({ value: item.type, label: t(item.title) }))}
        />
      ) : (
        <>
          <CustomSelect
            label="Хэрэглэгчийн төрөл"
            value={adData?.userType}
            onSelectionChange={value => {
              setAdData((prevState: any) => ({
                ...prevState,
                userType: value as UserType,
              }));
            }}
            options={UserTabData.map(item => ({ value: item.type, label: t(item.title) }))}
          />
          <CustomSelect
            label="Үйл ажиллагааны үндсэн чиглэл"
            value={adData.mainDirectionId}
            onSelectionChange={value => {
              setAdData((adData: any) => ({
                ...adData,
                mainDirectionId: Number(value),
              }));
            }}
            options={mainDirections.map(item => ({ value: item.id, label: item.name }))}
          />
        </>
      )}
      <CustomSelect
        label="Үйл ажиллагааны чиглэл"
        value={adData?.directionId}
        onSelectionChange={value => {
          setAdData((adData: any) => ({
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
          setAdData((adData: any) => ({
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
