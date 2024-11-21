import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const MembershipPage: NextPageWithLayout = () => {
  return 'Hello хамтран ажиллах';
};

MembershipPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MembershipPage;
