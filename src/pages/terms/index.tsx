import Terms from '@components/atoms/terms';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';

const TermPage: NextPage = () => {
  const t = useTranslations('terms');
  return (
    <>
      <Head>
        <title>{t('terms')} | Hub Star</title>
      </Head>
      <section className="xl:pt-18">
        <Terms />
      </section>
    </>
  );
};
export default TermPage;
