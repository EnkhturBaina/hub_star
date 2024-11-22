import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const TrainingNewAdPage: NextPage = () => {
  return <MainLayout>Hello суртчилгаа байршуулах</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default TrainingNewAdPage;
