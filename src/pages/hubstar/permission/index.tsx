import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const PermissionPage: NextPageWithLayout = () => {
  return 'Hello тусгай зөвшөөрөл';
};

PermissionPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PermissionPage;
