import { useAppContext } from '@/app/app-context';
import ProfileLayout from '@/layouts/profile.layout';
import docSvg from '@/public/images/notification/docSvg.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ReferenceService } from '@/service/reference/reference.service';
import { RefNotification } from '@/types/reference';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { Advertisement } from '@/types/advertisement';
import toast, { Toaster } from 'react-hot-toast';
import { NextPage } from 'next';
import Empty from '@/components/Empty';
import withAuth from '@/components/Common/withAuth';

const Notification: NextPage = () => {
  const { user } = useAppContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notifications, setNotifications] = useState<RefNotification[]>([]);
  const [notification, setNotification] = useState<RefNotification>();
  const [advertisement, setAdvertisement] = useState<Advertisement>();

  const getData = useCallback(async () => {
    await ReferenceService.getNotification({
      authorId: user?.id,
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
    if (notification.process == 'DOING') {
      onOpen();
      setNotification(notification);
      await AdvertisementService.getById(notification.advertisementId).then(res => {
        if (res.success) {
          setAdvertisement(res.response);
        }
      });
    }
  };

  const handleApprove = async () => {
    await AdvertisementService.update({
      ...advertisement,
      process: 'DOING',
      doingBy: notification.createdBy,
    }).then(res => {
      if (res.success) {
        toast.success('Амжилттай үйлчилгээний төлөв солигдлоо');
        ReferenceService.createNotification({
          id: 0,
          authorId: notification.createdBy,
          advertisementId: advertisement.id,
          process: 'CREATED',
          description: 'Таны захиалгыг хүлээн авлаа. Баяр хүргэе.',
        });
      }
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Захиалга зөвшөөрөх</ModalHeader>
              <ModalBody>
                <p>{advertisement?.title}</p>
                <p>{advertisement?.desciption}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Татгалзах
                </Button>
                <Button color="primary" onPress={onClose} onClick={() => handleApprove()}>
                  Зөвшөөрөх
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ProfileLayout>
  );
};

export default withAuth(Notification);
