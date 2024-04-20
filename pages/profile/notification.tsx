import { useAppContext } from '@/app/app-context';
import ProfileLayout from '@/layouts/profile.layout';
import { Button } from '@nextui-org/react';
import docSvg from '@/public/images/notification/docSvg.svg';
import Image from 'next/image';
import { format } from 'date-fns';
const Notification = () => {
  const { notifications } = useAppContext();

  return (
    <ProfileLayout>
      <div className="mb-4 w-full overflow-hidden">
        <div className="notifications">
          {notifications.map((item, index) => (
            <>
              <div key={index} className={`notification ${item.isSeen ? 'seen' : 'unseen'}`}>
                <div className="content">
                  <div className="docImg">
                    <Image src={docSvg} color="red" width={24} height={24} alt="sada" />
                  </div>
                  <p className="desc">{item.description}</p>
                </div>
                <p className="nofi-time">{format(item.createdAt, 'HH:mm')}</p>
              </div>
              <div className="w-full h-[1px] bg-[#DADADA]" />
            </>
          ))}
        </div>
        <Button onClick={() => {}}>Холболт</Button>
      </div>
    </ProfileLayout>
  );
};

export default Notification;
