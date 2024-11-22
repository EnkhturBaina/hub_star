import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const FeedbackPage: NextPage = () => {
  return <MainLayout>Hello санал хүсэлт илгээх</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default FeedbackPage;
