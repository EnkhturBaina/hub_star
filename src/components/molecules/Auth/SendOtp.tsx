'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AuthService from '@services/auth';
import { useTranslations } from 'next-intl';
import TextField from '@components/atoms/textField';
import MyButton from '@components/atoms/button';
import MyAlert from '@components/atoms/alert';
import IApiResponse from '@typeDefs/response';

interface IProps {
  username: string;
  setUsername: (value: string) => void;
  step: number;
  setStep: (value: number) => void;
  setDetails: (value: string) => void;
}
const SendOtp: React.FC<IProps> = ({ username, setUsername, step, setStep, setDetails }) => {
  const t = useTranslations();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [errors, setErrors] = useState({ show: false, name: false });

  const sendOtp = async () => {
    let isError = false;
    if (username == '') {
      isError = false;
      setErrors(prevState => ({ ...prevState, show: true, name: true }));
    }
    if (isError) return;
    else {
      try {
        setButtonLoader(true);
        const result: IApiResponse = await AuthService.sendOtp({ username, type: 'Forget' });
        if (result && result.success) {
          setDetails(result.response?.details);
          setStep(step + 1);
        } else {
          setButtonLoader(false);
          setOtpError('error');
        }
      } catch (error) {
        setButtonLoader(false);
        setOtpError('error');
        console.error('catch error :', error);
      }
    }
  };

  return (
    <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
      {otpError ? (
        <MyAlert message="Хүсэлт илгээхэд алдаа гарлаа" onClose={() => setOtpError(null)} />
      ) : null}
      <TextField
        label={t('emailOrPhone')}
        placeholder={t('emailOrPhone')}
        value={username}
        handleChange={setUsername}
        error={errors.name ? 'Нэвтрэх нэрээ оруулна уу.' : null}
      />
      <MyButton onClick={sendOtp} loading={buttonLoader}>
        Хүсэлт явуулах
      </MyButton>
      <div className="text-center text-sm">
        Та бүртгэлтэй юу?
        <Link className="text-primary" href="/auth/signin">
          Нэвтрэх
        </Link>
      </div>
    </div>
  );
};

export default SendOtp;
