import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '@heroui/react';
import withAuth from '@components/atoms/withAuth';
import { EyeIcon } from '@heroicons/react/20/solid';
import { AuthService } from '@services/authentication/authentication.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@context/auth';
import ProfileLayout from '@components/molecules/Profile/ProfileLayout';

const Password = () => {
  const { user } = useAuthState();
  const router = useRouter();
  const [isOldPasswordShow, setIsOldPasswordShow] = useState<boolean>(false);
  const [isNewPasswordShow, setIsNewPasswordShow] = useState<boolean>(false);
  const [isRepeatPasswordShow, setIsRepeatPasswordShow] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleChangePassword = () => {
    if (oldPassword == '') {
      toast.error('Хуучин нууц үг оруулна уу.');
      return;
    }
    if (newPassword == '') {
      toast.error('Шинэ нууц үг оруулна уу.');
      return;
    }
    if (repeatPassword == '') {
      toast.error('Нууц үг давтах оруулна уу.');
      return;
    }
    if (repeatPassword !== newPassword) {
      toast.error('Нууц үг давтах таарахгүй байна.');
      return;
    }
    AuthService.login({ username: user?.username, password: oldPassword })
      .then(async res => {
        AuthService.changePassword({
          password: newPassword,
          token: res.response.accessToken,
        }).then(res => {
          if (res.success) {
            toast.success('Нууц үг амжилттай солилоо');
            router.push('/auth/signin');
            return;
          }
        });
      })
      .catch(err => {
        toast.error(err + 'Хуучин нууц үг буруу.');
        return;
      });
  };

  const handleClear = () => {
    setOldPassword('');
    setNewPassword('');
    setRepeatPassword('');
  };
  return (
    <ProfileLayout>
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
        <div className="w-full h-fit relative flex items-center justify-center">
          <Input
            key="oldPassword"
            type={!isOldPasswordShow && 'password'}
            label="Хуучин нууц үг"
            labelPlacement="outside"
            placeholder="Хуучин нууц үг"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={oldPassword}
            onValueChange={setOldPassword}
          />
          <EyeIcon
            width={16}
            className="absolute right-5 top-[54%] cursor-pointer"
            onClick={() => setIsOldPasswordShow(!isOldPasswordShow)}
          />
        </div>
        <div className="w-full h-fit relative flex items-center justify-center">
          <Input
            key="newPassword"
            type={!isNewPasswordShow && 'password'}
            label="Шинэ нууц үг"
            labelPlacement="outside"
            placeholder="Шинэ нууц үг"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={newPassword}
            onValueChange={setNewPassword}
          />
          <EyeIcon
            width={16}
            className="absolute right-5 top-[54%] cursor-pointer"
            onClick={() => setIsNewPasswordShow(!isNewPasswordShow)}
          />
        </div>
        <div className="w-full h-fit relative flex items-center justify-center">
          <Input
            key="repeatPassword"
            type={!isRepeatPasswordShow && 'password'}
            label="Нууц үг давтах"
            labelPlacement="outside"
            placeholder="Нууц үг давтах"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={repeatPassword}
            onValueChange={setRepeatPassword}
          />
          <EyeIcon
            width={16}
            className="absolute right-5 top-[54%] cursor-pointer"
            onClick={() => setIsRepeatPasswordShow(!isRepeatPasswordShow)}
          />
        </div>

        <div className="flex flex-row justify-end">
          <Button
            className="mr-4 bg-mainColor !text-white"
            radius="sm"
            size="md"
            onClick={handleChangePassword}
          >
            Хадгалах
          </Button>
          <Button
            variant="bordered"
            radius="sm"
            className="border-mainGray !bg-white !text-black"
            size="md"
            onClick={handleClear}
          >
            Цуцлах
          </Button>
        </div>
      </motion.div>
    </ProfileLayout>
  );
};

export default withAuth(Password);
