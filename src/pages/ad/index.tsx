import MainLayout from '@components/layouts/main';
import CategoryNav from '@components/navbar/category';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const AdListPage: NextPage = () => {
  return (
    <MainLayout>
      <CategoryNav />
      'Hello ad list'
    </MainLayout>
  );
};
export const getStaticProps = withTranslationProps();
export default AdListPage;
