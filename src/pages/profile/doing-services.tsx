import React from 'react';
import withAuth from '@components/atoms/withAuth';
import DoingServices from '@components/molecules/Profile/Content/DoingServices';
import { useAuthState } from '@context/auth';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const DoingServicePage = () => {
  const t = useTranslations('profile');
  const { user } = useAuthState();
  return (
    <>
      <Head>
        <title>{t('doingService')} | Hub Star</title>
      </Head>
      <DoingServices userId={user?.id} />
    </>
  );
};

export default withAuth(DoingServicePage);
