import { useAppContext } from '@/app/app-context';
import ProfileLayout from '@/layouts/profile.layout';
import { Button } from '@nextui-org/react';
const Notification = () => {
  const { notifications } = useAppContext();
  return (
    <ProfileLayout>
      <div className="mb-4 w-full overflow-hidden">
        {notifications.map(item => item.description)}
        <Button onClick={() => {}}>Холболт</Button>
      </div>
    </ProfileLayout>
  );
};

export default Notification;
