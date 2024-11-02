'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd, IMachineryParam } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import UserTabData from '@/app/data/UserTabData';
import { MachineryType, UserTab } from '@/types/reference';
import { useEffect } from 'react';
import CustomSelect from '@/components/Inputs/Select';
import AdvImageUpload from '../AdvImageUpload';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
  getMachinery: React.Dispatch<React.SetStateAction<IMachineryParam>>;
  machineryType: MachineryType[];
  powerData: MachineryType[];
  markData: MachineryType[];
}
//Тээвэр
const Transportation: React.FC<IProps> = ({
  adData,
  setAdData,
  getMachinery,
  machineryType,
  markData,
  powerData,
}) => {
  const handleChange =
    (prop: keyof ICreateAd) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAdData({ ...adData, [prop]: event.target.value });
    };
  useEffect(() => {
    getMachinery({ type: 'MACHINERY_TYPE' });
    getMachinery({ type: 'MARK' });
    getMachinery({ type: 'POWER' });
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <CustomSelect
          label="Тээврийн төрөл"
          value={adData?.machineryTypeId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              machineryTypeId: Number(value),
            }));
          }}
          options={machineryType.map(item => ({ value: item.id, label: item.name }))}
        />
        <CustomSelect
          label="Марк"
          value={adData?.markId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              markId: Number(value),
            }));
          }}
          options={markData.map(item => ({ value: item.id, label: item.name }))}
        />
        <CustomSelect
          label="Хүчин чадал"
          value={adData?.powerId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              powerId: Number(value),
            }));
          }}
          options={powerData.map(item => ({ value: item.id, label: item.name }))}
        />

        <Input
          key="unitAmount"
          type="number"
          label="Нэгж үнэлгээ.цаг"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={String(adData.unitAmount)}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              unitAmount: parseInt(e),
            }));
          }}
        />
        <Input
          key="packageAmount"
          type="number"
          label="Багц үнэлгээ.өдөр"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={String(adData.packageAmount)}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              packageAmount: parseInt(e),
            }));
          }}
        />
      </div>
      <AdvImageUpload adData={adData} setAdData={setAdData} />
      <Textarea
        variant="bordered"
        label="Тайлбар"
        labelPlacement="outside"
        radius="sm"
        placeholder="Тайлбар"
        classNames={{
          base: 'w-full',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={adData?.desciption}
        onValueChange={e => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            desciption: e,
          }));
        }}
      />
      <div className="grid md:grid-cols-2 gap-4">
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
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.email}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
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
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.phone}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              phone: e,
            }));
          }}
        />
      </div>
    </>
  );
};

export default Transportation;
