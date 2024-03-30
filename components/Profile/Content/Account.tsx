'use client';

import { motion } from 'framer-motion';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AccountFields from '@/components/Skeleton/AccountFields';
import { Users } from '@/types/user';
import { useAppContext } from '@/utils/context/app-context';
import { AuthService } from '@/service/authentication/authentication.service';

const Account = () => {
  const { user } = useAppContext();
  const [accountData, setAccountData] = useState<Users>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (user && accountData == null) {
      setAccountData(user);
    }
  }, []);

  const saveAccount = () => {
    if (!accountData?.lastName) {
      toast.error('Банкны нэр оруулна уу.');
    } else if (!accountData?.firstName) {
      toast.error('Дансны дугаар оруулна уу.');
    } else if (!accountData?.jobPosition) {
      toast.error('Эзэмшигчийн нэр оруулна уу.');
    } else {
      setIsSaving(true);
      console.log('accountData', accountData);
      try {
        AuthService.updateById(accountData.id, {
          bank: accountData?.bank,
          bankAccount: accountData?.bankAccount,
          bankAccountNo: accountData?.bankAccountNo,
        })
          .then(response => {
            if (response.success) {
              setIsSaving(false);
              toast.success('Амжилттай хадгаллаа');
            }
          })
          .catch(error => {
            console.error('Error fetching :', error);
          });
      } catch (error) {
        console.error('catch error :', error);
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
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={accountData?.bank}
            onValueChange={e => {
              setAccountData((prevState: Users) => ({
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
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={accountData?.bankAccount}
            onValueChange={e => {
              setAccountData((prevState: Users) => ({
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
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={accountData?.bankAccountNo}
            onValueChange={e => {
              setAccountData((prevState: Users) => ({
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
