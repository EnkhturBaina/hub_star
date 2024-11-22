import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const MyNotificationPage: NextPage = () => {
  return <MainLayout>Hello my notification</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default MyNotificationPage;
