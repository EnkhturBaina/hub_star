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

  const handleUpdate = async (notification: RefNotification) => {
    await ReferenceService.updateNotification(notification.id, {
      ...notification,
      isSeen: true,
    }).then(res => {
      if (res.success) {
        getData();
      }
    });
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
                        handleUpdate(item);
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
                    <div className="flex flex-col gap-2 justify-center items-start">
                      <p className="desc md:!text-base !text-sm">{item.description}</p>

                      <Link href={'/profile/information'} className="desc md:!text-base !text-sm">
                        {item.createdUser.lastName.substring(0, 1) +
                          '.' +
                          item.createdUser.firstName}
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <p className="w-fit nofi-time-end !mr-1 sm:!p-auto !px-1.5 !py-0.5 md:!text-base text-sm">
                      {format(item.createdAt, 'HH:mm')}
                    </p>
                    {item.type === 'ORDER' && (
                      <div className="flex gap-2 mr-2">
                        <Button
                          size="sm"
                          radius="full"
                          className="w-fit rounded-md bg-red-400 font-bold leading-none text-white"
                          onClick={() => {
                            handleUpdate({ ...item, type: 'IGNORE' });
                            handleReceive({
                              advertisementId: item.advertisementId,
                              description: 'Таны захиалгаас татгалзлаа',
                              receiveBy: item.createdBy,
                              type: 'IGNORE',
                              id: 0,
                            });
                          }}
                        >
                          Татгалзах
                        </Button>
                        <Button
                          size="sm"
                          radius="full"
                          className="w-fit rounded-md bg-blue-500 font-bold leading-none text-white"
                          onClick={() => {
                            handleUpdate({ ...item, type: 'APPROVE' });
                            handleReceive({
                              ...item,
                              description: 'Таны захиалгыг зөвшөөрлөө.',
                              receiveBy: item.createdBy,
                              type: 'APPROVE',
                              id: 0,
                            });
                          }}
                        >
                          Зөвшөөрөх
                        </Button>
                      </div>
                    )}
                    {item.type == 'APPROVE' && (
                      <strong className="text-base text-gray-400 mr-4">Зөвшөөрсөн</strong>
                    )}
                    {item.type == 'IGNORE' && (
                      <strong className="text-base text-gray-400 mr-4">Татгалзсан</strong>
                    )}
                  </div>
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
