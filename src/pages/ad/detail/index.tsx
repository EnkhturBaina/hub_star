import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const AdPage: NextPage = () => {
  return <MainLayout>'Hello ad detail'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default AdPage;
