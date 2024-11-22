import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const ConfirmAdPage: NextPage = () => {
  return <MainLayout>'Hello save ad'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default ConfirmAdPage;
