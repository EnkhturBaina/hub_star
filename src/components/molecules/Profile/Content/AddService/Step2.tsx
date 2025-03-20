import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Address, AddressType } from '@typeDefs/reference';
import ReferenceService from '@services/reference';
import IApiResponse from '@typeDefs/response';
import TextField from '@components/atoms/textField';
import NumberField from '@components/atoms/numberField';
import SelectField from '@components/atoms/selectField';
interface IProps {
  adData: any;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
const Step2: React.FC<IProps> = ({ adData, setAdData }) => {
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);

  useEffect(() => {
    loadAddress('PROVINCE');
  }, []);

  useEffect(() => {
    if (adData.provinceId) loadAddress('DISTRICT', adData.provinceId);
  }, [adData.provinceId]);

  useEffect(() => {
    if (adData.districtId) loadAddress('KHOROO', adData.districtId);
  }, [adData.districtId]);

  const loadAddress = async (type: AddressType, parentId?: any) => {
    try {
      const result: IApiResponse = await ReferenceService.getAddress({ type, parentId });
      if (result.success) {
        if (type == 'PROVINCE') setProvinces(result.response);
        if (type == 'DISTRICT') setDistricts(result.response);
        if (type == 'KHOROO') setKhoroos(result.response);
      }
    } catch (error) {
      console.log('noop address =>', error);
    }
  };

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
      <div
        className={`grid ${adData?.userType == 'SUBSCRIBER' ? 'grid-cols-1' : 'md:grid-cols-2 grid-cols-1'} gap-4`}
      >
        <TextField
          label="Зарын гарчиг"
          placeholder="--"
          value={adData?.title}
          handleChange={value =>
            setAdData(prevState => ({
              ...prevState,
              title: value,
            }))
          }
        />
        {adData?.userType == 'SUBSCRIBER' ? (
          <NumberField
            label="Үнэ"
            value={adData.price}
            onChange={value =>
              setAdData(prevState => ({
                ...prevState,
                price: value,
              }))
            }
          />
        ) : null}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        <SelectField
          label="Аймаг, Хот"
          value={adData?.provinceId}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              provinceId: value,
            }));
          }}
          options={provinces.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Сум, Дүүрэг"
          value={adData?.districtId?.toString()}
          onChange={value =>
            setAdData(prevState => ({
              ...prevState,
              districtId: value,
            }))
          }
          options={districts.map(item => ({ value: item.id, label: item.name }))}
        />
        <SelectField
          label="Баг, Хороо"
          value={adData?.khorooId?.toString()}
          onChange={value => {
            setAdData(prevState => ({
              ...prevState,
              khorooId: value,
            }));
          }}
          options={khoroos.map(item => ({ value: item.id, label: item.name }))}
        />
      </div>
      <TextField
        label="Байршил"
        placeholder="Байршил"
        type="text"
        value={adData?.address}
        handleChange={value =>
          setAdData(prevState => ({
            ...prevState,
            address: value,
          }))
        }
      />
    </motion.div>
  );
};

export default Step2;
