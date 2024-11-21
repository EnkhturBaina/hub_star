import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const MyAdPage: NextPageWithLayout = () => {
  return 'Hello my ad';
};

MyAdPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MyAdPage;
