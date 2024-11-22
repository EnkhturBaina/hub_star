import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const PermissionPage: NextPage = () => {
  return <MainLayout>'Hello тусгай зөвшөөрөл'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default PermissionPage;
