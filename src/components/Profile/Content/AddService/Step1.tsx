'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/app-context';
import { RefDirection, SpecialServiceType, SubDirection, UserType } from '@/types/reference';
import { ICreateAd } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import UserTabData from '@/data/UserTabData';
import CustomSelect from '@/components/Inputs/Select';
import SpecialServiceData from '@/data/SpecialServiceData';
interface IProps {
  isSpecial: boolean;
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step1: React.FC<IProps> = ({ isSpecial, adData, setAdData }) => {
  const { t } = useTranslation();
  const { mainDirections } = useAppContext();
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
            setAdData((prevState: ICreateAd) => ({
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
              setAdData((prevState: ICreateAd) => ({
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
              setAdData((adData: ICreateAd) => ({
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
