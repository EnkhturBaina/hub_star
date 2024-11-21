import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const FeedbackPage: NextPageWithLayout = () => {
  return 'Hello санал хүсэлт илгээх';
};

FeedbackPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default FeedbackPage;
