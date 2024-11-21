import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const IntroductionPage: NextPageWithLayout = () => {
  return 'Hello Үйлчилгээний танилцуулга';
};

IntroductionPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default IntroductionPage;
