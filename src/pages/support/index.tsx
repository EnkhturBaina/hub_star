import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const SupportPage: NextPage = () => {
  return <MainLayout>Hello тусламж</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default SupportPage;
