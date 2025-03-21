import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RefNotification } from '@typeDefs/reference';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { NextPage } from 'next';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import AdvertisementService from '@services/advertisement';
import { useAuthState } from '@context/auth';
import IApiResponse from '@typeDefs/response';
import { useSocket } from '@context/socketContext';
import moment from 'moment';

const Notification: NextPage = () => {
  const { user } = useAuthState();
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<RefNotification[]>([]);

  useEffect(() => {
    loadData();
  }, [user, socket]);

  const loadData = async () => {
    try {
      const result: IApiResponse = await AdvertisementService.getNotification({
        receiveBy: user?.id,
      });
      if (result.success) {
        setNotifications(result.response);
      }
    } catch (error) {
      console.log('noop notification =>', error);
    }
  };
  const handleUpdate = async (notification: RefNotification) => {
    try {
      const result = await AdvertisementService.updateNotification(notification.id, {
        ...notification,
        isSeen: true,
      });
      if (result.success) {
        await loadData();
      }
    } catch (error) {
      console.log('noop update advertisement =>', error);
    }
  };

  const handleReceive = async (notification: RefNotification) => {
    if (notification.type == 'APPROVE') {
      await AdvertisementService.createParticipant({
        userType: notification.advertisement.userType == 'SUBSCRIBER' ? 'EXECUTOR' : 'SUBSCRIBER',
        advertisementId: notification.advertisementId,
        userBy: notification.receiveBy,
      });
      await AdvertisementService.update({ id: notification.advertisementId, process: 'DOING' });
    }
    await AdvertisementService.createNotification(notification)
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
    <div className="mb-4 w-full overflow-hidden p-2">
      {notifications.length == 0 ? (
        <Empty />
      ) : (
        <div className="notifications">
          {notifications.map((item, index) => (
            <Fragment key={index}>
              <div className={`notification ${item.isSeen ? 'seen' : 'unseen'}`}>
                <div className="content">
                  <div className="docImg md:p-auto !p-2" onClick={() => handleUpdate(item)}>
                    <Image
                      src="/images/notification/docSvg.svg"
                      color="red"
                      width={24}
                      height={24}
                      alt="sada"
                      className="md:w-auto md:h-auto !max-w-[24px] !max-h-[24px] "
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-start">
                    <p className="desc md:!text-base !text-sm">{item.description}</p>

                    <Link
                      href={{
                        pathname: '/other-profile',
                        query: { item: item?.createdUser?.id },
                      }}
                      className="desc md:!text-base !text-sm"
                    >
                      {item.createdUser?.lastName?.substring(0, 1) +
                        '.' +
                        item.createdUser?.firstName}
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <p className="w-fit nofi-time-end !mr-1 sm:!p-auto !px-1.5 !py-0.5 md:!text-base text-sm">
                    {moment(item.createdAt).format('HH:mm')}
                  </p>
                  {item.type === 'ORDER' && (
                    <div className="flex gap-2 mr-2">
                      <Button
                        size="sm"
                        radius="full"
                        className="w-fit rounded-md bg-red-400 font-bold leading-none text-white"
                        onPress={() => {
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
                        onPress={() => {
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
  );
};

export default withAuth(Notification);
