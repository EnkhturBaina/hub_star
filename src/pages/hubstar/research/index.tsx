import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const ResearchPage: NextPageWithLayout = () => {
  return 'Hello нийтлэг хайлт';
};

ResearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ResearchPage;
