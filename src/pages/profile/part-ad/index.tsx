import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const PartAdPage: NextPageWithLayout = () => {
  return 'Hello part ad';
};

PartAdPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PartAdPage;
