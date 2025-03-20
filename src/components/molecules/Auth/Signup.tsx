'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import IApiResponse from '@typeDefs/response';
import AuthService from '@services/auth';
import MyAlert from '@components/atoms/alert';
import TextField from '@components/atoms/textField';
import PasswordField from '@components/atoms/passwordField';
import MyButton from '@components/atoms/button';

type Props = {
  step: number;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
};
const Signup: React.FC<Props> = ({ username, setUsername, step, setStep, setDetails }) => {
  const t = useTranslations();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [errors, setErrors] = useState({
    show: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleRegister = async () => {
    let isError = false;
    if (username == '') {
      isError = true;
      setErrors(prevState => ({ ...prevState, show: true, username: true }));
      toast.error('И-Мэйл эсвэл утсаа оруулна уу.');
    }
    if (password == '') {
      isError = true;
      setErrors(prevState => ({ ...prevState, show: true, password: true }));
      toast.error('Нууц үгээ оруулна уу.');
    }
    if (confirmPassword == '') {
      isError = true;
      setErrors(prevState => ({ ...prevState, show: true, confirmPassword: true }));
      toast.error('Нууц үгээ давтан оруулна уу.');
    }
    if (password == confirmPassword) {
      setRegisterError('Нууц үг таарсангүй.');
    }
    if (isError) return;
    else {
      try {
        setButtonLoader(true);
        const result: IApiResponse = await AuthService.register(username, password);
        if (result && result.success) {
          setDetails(result.response?.details);
          setStep(step + 1);
        } else {
          setButtonLoader(false);
          setRegisterError('Хэрэглэгчийн бүртгэл амжилтгүй боллоо');
        }
      } catch (error) {
        if (error?.response?.data?.message == 'User with that email already exists') {
          setRegisterError('error');
        }
        setButtonLoader(false);
        setRegisterError('Хэрэглэгч бүртгэлтэй байна.');
        console.error('Auth register noop:', error);
      }
    }
  };

  return (
    <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
      {registerError ? (
        <div className="mb-3 mt-4">
          <MyAlert message={registerError} onClose={() => setRegisterError(null)} />
        </div>
      ) : null}
      <TextField
        label={t('emailOrPhone')}
        placeholder={t('emailOrPhone')}
        value={username}
        handleChange={setUsername}
        error={errors.username ? 'Нэвтрэх нэрээ оруулна уу.' : null}
      />
      <PasswordField
        label={t('password')}
        placeholder={t('password')}
        value={password}
        handleChange={setPassword}
        error={errors.password ? 'Нууц үгээ оруулна уу.' : null}
      />
      <PasswordField
        label={t('confirmPassword')}
        placeholder={t('confirmPassword')}
        value={confirmPassword}
        handleChange={setConfirmPassword}
        error={errors.confirmPassword ? 'Нууц үгээ оруулна уу.' : null}
      />
      <MyButton loading={buttonLoader} onClick={handleRegister}>
        {t('register')}
      </MyButton>
      <div className="text-center text-sm">
        {t('doYouHaveAnAccount')}
        <Link className="text-primary" href="/auth/signin">
          {t('login')}
        </Link>
      </div>
    </div>
  );
};

export default Signup;
