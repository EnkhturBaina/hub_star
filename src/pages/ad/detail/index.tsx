import MainLayout from '@components/layouts/main';
import CategoryNav from '@components/navbar/category';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';
import { useTranslation } from 'next-i18next';

const AdPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <CategoryNav />
      'hello ad info'
    </MainLayout>
  );
};
export const getStaticProps = withTranslationProps();
export default AdPage;
