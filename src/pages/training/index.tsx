import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const TrainingPage: NextPageWithLayout = () => {
  return 'Hello Хэрэглэх заавар';
};

TrainingPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TrainingPage;
