'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReferenceService from '@services/reference';
import UserTabData from '@datas/UserTabData';
import SpecialServiceData from '@datas/SpecialServiceData';
import { useTranslations } from 'next-intl';
import SelectField from '@components/atoms/selectField';
import { useRouter } from 'next/router';
import IApiResponse from '@typeDefs/response';
import { CreateAdvertisement } from '@typeDefs/advertisement';
interface IProps {
  isSpecial: boolean;
  adData: CreateAdvertisement;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
const Step1: React.FC<IProps> = ({ isSpecial, adData, setAdData }) => {
  const t = useTranslations();
  const router = useRouter();
  const [mainDirections, setMainDirections] = useState([]);
  const [directions, setDirections] = useState([]);
  const [subDirections, setSubDirections] = useState([]);

  useEffect(() => {
    const loadMainDirection = async () => {
      if (!adData.userType) return;
      try {
        const result: IApiResponse = await ReferenceService.getMainDirection({
          lang: router.locale,
          userType: adData.userType,
        });
        if (result.success) {
          setMainDirections(result.response);
        }
      } catch (error) {
        console.log('noop main directions =>', error);
      }
    };
    loadMainDirection();
  }, [adData.userType]);

  useEffect(() => {
    const loadDirection = async () => {
      try {
        if (adData.mainDirectionId || adData.specialService) {
          const result: IApiResponse = await ReferenceService.getDirection({
            mainDirectionId: adData.mainDirectionId,
            specialService: adData.specialService,
            userType: adData.userType,
          });
          if (result.success) {
            setDirections(result.response);
          }
        }
      } catch (error) {
        console.log('noop directions =>', error);
      }
    };
    loadDirection();
  }, [adData.mainDirectionId, adData.specialService]);

  useEffect(() => {
    const loadSubDirection = async () => {
      if (!adData.directionId) return;
      try {
        const result = await ReferenceService.getSubDirection({
          directionId: adData.directionId,
          userType: adData.userType,
        });
        if (result.success) {
          setSubDirections(result.response);
        }
      } catch (error) {
        console.log('noop sub directions =>', error);
      }
    };
    loadSubDirection();
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
      {isSpecial ? (
        <SelectField
          label="Онцгой үйлчилгээ"
          options={SpecialServiceData.map(item => ({ value: item.type, label: t(item.title) }))}
          onChange={value => setAdData(prevState => ({ ...prevState, specialService: value }))}
        />
      ) : (
        <>
          <SelectField
            label="Хэрэглэгчийн төрөл"
            options={UserTabData.map(item => ({ value: item.type, label: t(item.title) }))}
            onChange={value => setAdData(prevState => ({ ...prevState, userType: value }))}
          />
          <SelectField
            label="Үйл ажиллагааны үндсэн чиглэл"
            options={mainDirections.map(item => ({ value: item.id, label: item.name }))}
            onChange={value => setAdData(prevState => ({ ...prevState, mainDirectionId: value }))}
          />
        </>
      )}
      <SelectField
        label="Үйл ажиллагааны чиглэл"
        options={directions.map(item => ({ value: item.id, label: item.name }))}
        onChange={value => setAdData(prevState => ({ ...prevState, directionId: value }))}
      />

      <SelectField
        label="Үйл ажиллагааны нэр"
        value={adData?.subDirectionId}
        onChange={value => {
          setAdData((adData: any) => ({
            ...adData,
            subDirectionId: value,
          }));
        }}
        options={subDirections.map(item => ({ value: item.id, label: item.name }))}
      />
    </motion.div>
  );
};

export default Step1;
