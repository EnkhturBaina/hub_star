
import ProfileLayout from '@/layouts/profile.layout';
import { useAppContext } from '@/app/app-context';
import withAuth from '@/components/Common/withAuth';
import DoingServices from '@/components/Profile/Content/DoingServices';

const DoingServicePage = () => {
  const { user } = useAppContext();
  return (
    <ProfileLayout>
      <DoingServices userId={user?.id} />
    </ProfileLayout>
  );
};

export default withAuth(DoingServicePage);
