import React, { useState } from 'react';
import AuthService from '@services/auth';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthState } from '@context/auth';
import IApiResponse from '@typeDefs/response';
import MyAlert from '@components/atoms/alert';
import TextField from '@components/atoms/textField';
import PasswordField from '@components/atoms/passwordField';
import MyButton from '@components/atoms/button';

const Signin = () => {
  const router = useRouter();
  const t = useTranslations();
  const { setLogin } = useAuthState();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [errors, setErrors] = useState({ show: false, name: false, password: false });

  const handleLogin = async () => {
    let isError = false;
    if (username == '') {
      isError = true;
      setErrors(prevState => ({ ...prevState, show: true, name: true }));
    }
    if (password == '') {
      setErrors(prevState => ({ ...prevState, show: true, password: true }));
    }
    if (isError) return;
    else {
      try {
        setButtonLoader(true);
        const result: IApiResponse = await AuthService.authenticate(username, password);
        if (result && result.success) {
          setLogin(result.response?.accessToken);
          setLoginError(null);
          router.push('/');
        } else {
          setButtonLoader(false);
          setLoginError('error');
        }
      } catch (error) {
        setButtonLoader(false);
        setLoginError('error');
        console.error('catch error :', error);
      }
    }
  };
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="flex h-[calc(100vh-100px)] flex-wrap">
        <div className="relative flex h-full w-full flex-col justify-center lg:flex-row">
          <div className="relative hidden h-full w-full md:block md:h-1/3 lg:h-full lg:w-1/2">
            <Image
              src="/signin_bg.png"
              loading="eager"
              priority
              alt="Dotted"
              quality={100}
              fill
              sizes="100vh"
              className=""
            />
          </div>
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
            className="animate_top flex h-2/3 items-center justify-center self-center sm:w-full md:h-full md:w-1/2 lg:h-full lg:w-1/2"
          >
            <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
              {loginError ? (
                <div className="mb-3 mt-4">
                  <MyAlert
                    message="Нэвтрэх нэр эсвэл нууц үг буруу байна."
                    onClose={() => setLoginError(null)}
                  />
                </div>
              ) : null}
              <TextField
                label={t('emailOrPhone')}
                placeholder={t('emailOrPhone')}
                value={username}
                handleChange={setUsername}
                error={errors.name ? 'Нэвтрэх нэрээ оруулна уу.' : null}
              />
              <PasswordField
                label={t('password')}
                placeholder={t('password')}
                value={password}
                handleChange={setPassword}
                error={errors.password ? 'Нууц үгээ оруулна уу.' : null}
              />
              <div className="text-right text-sm">
                <Link className="text-primary" href="/auth/forgot-password">
                  {t('forgotPassword')}
                </Link>
              </div>
              <MyButton loading={buttonLoader} onClick={handleLogin}>
                {t('login')}
              </MyButton>
              <div className="text-center text-sm">
                {t('doYouHaveAnAccount')}
                <Link className="text-primary" href="/auth/signup">
                  {t('register')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signin;
