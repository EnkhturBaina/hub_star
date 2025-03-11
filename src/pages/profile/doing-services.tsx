import React from 'react';
import withAuth from '@components/atoms/withAuth';
import DoingServices from '@components/molecules/Profile/Content/DoingServices';
import ProfileLayout from '@components/molecules/Profile/ProfileLayout';
import { useAuthState } from '@context/auth';

const DoingServicePage = () => {
  const { user } = useAuthState();
  return (
    <ProfileLayout>
      <DoingServices userId={user?.id} />
    </ProfileLayout>
  );
};

export default withAuth(DoingServicePage);
