import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const FaqPage: NextPageWithLayout = () => {
  return 'Түгээмэл асуулт хариулт';
};

FaqPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default FaqPage;
