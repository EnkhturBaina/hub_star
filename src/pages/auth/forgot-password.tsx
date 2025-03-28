import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SendOtp from '@components/molecules/Auth/SendOtp';
import Verification from '@components/molecules/Auth/Verification';
import ChangePassword from '@components/molecules/Auth/ChangePassword';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const ForgotPasswordPage: NextPage = () => {
  const t = useTranslations();
  const [step, setStep] = useState<number>(1);
  const [details, setDetails] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');

  return (
    <>
      <Head>
        <title>{t('forgotPassword')} | Hub Star</title>
      </Head>
      <section className="flex h-[calc(100vh-100px)] flex-wrap">
        <div className="relative flex h-full w-full flex-col justify-center lg:flex-row">
          <div className="relative hidden h-full w-full md:block md:h-1/3 lg:h-full lg:w-1/2">
            <Image
              src="/signup_bg.png"
              alt="Dotted"
              className="h-full w-full"
              height="1000"
              sizes="(max-width: 768px) 100vw, 100vw"
              width="1000"
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
            {step == 1 && (
              <SendOtp
                username={username}
                setUsername={setUsername}
                step={step}
                setStep={setStep}
                setDetails={setDetails}
              />
            )}
            {step == 2 && (
              <>
                <Verification
                  type={'Forget'}
                  username={username}
                  details={details}
                  step={step}
                  setStep={setStep}
                  setAccessToken={setAccessToken}
                />
              </>
            )}
            {step == 3 && (
              <div>
                <ChangePassword token={accessToken} step={step} setStep={setStep} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default ForgotPasswordPage;
