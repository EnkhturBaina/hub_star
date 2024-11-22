import MainLayout from '@components/layouts/main';
import React from 'react';
import { NextPage } from 'next';
import { withTranslationProps } from '@utils/withTranslationProps';

const ChangePasswordPage: NextPage = () => {
  return <MainLayout>Hello change password</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default ChangePasswordPage;
