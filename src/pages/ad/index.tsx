import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const AdListPage: NextPage = () => {
  return <MainLayout>'Hello ad list'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default AdListPage;
