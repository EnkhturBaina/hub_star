import React, { useEffect, useState } from 'react';
import { Input, Textarea } from '@heroui/react';
import AdvImageUpload from '../AdvImageUpload';
import SelectField from '@components/atoms/selectField';
import TextField from '@components/atoms/textField';
import NumberField from '@components/atoms/numberField';
import ReferenceService from '@services/reference';
import IApiResponse from '@typeDefs/response';
interface IProps {
  adData: any;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
//Ханган нийлүүлэгч
const Supplier: React.FC<IProps> = ({ adData, setAdData }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const result: IApiResponse = await ReferenceService.getMachinery({ type: 'MATERIAL' });
        if (result.success) {
          setMaterials(result.response);
        }
      } catch (error) {
        console.log('noop machinery =>', error);
      }
    };
    loadMaterials();
  }, []);
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <SelectField
          label="Тоног төхөөрөмж"
          value={adData?.materialId}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              materialId: value,
            }));
          }}
          options={materials.map(item => ({ value: item.id, label: item.name }))}
        />
        <TextField
          key="productName"
          type="text"
          label="Бүтээгдэхүүний нэр"
          placeholder="--"
          value={adData?.productName}
          handleChange={value =>
            setAdData(prevState => ({
              ...prevState,
              productName: value,
            }))
          }
        />
        <NumberField
          label="Нэгжийн үнэ"
          placeholder="--"
          value={adData.unitAmount}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              unitAmount: value,
            }));
          }}
        />
        <NumberField
          label="Багцын үнэ"
          placeholder="--"
          value={adData.packageAmount}
          onChange={value =>
            setAdData(prevState => ({
              ...prevState,
              packageAmount: value,
            }))
          }
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
          setAdData(prevState => ({
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
            setAdData(prevState => ({
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
            setAdData(prevState => ({
              ...prevState,
              phone: e,
            }));
          }}
        />
      </div>
    </>
  );
};

export default Supplier;
