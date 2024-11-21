import MainLayout from '@components/layouts/main';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@typeDefs/site';

const ContactPage: NextPageWithLayout = () => {
  return 'Hello холбоо барих';
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ContactPage;
