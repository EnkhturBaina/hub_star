import MainLayout from '@components/layouts/main';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import React from 'react';

const ContactPage: NextPage = () => {
  return <MainLayout>'Hello холбоо барих'</MainLayout>;
};
export const getStaticProps = withTranslationProps();
export default ContactPage;
