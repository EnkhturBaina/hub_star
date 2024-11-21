import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const AdListPage: NextPageWithLayout = () => {
  return 'Hello ad list';
};

AdListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default AdListPage;
