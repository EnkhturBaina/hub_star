"use client";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Progress } from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { CreateAdType } from "@/types/createAd";
import MainContext from "@/app/context/MainContext";
import axiosClient from "@/services/axiosInstance";
import { AddressType } from "@/types/addressType";

const AddService = ({
  isAddService,
  setIsAddService,
}: {
  isAddService?: boolean;
  setIsAddService?: any;
}) => {
  const client = axiosClient();

  const [addressList, setAddressList] = useState<AddressType>();
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(3);
  const [createAd, setCreateAd] = useState<CreateAdType>({
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
  });
  const state = useContext(MainContext);

  const getAddress = () => {
    client
      .get("reference/address")
      .then((response) => {
        setAddressList(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  useEffect(() => {
    getAddress();
  }, []);

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
        percent={Math.floor((100 * step) / maxStep)}
        progress
        active
        size="small"
        className="custom-progress !mb-2"
      />
      {step === 1 ? (
        <Step1 adData={createAd} setCreateAd={setCreateAd} />
      ) : null}
      {step === 2 ? <Step2 addressData={addressList} /> : null}
      {step === 3 ? <Step3 /> : null}
      <div className="flex flex-row justify-between">
        <Button
          variant="bordered"
          radius="sm"
          className="border-mainGray !bg-white !text-black"
          size="md"
          onClick={() => {
            if (step === 1) {
              setIsAddService(false);
            } else {
              setStep(step - 1);
            }
          }}
        >
          Буцах
        </Button>
        <Button
          className="mr-4 bg-mainColor !text-white"
          radius="sm"
          size="md"
          onClick={() => {
            if (maxStep > step) {
              setStep(step + 1);
            }
          }}
        >
          Хадгалах {`${step}/${maxStep}`}
        </Button>
      </div>
    </motion.div>
  );
};

export default AddService;
