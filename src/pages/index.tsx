import React from 'react';
import Hero from '@components/molecules/Hero';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const HomePage: NextPage = () => {
  const t = useTranslations('home');
  return (
    <>
      <Head>
        <title>{`${t('home')} | Hub Star`}</title>
      </Head>
      <main>
        <Hero />
      </main>
    </>
  );
};

export default HomePage;
