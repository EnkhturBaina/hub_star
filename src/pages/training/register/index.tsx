import MainLayout from '@components/layouts/main';
import React from 'react';
import { NextPage } from 'next';
import { withTranslationProps } from '@utils/withTranslationProps';

const RegisterPage: NextPage = () => {
  return <MainLayout>Hello хэрхэн бүртгэл хийх талаар заавар</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default RegisterPage;
