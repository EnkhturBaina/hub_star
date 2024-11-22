import MainLayout from '@components/layouts/main';
import React from 'react';
import { NextPage } from 'next';
import { withTranslationProps } from '@utils/withTranslationProps';

const TrainingPage: NextPage = () => {
  return <MainLayout>'Hello Хэрэглэх заавар'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default TrainingPage;
