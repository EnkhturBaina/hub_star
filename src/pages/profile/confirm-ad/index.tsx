import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const ConfirmAdPage: NextPageWithLayout = () => {
  return 'Hello save ad';
};

ConfirmAdPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ConfirmAdPage;
