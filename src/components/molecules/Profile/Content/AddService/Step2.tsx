'use client';

import { motion } from 'framer-motion';
import { Input, Textarea } from '@heroui/react';
import { useEffect, useState } from 'react';
import { IAddressParam, ICreateAd } from '@/interfaces/request.interface';
import { Address } from '@typeDefs/reference';
import ReferenceService from '@services/reference';
import CustomSelect from '@components/molecules/Inputs/Select';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step2: React.FC<IProps> = ({ adData, setAdData }) => {
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);

  const changeAimag = (e: React.ChangeEvent<HTMLSelectElement>) => {};
  const changeDuureg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdData((prevState: ICreateAd) => ({
      ...prevState,
      districtId: parseInt(e.target.value),
    }));
  };
  const changeKhoroo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdData((prevState: ICreateAd) => ({
      ...prevState,
      khorooId: parseInt(e.target.value),
    }));
  };
  const getAddress = (params: IAddressParam) => {
    ReferenceService.getAddress(params).then(response => {
      if (response.success) {
        params.type == 'PROVINCE' && setProvinces(response.response);
        params.type == 'DISTRICT' && setDistricts(response.response);
        params.type == 'KHOROO' && setKhoroos(response.response);
      }
    });
  };
  useEffect(() => {
    getAddress({ type: 'PROVINCE' });
  }, []);
  useEffect(() => {
    if (adData.provinceId) {
      getAddress({ type: 'DISTRICT', parentId: adData.provinceId });
    }
  }, [adData.provinceId]);
  useEffect(() => {
    if (adData.districtId) {
      getAddress({ type: 'KHOROO', parentId: adData.districtId });
    }
  }, [adData.districtId]);

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
      <div
        className={`grid ${adData?.userType == 'SUBSCRIBER' ? 'grid-cols-1' : 'md:grid-cols-2 grid-cols-1'} gap-4`}
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
          className="w-full"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.title ?? ''}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              title: e,
            }));
          }}
        />
        {adData?.userType == 'SUBSCRIBER' ? (
          <Input
            key="price"
            type="number"
            label="Үнэ"
            labelPlacement="outside"
            placeholder="--"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={String(adData.price) ?? ''}
            onValueChange={e => {
              setAdData((prevState: ICreateAd) => ({
                ...prevState,
                price: parseInt(e),
              }));
            }}
          />
        ) : null}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        <CustomSelect
          label="Аймаг, Хот"
          value={adData?.provinceId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              provinceId: Number(value),
            }));
          }}
          options={provinces.map(item => ({ value: item.id, label: item.name }))}
        />
        <CustomSelect
          label="Сум, Дүүрэг"
          value={adData?.districtId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              districtId: Number(value),
            }));
          }}
          options={districts.map(item => ({ value: item.id, label: item.name }))}
        />
        <CustomSelect
          label="Баг, Хороо"
          value={adData?.khorooId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              khorooId: Number(value),
            }));
          }}
          options={khoroos.map(item => ({ value: item.id, label: item.name }))}
        />
      </div>
      <Textarea
        variant="bordered"
        label="Байршил"
        labelPlacement="outside"
        radius="sm"
        placeholder="Байршил"
        classNames={{
          base: 'w-full',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={adData?.address ?? ''}
        onValueChange={e => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            address: e,
          }));
        }}
      />
    </motion.div>
  );
};

export default Step2;
