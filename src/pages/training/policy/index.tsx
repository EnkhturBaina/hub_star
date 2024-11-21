import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const PolicyPage: NextPageWithLayout = () => {
  return 'Hello нууцлалын бодлого';
};

PolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PolicyPage;
