import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const NewsPage: NextPage = () => {
  return <MainLayout>'Hello news'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default NewsPage;
