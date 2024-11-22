import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const AboutPage: NextPage = () => {
  return <MainLayout>'Бидний тухай'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default AboutPage;
