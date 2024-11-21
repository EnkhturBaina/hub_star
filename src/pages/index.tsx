import MainLayout from '@components/layouts/main';
import { NextPageWithLayout } from '@typeDefs/site';
import React, { ReactElement } from 'react';

const HomePage: NextPageWithLayout = () => {
  return 'Hello';
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default HomePage;
