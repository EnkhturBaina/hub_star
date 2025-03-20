import React from 'react';
import withAuth from '@components/atoms/withAuth';
import DoingServices from '@components/molecules/Profile/Content/DoingServices';
import { useAuthState } from '@context/auth';

const DoingServicePage = () => {
  const { user } = useAuthState();
  return <DoingServices userId={user?.id} />;
};

export default withAuth(DoingServicePage);
