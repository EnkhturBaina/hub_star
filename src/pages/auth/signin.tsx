import React from 'react';
import Signin from '@components/molecules/Auth/Signin';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Hub star',
  description: 'All at once',
  // other metadata
};
const SigninPage: NextPage = () => {
  return <Signin />;
};
export default SigninPage;
