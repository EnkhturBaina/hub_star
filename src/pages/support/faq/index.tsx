import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const FaqPage: NextPage = () => {
  return <MainLayout>Түгээмэл асуулт хариулт</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default FaqPage;
