import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const ConfirmationPage: NextPageWithLayout = () => {
  return 'Hello confirm';
};

ConfirmationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ConfirmationPage;
