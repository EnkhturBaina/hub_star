import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const IntroductionPage: NextPage = () => {
  return <MainLayout>Hello Үйлчилгээний танилцуулга</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default IntroductionPage;
