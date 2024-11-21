import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const LegallyPage: NextPageWithLayout = () => {
  return 'Hello хууль эрх зүй';
};

LegallyPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default LegallyPage;
