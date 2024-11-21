import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const MyNotificationPage: NextPageWithLayout = () => {
  return 'Hello change password';
};

MyNotificationPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MyNotificationPage;
