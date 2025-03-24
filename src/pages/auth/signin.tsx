import React from 'react';
import Signin from '@components/molecules/Auth/Signin';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const SigninPage: NextPage = () => {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t('login')} | Hub Star</title>
      </Head>
      <Signin />
    </>
  );
};
export default SigninPage;
