'use client';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Divider } from 'semantic-ui-react';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
};
const Signup: React.FC<Props> = ({ step, setStep, setDetails }) => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

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
    } else if (password == '') {
      toast.error('Нууц үгээ оруулна уу.');
    } else if (password2 == '') {
      toast.error('Нууц үгээ давтан оруулна уу.');
    } else if (password != password2) {
      toast.error('Нууц тохирохгүй байна.');
    } else {
      try {
        AuthService.register({ email, phone, password })
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
        value={email}
        onValueChange={setEmail}
      />
      <Input
        key="phone"
        type="text"
        label="Утас"
        labelPlacement="outside"
        placeholder="Утас"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          base: 'mb-8',
          label: 'font-bold',
          inputWrapper: ['custom-input-wrapper', 'bg-white'],
        }}
        value={phone}
        onValueChange={setPhone}
      />
      <Input
        key="password"
        type="password"
        label="Нууц үг"
        labelPlacement="outside"
        placeholder="Нууц үг"
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
        label="Нууц үг давтах"
        labelPlacement="outside"
        placeholder="Нууц үг давтах"
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
        onClick={register}
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
