import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const PartAdPage: NextPage = () => {
  return <MainLayout>Hello part ad</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default PartAdPage;
