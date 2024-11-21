import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const TrainingNewAdPage: NextPageWithLayout = () => {
  return 'Hello суртчилгаа байршуулах';
};

TrainingNewAdPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TrainingNewAdPage;
