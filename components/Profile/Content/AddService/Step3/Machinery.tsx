'use client';

import { motion } from 'framer-motion';
import { Checkbox, Input, Textarea, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { BsImage } from 'react-icons/bs';
import { ICreateAd, IMachineryParam } from '@/interfaces/request.interface';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import UserTabData from '@/app/data/UserTabData';
import { MachineryType, UserTab } from '@/types/reference';
import { useEffect } from 'react';
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
        <Autocomplete
          label="Машин механизмийн төрөл"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.machineryTypeId?.toString()}
          onChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              machineryTypeId: parseInt(e.target.value),
            }));
          }}
        >
          {machineryType?.map((data: MachineryType, index: number) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Autocomplete
          label="Марк"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.markId?.toString()}
          onChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              markId: parseInt(e.target.value),
            }));
          }}
        >
          {markData?.map((data: MachineryType, index: number) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Загвар"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.modelId?.toString()}
          onChange={handleChange('modelId')}
        >
          {modelData?.map((data: MachineryType, index: number) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Хүчин чадал"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.powerId?.toString()}
          onChange={handleChange('powerId')}
        >
          {powerData?.map((data: MachineryType, index: number) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
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
      <span className="font-bold">Зураг оруулах</span>
      <div className="grid grid-cols-3 gap-4">
        {adData.imageIds.map((item, index) => {
          return (
            <Image
              key={index}
              src={process.env.NEXT_PUBLIC_MEDIA_URL + item}
              alt="Зарын зураг"
              width={160}
              height={160}
              className="flex h-40 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
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
