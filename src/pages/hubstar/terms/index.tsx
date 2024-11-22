import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const TermsPage: NextPage = () => {
  return <MainLayout>'Hello terms of service'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default TermsPage;
