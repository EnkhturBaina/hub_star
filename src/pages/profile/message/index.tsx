import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const MessagePage: NextPage = () => {
  return <MainLayout>'Hello message'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default MessagePage;
