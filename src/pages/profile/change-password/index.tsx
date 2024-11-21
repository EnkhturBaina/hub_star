import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const ChangePasswordPage: NextPageWithLayout = () => {
  return 'Hello change password';
};

ChangePasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ChangePasswordPage;
