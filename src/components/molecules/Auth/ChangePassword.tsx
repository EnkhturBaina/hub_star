'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MyButton from '@components/atoms/button';
import TextField from '@components/atoms/textField';
import { useTranslations } from 'next-intl';
import AuthService from '@services/auth';
import MyAlert from '@components/atoms/alert';

type Props = {
  token: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const ChangePassword: React.FC<Props> = ({ token, step, setStep }) => {
  const t = useTranslations();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errors, setErrors] = useState({ show: false, password: false });

  const changePassword = async () => {
    let isError = false;
    if (password == '') {
      isError = true;
      setErrors(prevState => ({ ...prevState, show: true, password: true }));
    }
    if (isError) return;
    else {
      try {
        setButtonLoader(true);
        const result = await AuthService.changePassword({ token, password });
        if (result && result.success) {
          router.push('/auth/signin');
        } else {
          setButtonLoader(false);
          setFormError('error');
        }
      } catch (error) {
        setButtonLoader(false);
        setFormError('error');
        console.error('catch error :', error);
      }
    }
  };

  return (
    <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
      {formError ? (
        <div className="mb-3 mt-4">
          <MyAlert message="Нууц үг солиход алдаа гарлаа." onClose={() => setFormError(null)} />
        </div>
      ) : null}
      <TextField
        label={t('password')}
        placeholder={t('password')}
        value={password}
        handleChange={setPassword}
        error={errors.password ? 'Нууц үгээ оруулна уу.' : null}
      />
      <MyButton className="mb-2" loading={buttonLoader} onClick={changePassword}>
        {t('changePassword')}
      </MyButton>
      <MyButton
        variant="link"
        onClick={() => {
          setStep(step - 1);
        }}
      >
        {t('back')}
      </MyButton>
    </div>
  );
};

export default ChangePassword;
