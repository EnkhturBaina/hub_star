import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const NewAdPage: NextPage = () => {
  return <MainLayout>Hello new ad</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default NewAdPage;
