'use client';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Progress } from 'semantic-ui-react';
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import toast, { Toaster } from 'react-hot-toast';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { ICreateAd } from '@/interfaces/request.interface';

import Subscriber from '../AddService/Step3/Subscriber';
import Executor from '../AddService/Step3/Executor';
import Supplier from '../AddService/Step3/Supplier';
import Transportation from '../AddService/Step3/Transportation';
import Machinery from '../AddService/Step3/Machinery';

const defaultCreateAd: ICreateAd = {
  mainDirectionId: null,
  directionId: null,
  subDirectionId: null,
  categoryId: null,
  provinceId: null,
  districtId: null,
  khorooId: null,
  title: null,
  address: null,
  desciption: null,
  price: null,
  counter: null,
  email: null,
  phone: null,
  isMessenger: null,
  isTermOfService: null,
  imageIds: [],
  workerCount: null,
  isAfternoon: null,
  productName: null,
  unitAmount: null,
  packageAmount: null,
  machineryTypeId: null,
  markId: null,
  modelId: null,
  powerId: null,
  fromAddress: null,
  toAddress: null,
  measurement: null,
};
const AddService = ({
  isAddService,
  setIsAddService,
}: {
  isAddService?: boolean;
  setIsAddService?: any;
}) => {
  const [step, setStep] = useState(1);
  const maxStep = 3;
  const [createAd, setCreateAd] = useState<ICreateAd>(defaultCreateAd);
  const totalCounter = Object.entries(createAd).reduce((total, _) => total + 1, 0);
  const valueCounter = Object.entries(createAd).reduce(
    (total, item) => total + (item[1] !== null ? 1 : 0),
    0
  );

  const createAdRequest = () => {
    AdvertisementService.create(createAd).then(response => {
      if (response.success) {
        toast.success('Амжилттай хадгаллаа.');
        setCreateAd(defaultCreateAd);
        setStep(1);
      }
    });
  };

  const stepFnc = (type: string) => {
    if (type == 'back') {
      if (step === 1) {
        setIsAddService(false);
      } else {
        setStep(step - 1);
      }
    } else if (type == 'next') {
      if (maxStep > step) {
        if (step === 1) {
          if (createAd?.userType == null) {
            toast.error('Хэрэглэгчийн төрөл сонгоно уу.');
          } else if (createAd?.mainDirectionId == null) {
            toast.error('Үйл ажиллагааны үндсэн чиглэл сонгоно уу.');
          } else if (createAd?.directionId == null) {
            toast.error('Үйл ажиллагааны чиглэл сонгоно уу.');
          } else if (createAd?.subDirectionId == null) {
            toast.error('Үйл ажиллагааны нэр сонгоно уу.');
          } else {
            setStep(step + 1);
          }
        } else if (step == 2) {
          if (createAd?.title == null) {
            toast.error('Зарын гарчиг оруулна уу.');
          }
          //  else if (createAd?.userType == 'SUBSCRIBER' && createAd?.price == null) {
          //   toast.error('Үнэ оруулна уу.');
          // } else if (createAd?.provinceId == null) {
          //   toast.error('Аймаг, Хот сонгоно уу.');
          // } else if (createAd?.districtId == null) {
          //   toast.error('Сум, Дүүрэг сонгоно уу.');
          // } else if (createAd?.khorooId == null) {
          //   toast.error('Баг, Хороо сонгоно уу.');
          // } else if (createAd?.address == null) {
          //   toast.error('Байршил оруулна уу.');
          // }
          else {
            setStep(step + 1);
          }
        } else if (step == 3) {
          if (createAd?.userType == 'SUBSCRIBER') {
            if (createAd?.measurement == null) {
              toast.error('Хэмжих нэгж оруулна уу.');
            } else if (createAd?.counter == null) {
              toast.error('Ажлын тоо хэмжээ оруулна уу.');
            } else if (createAd?.desciption == null) {
              toast.error('Тайлбар оруулна уу.');
            } else if (createAd?.email == null) {
              toast.error('Имэйл оруулна уу.');
            } else if (createAd?.phone == null) {
              toast.error('Утас оруулна уу.');
            } else {
              setStep(step + 1);
            }
          } else if (createAd?.userType == 'EXECUTOR') {
            if (createAd?.workerCount == null) {
              toast.error('Ажилчдын тоо оруулна уу.');
            } else if (createAd?.counter == null) {
              toast.error('Ажлын тоо хэмжээ оруулна уу.');
            } else if (createAd?.price == null) {
              toast.error('Үнэ оруулна уу.');
            } else if (createAd?.desciption == null) {
              toast.error('Тайлбар ба ажлын туршлага оруулна уу.');
            } else if (createAd?.email == null) {
              toast.error('Имэйл оруулна уу.');
            } else if (createAd?.phone == null) {
              toast.error('Утас оруулна уу.');
            } else {
              setStep(step + 1);
            }
          } else if (createAd?.userType == 'SUPPLIER') {
            if (createAd?.productName == null) {
              toast.error('Бүтээгдэхүүний нэр сонгоно уу.');
            } else if (createAd?.unitAmount == null) {
              toast.error('Нэгжийн үнэ оруулна уу.');
            } else if (createAd?.packageAmount == null) {
              toast.error('Багцын үнэ оруулна уу.');
            } else if (createAd?.desciption == null) {
              toast.error('Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл оруулна уу.');
            } else if (createAd?.email == null) {
              toast.error('Имэйл оруулна уу.');
            } else if (createAd?.phone == null) {
              toast.error('Утас оруулна уу.');
            } else {
              setStep(step + 1);
            }
          } else if (createAd?.userType == 'TRANSPORTATION') {
            if (createAd?.productName == null) {
              toast.error('Бүтээгдэхүүний нэр сонгоно уу.');
            } else if (createAd?.machineryTypeId == null) {
              toast.error('Машин механизмийн төрөл сонгоно уу.');
            } else if (createAd?.markId == null) {
              toast.error('Марк сонгоно уу.');
            } else if (createAd?.powerId == null) {
              toast.error('Хүчин чадал сонгоно уу.');
            } else if (createAd?.unitAmount == null) {
              toast.error('Нэгж үнэлгээ.цаг оруулна уу.');
            } else if (createAd?.packageAmount == null) {
              toast.error('Багц үнэлгээ.өдөр оруулна уу.');
            } else if (createAd?.desciption == null) {
              toast.error('Тайлбар оруулна уу.');
            } else if (createAd?.email == null) {
              toast.error('Имэйл оруулна уу.');
            } else if (createAd?.phone == null) {
              toast.error('Утас оруулна уу.');
            } else {
              setStep(step + 1);
            }
          } else if (createAd?.userType == 'MACHINERY') {
            if (createAd?.machineryTypeId == null) {
              toast.error('Машин механизмийн төрөл сонгоно уу.');
            } else if (createAd?.markId == null) {
              toast.error('Марк сонгоно уу.');
            } else if (createAd?.modelId == null) {
              toast.error('Загвар сонгоно уу.');
            } else if (createAd?.powerId == null) {
              toast.error('Хүчин чадал сонгоно уу.');
            } else if (createAd?.unitAmount == null) {
              toast.error('Нэгж үнэлгээ.цаг оруулна уу.');
            } else if (createAd?.packageAmount == null) {
              toast.error('Багц үнэлгээ.өдөр оруулна уу.');
            } else if (createAd?.fromAddress == null) {
              toast.error('Хаанаас гэдгээ оруулна уу.');
            } else if (createAd?.toAddress == null) {
              toast.error('Хаашаа гэдгээ оруулна уу.');
            } else if (createAd?.desciption == null) {
              toast.error('Тайлбар оруулна уу.');
            } else if (createAd?.email == null) {
              toast.error('Имэйл оруулна уу.');
            } else if (createAd?.phone == null) {
              toast.error('Утас оруулна уу.');
            } else {
              setStep(step + 1);
            }
          }
        }
      } else if (maxStep == step) {
        createAdRequest();
      }
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
      className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden"
    >
      <Progress
        percent={Math.floor((100 * valueCounter) / totalCounter)}
        progress
        active
        size="small"
        className="custom-progress !mb-2"
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 5000,
        }}
      />
      {step === 1 && <Step1 adData={createAd} setAdData={setCreateAd} />}
      {step === 2 && <Step2 adData={createAd} setAdData={setCreateAd} />}

      {step === 3 && createAd?.userType == 'SUBSCRIBER' ? (
        <Subscriber adData={createAd} setAdData={setCreateAd} />
      ) : null}
      {step === 3 && createAd?.userType == 'EXECUTOR' ? (
        <Executor adData={createAd} setAdData={setCreateAd} />
      ) : null}
      {step === 3 && createAd?.userType == 'SUPPLIER' ? (
        <Supplier adData={createAd} setAdData={setCreateAd} />
      ) : null}
      {step === 3 && createAd?.userType == 'TRANSPORTATION' ? (
        <Transportation adData={createAd} setAdData={setCreateAd} />
      ) : null}
      {step === 3 && createAd?.userType == 'MACHINERY' ? (
        <Machinery adData={createAd} setAdData={setCreateAd} />
      ) : null}

      <div className="flex flex-row justify-between">
        <Button
          variant="bordered"
          radius="sm"
          className="border-mainGray !bg-white !text-black"
          size="md"
          onClick={() => stepFnc('back')}
        >
          Буцах
        </Button>
        <Button
          className="mr-4 bg-mainColor !text-white"
          radius="sm"
          size="md"
          onClick={() => stepFnc('next')}
        >
          Хадгалах {`${step}/${maxStep}`}
        </Button>
      </div>
    </motion.div>
  );
};

export default AddService;
