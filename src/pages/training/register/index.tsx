import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const RegisterPage: NextPageWithLayout = () => {
  return 'Hello хэрхэн бүртгэл хийх талаар заавар';
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default RegisterPage;
