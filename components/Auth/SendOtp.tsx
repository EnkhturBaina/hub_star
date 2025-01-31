'use client';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';
import { useTranslation } from 'react-i18next';

type Props = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
};
const SendOtp: React.FC<Props> = ({ username, setUsername, step, setStep, setDetails }) => {
  const { t } = useTranslation();

  const register = () => {
    if (username == '') {
      toast.error('И-Мэйл хаягаа оруулна уу.');
    } else {
      try {
        AuthService.sendOtp({ username, type: 'Forget' })
          .then(response => {
            if (response.success) {
              setDetails(response.response.details);
              setStep(step + 1);
            }
          })
          .catch(error => {
            console.error('Error fetching :', error);
            toast.error(error.response?.data?.message);
          });
      } catch (error) {
        console.error('catch error :', error);
      }
    }
  };

  return (
    <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
      <Input
        key="username"
        type="text"
        label={t('emailOrPhone')}
        labelPlacement="outside"
        placeholder={t('emailOrPhone')}
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          base: 'mb-8',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        color={'default'}
        onValueChange={setUsername}
      />
      <Button
        radius="full"
        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
        onPress={register}
      >
        Хүсэлт явуулах
      </Button>
      <div className="text-center text-sm">
        Та бүртгэлтэй юу?{' '}
        <Link className="text-primary" href="/auth/signin">
          Нэвтрэх
        </Link>
      </div>
    </div>
  );
};

export default SendOtp;
