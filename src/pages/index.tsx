import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const HomePage: NextPage = () => {
  return <MainLayout>Hello</MainLayout>;
};

export const getStaticProps = withTranslationProps();
export default HomePage;
