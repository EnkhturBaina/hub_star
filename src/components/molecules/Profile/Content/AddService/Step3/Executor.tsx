import React from 'react';
import { Input, Textarea } from '@heroui/react';
import AdvImageUpload from '../AdvImageUpload';
import { CreateAdvertisement } from '@typeDefs/advertisement';
interface IProps {
  adData: CreateAdvertisement;
  setAdData: React.Dispatch<React.SetStateAction<CreateAdvertisement>>;
}
//Гүйцэтгэгч
const Executor: React.FC<IProps> = ({ adData, setAdData }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          key="workerCount"
          inputMode="text"
          label="Ажилчдын тоо"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.workerCount && adData.workerCount.toString()}
          onValueChange={e => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              workerCount: parseInt(e),
            }));
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
          value={adData?.counter?.toString()}
          onValueChange={e => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              counter: parseInt(e),
            }));
          }}
        />
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
          value={String(adData.price)}
          onValueChange={e => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              price: parseInt(e),
            }));
          }}
        />
      </div>
      <AdvImageUpload adData={adData} setAdData={setAdData} />
      <Textarea
        variant="bordered"
        label="Тайлбар ба ажлын туршлага"
        labelPlacement="outside"
        radius="sm"
        placeholder="Тайлбар ба ажлын туршлага"
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

export default Executor;
