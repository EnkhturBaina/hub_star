import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const PolicyPage: NextPage = () => {
  return <MainLayout>Hello нууцлалын бодлого</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default PolicyPage;
