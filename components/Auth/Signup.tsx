'use client';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';
import { useTranslation } from 'react-i18next';

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
};
const Signup: React.FC<Props> = ({ step, setStep, setDetails }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const register = () => {
    if (username == '') {
      toast.error('И-Мэйл эсвэл утсаа оруулна уу.');
    } else if (password == '') {
      toast.error('Нууц үгээ оруулна уу.');
    } else if (password2 == '') {
      toast.error('Нууц үгээ давтан оруулна уу.');
    } else if (password != password2) {
      toast.error('Нууц тохирохгүй байна.');
    } else {
      try {
        AuthService.register({ username, password })
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
        value={username}
        onValueChange={setUsername}
      />
      <Input
        key="password"
        type="password"
        label={t('password')}
        labelPlacement="outside"
        placeholder={t('password')}
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          base: 'mb-8',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={password}
        onValueChange={setPassword}
      />
      <Input
        key="repeatPassword"
        type="password"
        label={t('confirmPassword')}
        labelPlacement="outside"
        placeholder={t('confirmPassword')}
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          base: 'mb-8',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={password2}
        onValueChange={setPassword2}
      />
      <Button
        radius="full"
        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
        onPress={register}
      >
        Бүртгүүлэх
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

export default Signup;
