'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd, IMachineryParam } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import CustomSelect from '@/components/Inputs/Select';
import { MachineryType } from '@/types/reference';
import { useEffect } from 'react';
import AdvImageUpload from '../AdvImageUpload';
interface IProps {
  adData: ICreateAd;
  materials: MachineryType[];
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
  getMachinery: React.Dispatch<React.SetStateAction<IMachineryParam>>;
}
//Ханган нийлүүлэгч
const Supplier: React.FC<IProps> = ({ adData, materials, setAdData, getMachinery }) => {
  useEffect(() => {
    getMachinery({ type: 'MATERIAL' });
  }, []);
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
      Supplier Ханган нийлүүлэгч
      <div className="grid grid-cols-3 gap-4">
        <CustomSelect
          label="Тоног төхөөрөмж"
          value={adData?.materialId}
          onSelectionChange={value => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              materialId: Number(value),
            }));
          }}
          options={materials.map(item => ({ value: item.id, label: item.name }))}
        />
        <Input
          key="productName"
          type="text"
          label="Бүтээгдэхүүний нэр"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.productName}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              productName: e,
            }));
          }}
        />
        <Input
          key="unitAmount"
          type="number"
          label="Нэгжийн үнэ"
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
          label="Багцын үнэ"
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
        label="Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл"
        labelPlacement="outside"
        radius="sm"
        placeholder="Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл"
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

export default Supplier;
