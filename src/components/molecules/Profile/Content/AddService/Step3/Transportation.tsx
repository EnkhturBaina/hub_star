import React, { useState } from 'react';
import { Input, Textarea } from '@heroui/react';
import { CreateAdvertisement } from '@typeDefs/advertisement';
import { RefMachineryType } from '@typeDefs/reference';
import { useEffect } from 'react';
import AdvImageUpload from '../AdvImageUpload';
import SelectField from '@components/atoms/selectField';
import NumberField from '@components/atoms/numberField';
import IApiResponse from '@typeDefs/response';
import ReferenceService from '@services/reference';
interface IProps {
  adData: CreateAdvertisement;
  setAdData: React.Dispatch<React.SetStateAction<CreateAdvertisement>>;
}
//Тээвэр
const Transportation: React.FC<IProps> = ({ adData, setAdData }) => {
  const [machineryTypes, setMachineryTypes] = useState([]);
  const [powers, setPowers] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const loadMachinery = async (type: RefMachineryType) => {
      try {
        const result: IApiResponse = await ReferenceService.getMachinery({ type });
        if (result.success) {
          if (type == 'MACHINERY_TYPE') setMachineryTypes(result.response);
          if (type == 'POWER') setPowers(result.response);
          if (type == 'MARK') setMarks(result.response);
        }
      } catch (error) {
        console.log('noop machinery =>', error);
      }
    };
    loadMachinery('MACHINERY_TYPE');
    loadMachinery('POWER');
    loadMachinery('MARK');
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <SelectField
          label="Тээврийн төрөл"
          value={adData?.machineryTypeId}
          onChange={value => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              machineryTypeId: parseInt(value),
            }));
          }}
          options={machineryTypes.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Марк"
          value={adData?.markId}
          onChange={value => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              markId: parseInt(value),
            }));
          }}
          options={marks.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Хүчин чадал"
          value={adData?.powerId?.toString()}
          onChange={value => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              powerId: parseInt(value),
            }));
          }}
          options={powers.map(item => ({ value: item.id, label: item.name }))}
        />

        <NumberField
          label="Нэгж үнэлгээ.цаг"
          placeholder="--"
          value={adData.unitAmount}
          onChange={value => {
            setAdData((prevState: CreateAdvertisement) => ({
              ...prevState,
              unitAmount: value,
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
            setAdData((prevState: CreateAdvertisement) => ({
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

export default Transportation;
