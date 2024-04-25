'use client';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
};
const EmailOtp: React.FC<Props> = ({ email, setEmail, step, setStep, setDetails }) => {
  const validateEmail = value => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const register = () => {
    if (email == '') {
      toast.error('И-Мэйл хаягаа оруулна уу.');
    } else if (isInvalid) {
      toast.error('И-Мэйл хаяг буруу байна.');
    } else {
      try {
        AuthService.emailOtp({ email, type: 'Forget' })
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
        label="И-Мэйл"
        labelPlacement="outside"
        placeholder="И-Мэйл"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          base: 'mb-8',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        isInvalid={isInvalid}
        color={isInvalid ? 'danger' : 'default'}
        errorMessage={isInvalid && 'И-Мэйл хаягаа зөв оруулна уу.'}
        onValueChange={setEmail}
      />
      <Button
        radius="full"
        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
        onClick={register}
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

export default EmailOtp;
