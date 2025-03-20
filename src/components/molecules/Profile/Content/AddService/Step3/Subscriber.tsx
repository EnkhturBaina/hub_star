import React from 'react';
import { Input, Textarea } from '@heroui/react';
import AdvImageUpload from '../AdvImageUpload';
import { CreateAdvertisement } from '@typeDefs/advertisement';

interface IProps {
  adData: CreateAdvertisement;
  setAdData: React.Dispatch<React.SetStateAction<CreateAdvertisement>>;
}
//Захиалагч
const Subscriber: React.FC<IProps> = ({ adData, setAdData }) => {
  const handleChange =
    (prop: keyof CreateAdvertisement) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAdData({ ...adData, [prop]: event.target.value });
    };
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          key="measurement"
          type="text"
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
          value={adData?.measurement}
          onValueChange={e => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              measurement: e,
            }));
          }}
        />
        <Input
          key="counter"
          type="number"
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
          onChange={handleChange('counter')}
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
          onChange={handleChange('email')}
        />
        <Input
          key="phone"
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
    </>
  );
};

export default Subscriber;
