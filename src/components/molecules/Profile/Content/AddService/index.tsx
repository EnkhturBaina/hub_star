import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from 'semantic-ui-react';
import Step1 from './Step1';
import Step2 from './Step2';
import toast from 'react-hot-toast';
import Subscriber from './Step3/Subscriber';
import Executor from './Step3/Executor';
import Supplier from './Step3/Supplier';
import Transportation from './Step3/Transportation';
import Machinery from './Step3/Machinery';
import PublicSelection from './Step3/PublicSelection';
import InternationalTrade from './Step3/InternationalTrade';
import ConsultingService from './Step3/ConsultingService';
import VocationalTraining from './Step3/VocationalTraining';
import LaboratoryMaterial from './Step3/LaboratoryMaterial';
import MakeBudget from './Step3/MakeBudget';
import { Checkbox, Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react';
import AdvertisementService from '@services/advertisement';
import Terms from '@components/atoms/terms';
import MyButton from '@components/atoms/button';
import { CreateAdvertisement } from '@typeDefs/advertisement';

const defaultCreateAd = {
  mainDirectionId: null,
  directionId: null,
  subDirectionId: null,
  provinceId: null,
  districtId: null,
  khorooId: null,
  title: null,
  address: null,
  desciption: null,
  price: 0,
  counter: null,
  email: null,
  phone: null,
  isMessenger: false,
  isTermOfService: false,
  imageIds: [],
  workerCount: 0,
  isAfternoon: false,
  productName: null,
  unitAmount: 0,
  packageAmount: 0,
  machineryTypeId: null,
  markId: null,
  modelId: null,
  powerId: null,
  fromAddress: null,
  toAddress: null,
  measurement: null,
};
type Props = {
  isSpecial: boolean;
  setIsAddService: React.Dispatch<React.SetStateAction<boolean>>;
  updateAdv?: any;
};
const AddService: React.FC<Props> = ({ isSpecial, setIsAddService, updateAdv }) => {
  const [step, setStep] = useState(1);
  const maxStep = 3;
  const [createAd, setCreateAd] = useState<CreateAdvertisement>(defaultCreateAd);
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = async () => {
    setIsOpen(!isOpen);
  };

  const totalCounter = Object.entries(createAd).reduce(total => total + 1, 0);
  const valueCounter = Object.entries(createAd).reduce(
    (total, item) => total + (item[1] !== null ? 1 : 0),
    0
  );

  const createAdRequest = () => {
    if (updateAdv) {
      AdvertisementService.update(createAd)
        .then(response => {
          if (response.success) {
            toast.success('Амжилттай заслаа.');
            setCreateAd(defaultCreateAd);
            setIsAddService(false);
          }
        })
        .catch(err => toast.error(err?.message));
    } else {
      AdvertisementService.create(createAd)
        .then(response => {
          if (response.success) {
            toast.success('Амжилттай хадгаллаа.');
            setCreateAd(defaultCreateAd);
            setStep(1);
          }
        })
        .catch(err => toast.error(err?.message));
    }
  };

  const stepFnc = (type: string) => {
    if (type == 'back') {
      if (step === 1) {
        setIsAddService(false);
      } else {
        setStep(step - 1);
      }
    } else if (type == 'next') {
      if (step === 1) {
        if (isSpecial) {
          if (!createAd.specialService) {
            toast.error('Онцгой үйлчилгээ сонгоно уу.');
            return;
          }
        } else {
          if (createAd?.userType == null) {
            toast.error('Хэрэглэгчийн төрөл сонгоно уу.');
            return;
          } else if (createAd?.mainDirectionId == null) {
            toast.error('Үйл ажиллагааны үндсэн чиглэл сонгоно уу.');
            return;
          }
        }
        if (createAd?.directionId == null) {
          toast.error('Үйл ажиллагааны чиглэл сонгоно уу.');
          return;
        } else if (createAd?.subDirectionId == null) {
          toast.error('Үйл ажиллагааны нэр сонгоно уу.');
          return;
        } else {
          setStep(step + 1);
        }
      } else if (step == 2) {
        if (createAd?.title == null) {
          toast.error('Зарын гарчиг оруулна уу.');
          return;
        } else if (createAd?.userType == 'SUBSCRIBER' && createAd?.price == null) {
          toast.error('Үнэ оруулна уу.');
          return;
        } else if (createAd?.provinceId == null) {
          toast.error('Аймаг, Хот сонгоно уу.');
          return;
        } else if (createAd?.districtId == null) {
          toast.error('Сум, Дүүрэг сонгоно уу.');
          return;
        } else if (createAd?.khorooId == null) {
          toast.error('Баг, Хороо сонгоно уу.');
          return;
        } else if (createAd?.address == null) {
          toast.error('Байршил оруулна уу.');
          return;
        } else {
          setStep(step + 1);
        }
      } else if (step == maxStep) {
        if (!createAd.isTermOfService) {
          toast.error('Үйлчилгээний нөхцөл зөвшөөрнө үү.');
          return;
        }
        if (createAd?.imageIds?.length == 0) {
          toast.error('Зураг оруулна уу.');
          return;
        } else if (createAd?.email == null) {
          toast.error('Имэйл оруулна уу.');
          return;
        } else if (createAd?.phone == null) {
          toast.error('Утас оруулна уу.');
          return;
        } else if (createAd?.userType == 'SUBSCRIBER') {
          if (createAd?.measurement == null) {
            toast.error('Хэмжих нэгж оруулна уу.');
            return;
          } else if (createAd?.counter == null) {
            toast.error('Ажлын тоо хэмжээ оруулна уу.');
            return;
          } else if (createAd?.desciption == null) {
            toast.error('Тайлбар оруулна уу.');
            return;
          }
        } else if (createAd?.userType == 'EXECUTOR') {
          if (createAd?.workerCount == null) {
            toast.error('Ажилчдын тоо оруулна уу.');
            return;
          } else if (createAd?.counter == null) {
            toast.error('Ажлын тоо хэмжээ оруулна уу.');
            return;
          } else if (createAd?.price == null) {
            toast.error('Үнэ оруулна уу.');
            return;
          } else if (createAd?.desciption == null) {
            toast.error('Тайлбар ба ажлын туршлага оруулна уу.');
            return;
          }
        } else if (createAd?.userType == 'SUPPLIER') {
          if (createAd?.productName == null) {
            toast.error('Бүтээгдэхүүний нэр сонгоно уу.');
            return;
          } else if (createAd?.unitAmount == null) {
            toast.error('Нэгжийн үнэ оруулна уу.');
            return;
          } else if (createAd?.packageAmount == null) {
            toast.error('Багцын үнэ оруулна уу.');
            return;
          } else if (createAd?.desciption == null) {
            toast.error('Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл оруулна уу.');
            return;
          }
        } else if (createAd?.userType == 'TRANSPORTATION') {
          if (createAd?.productName == null) {
            toast.error('Бүтээгдэхүүний нэр сонгоно уу.');
            return;
          } else if (createAd?.machineryTypeId == null) {
            toast.error('Машин механизмийн төрөл сонгоно уу.');
            return;
          } else if (createAd?.markId == null) {
            toast.error('Марк сонгоно уу.');
            return;
          } else if (createAd?.powerId == null) {
            toast.error('Хүчин чадал сонгоно уу.');
            return;
          } else if (createAd?.unitAmount == null) {
            toast.error('Нэгж үнэлгээ.цаг оруулна уу.');
            return;
          } else if (createAd?.packageAmount == null) {
            toast.error('Багц үнэлгээ.өдөр оруулна уу.');
            return;
          } else if (createAd?.desciption == null) {
            toast.error('Тайлбар оруулна уу.');
            return;
          }
        } else if (createAd?.userType == 'MACHINERY') {
          if (createAd?.machineryTypeId == null) {
            toast.error('Машин механизмийн төрөл сонгоно уу.');
            return;
          } else if (createAd?.markId == null) {
            toast.error('Марк сонгоно уу.');
            return;
          } else if (createAd?.modelId == null) {
            toast.error('Загвар сонгоно уу.');
            return;
          } else if (createAd?.powerId == null) {
            toast.error('Хүчин чадал сонгоно уу.');
            return;
          } else if (createAd?.unitAmount == null) {
            toast.error('Нэгж үнэлгээ.цаг оруулна уу.');
            return;
          } else if (createAd?.packageAmount == null) {
            toast.error('Багц үнэлгээ.өдөр оруулна уу.');
            return;
          } else if (createAd?.fromAddress == null) {
            toast.error('Хаанаас гэдгээ оруулна уу.');
            return;
          } else if (createAd?.toAddress == null) {
            toast.error('Хаашаа гэдгээ оруулна уу.');
            return;
          } else if (createAd?.desciption == null) {
            toast.error('Тайлбар оруулна уу.');
            return;
          }
        }
        if (createAd.isTermOfService) {
          createAdRequest();
        }
      }
    }
  };

  useEffect(() => {
    if (updateAdv) setCreateAd(updateAdv);
  }, [updateAdv]);
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
      {step === 1 && <Step1 isSpecial={isSpecial} adData={createAd} setAdData={setCreateAd} />}
      {step === 2 && <Step2 adData={createAd} setAdData={setCreateAd} />}

      {step === 3 && (
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
          {createAd?.userType == 'SUBSCRIBER' && (
            <Subscriber adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.userType == 'EXECUTOR' && (
            <Executor adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.userType == 'SUPPLIER' && (
            <Supplier adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.userType == 'TRANSPORTATION' && (
            <Transportation adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.userType == 'MACHINERY' && (
            <Machinery adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'PUBLIC_SELECTION' && (
            <PublicSelection adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'INTERNATIONAL_TRADE' && (
            <InternationalTrade adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'CONSULTING_SERVICE' && (
            <ConsultingService adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'VOCATIONAL_TRAINING' && (
            <VocationalTraining adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'LABORATORY_MATERIAL' && (
            <LaboratoryMaterial adData={createAd} setAdData={setCreateAd} />
          )}
          {createAd?.specialService == 'MAKE_BUDGET' && (
            <MakeBudget adData={createAd} setAdData={setCreateAd} />
          )}
          <div className="flex flex-col gap-y-2">
            <Checkbox
              isSelected={createAd?.isTermOfService}
              onChange={() => {
                if (createAd.isTermOfService) {
                  setCreateAd({ ...createAd, isTermOfService: false });
                } else {
                  onOpenChange();
                }
              }}
              disabled
              classNames={{
                base: 'w-full',
                label: 'w-full',
                wrapper: 'custom-checkbox w-6 h-6',
              }}
            >
              <span>Үйлчилгээний нөхцөл зөвшөөрөх </span>
            </Checkbox>
          </div>
        </motion.div>
      )}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        className="absolute top-4"
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          base: 'my-auto',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalBody
                style={{
                  width: '100%',
                  minHeight: '100%',
                  position: 'relative',
                  overflowY: 'auto',
                }}
              >
                <Terms />
              </ModalBody>
              <ModalFooter>
                <MyButton
                  className="w-full"
                  onClick={() => {
                    setCreateAd({ ...createAd, isTermOfService: true });
                    onClose();
                  }}
                >
                  Үйлчилгээний нөхцөл зөвшөөрөх
                </MyButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-row justify-between p-2">
        <MyButton variant="secondary" onClick={() => stepFnc('back')}>
          Буцах
        </MyButton>
        <MyButton onClick={() => stepFnc('next')}>Хадгалах {`${step}/${maxStep}`}</MyButton>
      </div>
    </motion.div>
  );
};

export default AddService;
