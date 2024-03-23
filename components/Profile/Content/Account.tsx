"use client";

import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import MainContext from "@/app/context/MainContext";
import { useContext, useEffect, useState } from "react";
import { UserData } from "@/types/userData";
import axiosClient from "@/services/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import AccountFields from "@/components/Skeleton/AccountFields";

const Account = () => {
  const state = useContext(MainContext);
  const client = axiosClient();
  const [accountData, setAccountData] = useState<UserData>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (accountData == null) {
      setAccountData(state?.authUserData);
    }
  }, []);

  const saveAccount = () => {
    if (!accountData?.lastName) {
      toast.error("Банкны нэр оруулна уу.");
    } else if (!accountData?.firstName) {
      toast.error("Дансны дугаар оруулна уу.");
    } else if (!accountData?.jobPosition) {
      toast.error("Эзэмшигчийн нэр оруулна уу.");
    } else {
      setIsSaving(true);
      console.log("accountData", accountData);
      try {
        client
          .patch("users/" + accountData?.id, {
            bank: accountData?.bank,
            bankAccount: accountData?.bankAccount,
            bankAccountNo: accountData?.bankAccountNo,
          })
          .then((response) => {
            setIsSaving(false);
            toast.success("Амжилттай хадгаллаа");
          })
          .catch((error) => {
            console.error("Error fetching :", error);
          });
      } catch (error) {
        console.error("catch error :", error);
      }
    }
  };
  return (
    <>
      {accountData == null ? (
        <AccountFields />
      ) : (
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
          <Input
            key="bank"
            type="text"
            label="Банкны нэр"
            labelPlacement="outside"
            placeholder="Банкны нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={accountData?.bank}
            onValueChange={(e) => {
              setAccountData((prevState: UserData) => ({
                ...prevState,
                bank: e,
              }));
            }}
          />
          <Input
            key="bankAccount"
            type="number"
            label="Дансны дугаар"
            labelPlacement="outside"
            placeholder="Дансны дугаар"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={accountData?.bankAccount}
            onValueChange={(e) => {
              setAccountData((prevState: UserData) => ({
                ...prevState,
                bankAccount: e,
              }));
            }}
          />
          <Input
            key="bankAccountNo"
            type="text"
            label="Эзэмшигчийн нэр"
            labelPlacement="outside"
            placeholder="Эзэмшигчийн нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={accountData?.bankAccountNo}
            onValueChange={(e) => {
              setAccountData((prevState: UserData) => ({
                ...prevState,
                bankAccountNo: e,
              }));
            }}
          />

          <div className="flex flex-row justify-end">
            <Button
              className="mr-4 bg-mainColor !text-white"
              radius="sm"
              size="md"
              onClick={saveAccount}
              isDisabled={isSaving}
            >
              Хадгалах
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Account;
