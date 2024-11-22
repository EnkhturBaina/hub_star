import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const LegallyPage: NextPage = () => {
  return <MainLayout>'Hello хууль эрх зүй'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default LegallyPage;
