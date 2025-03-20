import React, { useEffect, useState } from 'react';
import { Input, Textarea } from '@heroui/react';
import { RefMachineryType } from '@typeDefs/reference';
import AdvImageUpload from '../AdvImageUpload';
import SelectField from '@components/atoms/selectField';
import ReferenceService from '@services/reference';
import IApiResponse from '@typeDefs/response';
interface IProps {
  adData: any;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
//Машин механизм
const Machinery: React.FC<IProps> = ({ adData, setAdData }) => {
  const [machineries, setMachineries] = useState([]);
  const [powers, setPowers] = useState([]);
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);

  const handleChange =
    (prop: keyof any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAdData({ ...adData, [prop]: event.target.value });
    };

  useEffect(() => {
    loadMachinery('MACHINERY_TYPE');
    loadMachinery('POWER');
    loadMachinery('MARK');
  }, []);

  useEffect(() => {
    if (adData.markId) loadMachinery('MODEL', adData.markId);
  }, [adData.markId]);

  const loadMachinery = async (type: RefMachineryType, parentId?: any) => {
    try {
      const result: IApiResponse = await ReferenceService.getMachinery({ type, parentId });
      if (result.success) {
        if (type == 'MACHINERY_TYPE') setMachineries(result.response);
        if (type == 'POWER') setPowers(result.response);
        if (type == 'MARK') setMarks(result.response);
        if (type == 'MODEL') setModels(result.response);
      }
    } catch (error) {
      console.log('noop machinery =>', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <SelectField
          label="Машин механизмийн төрөл"
          value={adData?.machineryTypeId}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              machineryTypeId: value,
            }));
          }}
          options={machineries.map(item => ({ value: item.id, label: item.name }))}
        />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
        <SelectField
          label="Марк"
          value={adData?.markId?.toString()}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              markId: value,
            }));
          }}
          options={marks.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Загвар"
          value={adData?.modelId?.toString()}
          onChange={value =>
            setAdData(prevState => ({
              ...prevState,
              modelId: value,
            }))
          }
          options={models.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Хүчин чадал"
          value={adData?.powerId?.toString()}
          onChange={value =>
            setAdData(prevState => ({
              ...prevState,
              powerId: value,
            }))
          }
          options={powers.map(item => ({ value: item.id, label: item.name }))}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
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
    </>
  );
};

export default Machinery;
