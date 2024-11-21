import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const SaveAdPage: NextPageWithLayout = () => {
  return 'Hello save ad';
};

SaveAdPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default SaveAdPage;
