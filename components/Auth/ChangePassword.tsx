'use client';
import { Button, Input } from '@heroui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';
import { useRouter } from 'next/router';

type Props = {
  token: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const ChangePassword: React.FC<Props> = ({ token, step, setStep }) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');

  const changePassword = () => {
    if (password == '') {
      toast.error('Нууц үгээ оруулна уу.');
    } else {
      try {
        AuthService.changePassword({ token, password })
          .then(response => {
            if (response.success) {
              router.push('/auth/signin');
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
        key="password"
        type="text"
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
        onValueChange={setPassword}
      />
      <Button
        radius="full"
        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
        onPress={changePassword}
      >
        Нууц үг солих
      </Button>
      <Button
        radius="full"
        className="mb-2 w-full rounded-md font-bold leading-none"
        onPress={() => {
          setStep(step - 1);
        }}
      >
        Буцах
      </Button>
    </div>
  );
};

export default ChangePassword;
