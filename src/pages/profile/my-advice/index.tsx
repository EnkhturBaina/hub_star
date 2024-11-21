import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const MyAdvicePage: NextPageWithLayout = () => {
  return 'Hello change password';
};

MyAdvicePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MyAdvicePage;
