import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const ResearchPage: NextPage = () => {
  return <MainLayout>'Hello нийтлэг хайлт'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default ResearchPage;
