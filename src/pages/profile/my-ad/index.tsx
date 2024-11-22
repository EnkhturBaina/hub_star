import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const MyAdPage: NextPage = () => {
  return <MainLayout>'Hello my ad'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default MyAdPage;
