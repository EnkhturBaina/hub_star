import { useAppContext } from '@/app/app-context';
import ProfileLayout from '@/layouts/profile.layout';
import docSvg from '@/public/images/notification/docSvg.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ReferenceService } from '@/service/reference/reference.service';
import { RefNotification } from '@/types/reference';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { NextPage } from 'next';
import Empty from '@/components/Empty';
import withAuth from '@/components/Common/withAuth';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';

const Notification: NextPage = () => {
  const { user } = useAppContext();
  const [notifications, setNotifications] = useState<RefNotification[]>([]);

  const getData = useCallback(async () => {
    await ReferenceService.getNotification({
      receiveBy: user?.id,
    }).then(res => {
      if (res.success) {
        setNotifications(res.response);
      }
    });
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSeen = async (notification: RefNotification) => {
    if (!notification.isSeen) {
      await ReferenceService.updateNotification(notification.id, {
        ...notification,
        isSeen: true,
      }).then(res => {
        if (res.success) {
          getData();
        }
      });
    }
  };

  const handleReceive = async (notification: RefNotification) => {
    if (notification.type == 'APPROVE') {
      await ReferenceService.createParticipant({
        userType: notification.advertisement.userType == 'SUBSCRIBER' ? 'EXECUTOR' : 'SUBSCRIBER',
        advertisementId: notification.advertisementId,
        userBy: notification.receiveBy,
      });
      await AdvertisementService.update({ id: notification.advertisementId, process: 'DOING' });
    }
    await ReferenceService.createNotification(notification)
      .then(res => {
        if (res.success) {
          toast.success('Амжилттай үйлчилгээний төлөв солигдлоо');
        }
      })
      .catch(err => {
        toast.error(err);
      });
  };
  return (
    <ProfileLayout>
      <div className="mb-4 w-full overflow-hidden p-2">
        {notifications.length == 0 ? (
          <Empty />
        ) : (
          <div className="notifications">
            {notifications.map((item, index) => (
              <Fragment key={index}>
                <div className={`notification ${item.isSeen ? 'seen' : 'unseen'}`}>
                  <div className="content">
                    <div
                      className="docImg md:p-auto !p-2"
                      onClick={() => {
                        handleSeen(item);
                      }}
                    >
                      <Image
                        src={docSvg}
                        color="red"
                        width={24}
                        height={24}
                        alt="sada"
                        className="md:w-auto md:h-auto !max-w-[24px] !max-h-[24px] "
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="desc md:!text-base !text-sm">{item.description}</p>
                      <Button
                        radius="full"
                        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                        onClick={() =>
                          handleReceive({
                            ...item,
                            description: 'Таны захиалгыг зөвшөөрлөө.',
                            receiveBy: item.createdBy,
                            type: 'APPROVE',
                            id: 0,
                          })
                        }
                      >
                        Зөвшөөрөх
                      </Button>
                      <Button
                        radius="full"
                        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                        onClick={() =>
                          handleReceive({
                            advertisementId: item.advertisementId,
                            description: 'Таны захиалгаас татгалзлаа',
                            receiveBy: item.createdBy,
                            type: 'IGNORE',
                            id: 0,
                          })
                        }
                      >
                        Татгалзах
                      </Button>
                      <Link href={'/profile/information'} className="desc md:!text-base !text-sm">
                        {item.createdUser.lastName.substring(0, 1) +
                          '.' +
                          item.createdUser.firstName}
                      </Link>
                    </div>
                  </div>
                  <p className="nofi-time !mr-1 sm:!p-auto !px-1.5 !py-0.5 md:!text-base text-sm">
                    {format(item.createdAt, 'HH:mm')}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-[#DADADA]" />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default withAuth(Notification);
