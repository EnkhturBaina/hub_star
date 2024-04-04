'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step3: React.FC<IProps> = ({ adData, setAdData }) => {
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
          key="negj"
          inputMode="text"
          label="Хэмжих нэгж"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
        />
        <Input
          key="too"
          inputMode="numeric"
          label="Ажлын тоо хэмжээ"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.counter && adData.counter.toString()}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              counter: parseInt(e),
            }));
          }}
        />
      </div>
      <span className="font-bold">Зураг оруулах</span>
      <div className="grid grid-cols-3 gap-4">
        {adData.imageIds.map((item, index) => {
          return (
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${item}`}
              alt="Зарын зураг"
              width={160}
              height={160}
              className='flex h-40 cursor-pointer items-center justify-center rounded-lg bg-mainGray'
            />
          );
        })}
        <ImageUpload
          className="flex h-40 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
          setFileId={fileId =>
            setAdData(previousValue => ({
              ...previousValue,
              imageIds: [...previousValue.imageIds, fileId],
            }))
          }
        >
          <BsImage className="text-2xl text-gray-500" />
        </ImageUpload>
      </div>
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
          value={String(adData?.isMessenger)}
          classNames={{
            base: 'w-full',
            label: 'w-full',
            wrapper: 'custom-checkbox w-6 h-6',
          }}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              isMessenger: e,
            }));
          }}
        >
          Мессэнжер нээх
        </Checkbox>
        <Checkbox
          value={String(adData?.isTermOfService)}
          classNames={{
            base: 'w-full',
            label: 'w-full',
            wrapper: 'custom-checkbox w-6 h-6',
          }}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              isTermOfService: e,
            }));
          }}
        >
          Үйлчилгээний нөхцөл зөвшөөрөх
        </Checkbox>
      </div>
    </motion.div>
  );
};

export default Step3;
