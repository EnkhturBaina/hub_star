'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import AdvImageUpload from '../AdvImageUpload';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const ConsultingService: React.FC<IProps> = ({ adData, setAdData }) => {
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          key="unitAmount"
          inputMode="numeric"
          label="Үйлчилгээний үнэ"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.unitAmount?.toString()}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              unitAmount: parseInt(e),
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

export default ConsultingService;
