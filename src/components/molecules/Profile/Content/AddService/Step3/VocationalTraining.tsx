import React from 'react';
import { Input, Textarea } from '@heroui/react';
import AdvImageUpload from '../AdvImageUpload';
import { CreateAdvertisement } from '@typeDefs/advertisement';
interface IProps {
  adData: CreateAdvertisement;
  setAdData: React.Dispatch<React.SetStateAction<CreateAdvertisement>>;
}
const VocationalTraining: React.FC<IProps> = ({ adData, setAdData }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
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
            setAdData((prevState: CreateAdvertisement) => ({
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
          setAdData((prevState: CreateAdvertisement) => ({
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
            setAdData((prevState: CreateAdvertisement) => ({
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
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              phone: e,
            }));
          }}
        />
      </div>
    </>
  );
};

export default VocationalTraining;
