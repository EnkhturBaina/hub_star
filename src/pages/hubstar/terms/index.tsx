import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const TermsPage: NextPageWithLayout = () => {
  return 'Hello terms of service';
};

TermsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TermsPage;
