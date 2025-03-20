import React, { useState } from 'react';
import { motion } from 'framer-motion';
import withAuth from '@components/atoms/withAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@context/auth';
import AuthService from '@services/auth';
import PasswordField from '@components/atoms/passwordField';
import MyButton from '@components/atoms/button';
import IApiResponse from '@typeDefs/response';

const Password = () => {
  const { user } = useAuthState();
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleChangePassword = async () => {
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
    const result: IApiResponse = await AuthService.authenticate(user.username, oldPassword);
    if (result.success) {
      const res: IApiResponse = await AuthService.changePassword({
        password: newPassword,
        token: result.response.accessToken,
      });
      if (res.success) {
        toast.success('Нууц үг амжилттай солилоо');
        router.push('/auth/signin');
      }
    }
  };

  const handleClear = () => {
    setOldPassword('');
    setNewPassword('');
    setRepeatPassword('');
  };
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
      className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden p-2"
    >
      <PasswordField
        label="Хуучин нууц үг"
        placeholder="Хуучин нууц үг"
        value={oldPassword}
        handleChange={setOldPassword}
      />
      <PasswordField
        label="Шинэ нууц үг"
        placeholder="Шинэ нууц үг"
        value={newPassword}
        handleChange={setNewPassword}
      />
      <PasswordField
        label="Нууц үг давтах"
        placeholder="Нууц үг давтах"
        value={repeatPassword}
        handleChange={setRepeatPassword}
      />

      <div className="flex flex-row justify-end">
        <MyButton className="mr-4" onClick={handleChangePassword}>
          Хадгалах
        </MyButton>
        <MyButton variant="secondary" onClick={handleClear}>
          Цуцлах
        </MyButton>
      </div>
    </motion.div>
  );
};

export default withAuth(Password);
