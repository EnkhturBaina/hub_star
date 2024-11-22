import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const ConfirmationPage: NextPage = () => {
  return <MainLayout>'Hello confirm'</MainLayout>;
};

export const getStaticProps = withTranslationProps();
export default ConfirmationPage;
