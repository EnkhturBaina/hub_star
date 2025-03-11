import React from 'react';
import Signin from '@components/molecules/Auth/Signin';
import { Metadata, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const metadata: Metadata = {
  title: 'Hub star',
  description: 'All at once',
  // other metadata
};
const SigninPage: NextPage = () => {
  return <Signin />;
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default SigninPage;
