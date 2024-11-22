import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const MembershipPage: NextPage = () => {
  return <MainLayout>Hello хамтран ажиллах</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default MembershipPage;
