'use client';

import { motion } from 'framer-motion';
import { Input, Autocomplete, AutocompleteItem, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IAddressParam, ICreateAd } from '@/interfaces/request.interface';
import { Address } from '@/types/reference';
import { ReferenceService } from '@/service/reference/reference.service';
import CustomSelect from '@/components/Inputs/Select';
interface IProps {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
}
const Step2: React.FC<IProps> = ({ adData, setAdData }) => {
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);

  const changeAimag = (e: React.ChangeEvent<HTMLSelectElement>) => {};
  const changeDuureg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdData((prevState: ICreateAd) => ({
      ...prevState,
      districtId: parseInt(e.target.value),
    }));
  };
  const changeKhoroo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdData((prevState: ICreateAd) => ({
      ...prevState,
      khorooId: parseInt(e.target.value),
    }));
  };
  const getAddress = (params: IAddressParam) => {
    ReferenceService.getAddress(params).then(response => {
      if (response.success) {
        params.type == 'PROVINCE' && setProvinces(response.response);
        params.type == 'DISTRICT' && setDistricts(response.response);
        params.type == 'KHOROO' && setKhoroos(response.response);
      }
    });
  };
  useEffect(() => {
    getAddress({ type: 'PROVINCE' });
  }, []);
  useEffect(() => {
    if (adData.provinceId) {
      getAddress({ type: 'DISTRICT', parentId: adData.provinceId });
    }
  }, [adData.provinceId]);
  useEffect(() => {
    if (adData.districtId) {
      getAddress({ type: 'KHOROO', parentId: adData.districtId });
    }
  }, [adData.districtId]);
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
        className={`grid ${adData?.userType == 'SUBSCRIBER' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}
      >
        <Input
          key="postTitle"
          type="text"
          label="Зарын гарчиг"
          labelPlacement="outside"
          placeholder="--"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            inputWrapper: ['custom-input-wrapper', 'bg-white'],
          }}
          value={adData?.title}
          onValueChange={e => {
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              title: e,
            }));
          }}
        />
        {adData?.userType == 'SUBSCRIBER' ? (
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
              setAdData((prevState: ICreateAd) => ({
                ...prevState,
                price: parseInt(e),
              }));
            }}
          />
        ) : null}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <CustomSelect
          label="Аймаг, Хот"
          value={adData?.provinceId?.toString()}
          onSelectionChange={value =>
            setAdData((prevState: ICreateAd) => ({
              ...prevState,
              provinceId: Number(value),
            }))
          }
          options={provinces.map(item => ({ value: item.id, label: item.name }))}
        />
        <Autocomplete
          label="Сум, Дүүрэг"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.districtId?.toString()}
          onChange={changeDuureg}
        >
          {districts.map((data: Address) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Баг, Хороо"
          labelPlacement="outside"
          placeholder="Сонгох"
          radius="sm"
          size="lg"
          variant="bordered"
          classNames={{
            label: 'font-bold',
            trigger: 'custom-select-trigger bg-white',
          }}
          value={adData?.khorooId?.toString()}
          onChange={changeKhoroo}
        >
          {khoroos.map((data: Address) => (
            <AutocompleteItem key={data.id} value={data.id}>
              {data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <Textarea
        variant="bordered"
        label="Байршил"
        labelPlacement="outside"
        radius="sm"
        placeholder="Байршил"
        classNames={{
          base: 'w-full',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={adData?.address}
        onValueChange={e => {
          setAdData((prevState: ICreateAd) => ({
            ...prevState,
            address: e,
          }));
        }}
      />
    </motion.div>
  );
};

export default Step2;
