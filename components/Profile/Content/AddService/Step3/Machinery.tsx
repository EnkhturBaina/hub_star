'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd, IMachineryParam } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import { MachineryType } from '@/types/reference';
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
  modelData: MachineryType[];
}
//Машин механизм
const Machinery: React.FC<IProps> = ({
  adData,
  setAdData,
  getMachinery,
  machineryType,
  markData,
  powerData,
  modelData,
}) => {
  const handleChange =
    (prop: keyof ICreateAd) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAdData({ ...adData, [prop]: event.target.value });
    };
  useEffect(() => {
    getMachinery({ type: 'MACHINERY_TYPE', id: undefined });
    getMachinery({ type: 'MARK', id: undefined });
    getMachinery({ type: 'POWER', id: undefined });
  }, []);

  useEffect(() => {
    if (adData.markId) {
      getMachinery({ type: 'MODEL', parentId: adData.markId });
    }
  }, [adData.markId]);

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
      Machinery Машин механизм
      <div className="grid grid-cols-1 gap-4">
        <CustomSelect
          label="Машин механизмийн төрөл"
          value={adData?.machineryTypeId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              machineryTypeId: Number(value),
            }));
          }}
          options={machineryType.map(item => ({ value: item.id, label: item.name }))}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
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
          label="Загвар"
          value={adData?.modelId?.toString()}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              modelId: Number(value),
            }));
          }}
          options={modelData.map(item => ({ value: item.id, label: item.name }))}
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
      </div>
      <div className="grid grid-cols-2 gap-4">
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
          onChange={handleChange('unitAmount')}
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
          onChange={handleChange('packageAmount')}
        />
        <Input
          key="fromAddress"
          type="text"
          label="Хаанаас"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.fromAddress}
          onChange={handleChange('fromAddress')}
        />
        <Input
          key="toAddress"
          type="text"
          label="Хаашаа"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.toAddress}
          onChange={handleChange('toAddress')}
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
        onChange={handleChange('desciption')}
      />
      <div className="grid grid-cols-2 gap-4">
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
          onChange={handleChange('email')}
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
          onChange={handleChange('phone')}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Checkbox
          isSelected={adData?.isMessenger}
          classNames={{
            base: 'w-full',
            label: 'w-full',
            wrapper: 'custom-checkbox w-6 h-6',
          }}
          onValueChange={isMessenger => setAdData({ ...adData, isMessenger })}
        >
          Мессэнжер нээх
        </Checkbox>
        <Checkbox
          isSelected={adData?.isTermOfService}
          classNames={{
            base: 'w-full',
            label: 'w-full',
            wrapper: 'custom-checkbox w-6 h-6',
          }}
          onValueChange={isTermOfService => setAdData({ ...adData, isTermOfService })}
        >
          Үйлчилгээний нөхцөл зөвшөөрөх
        </Checkbox>
      </div>
    </motion.div>
  );
};

export default Machinery;
