import { useAppContext } from '@/app/app-context';
import ProfileLayout from '@/layouts/profile.layout';
import docSvg from '@/public/images/notification/docSvg.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ReferenceService } from '@/service/reference/reference.service';
import { RefNotification } from '@/types/reference';
import { Modal, ModalContent } from 'semantic-ui-react';
import { NextPage } from 'next';

const Notification: NextPage = () => {
  const { user } = useAppContext();
  const [notifications, setNotifications] = useState<RefNotification[]>([]);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const getData = useCallback(async () => {
    await ReferenceService.getNotification({
      authorId: user.id,
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
    await ReferenceService.updateNotification(notification.id, {
      ...notification,
      isSeen: true,
    }).then(res => {
      if (res.success) {
        getData();
      }
    });
    setIsConfirm(true);
  };

  return (
    <ProfileLayout>
      <div className="mb-4 w-full overflow-hidden">
        <div className="notifications">
          {notifications.map((item, index) => (
            <Fragment key={index}>
              <div
                className={`notification ${item.isSeen ? 'seen' : 'unseen'}`}
                onClick={() => {
                  handleSeen(item);
                }}
              >
                <div className="content">
                  <div className="docImg">
                    <Image src={docSvg} color="red" width={24} height={24} alt="sada" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="desc">{item.subject}</p>
                    <p className="desc">{item.description}</p>
                    <Link href={'/profile/information'} className="desc">
                      {item.createdUser.lastName.substring(0, 1) + '.' + item.createdUser.firstName}
                    </Link>
                  </div>
                </div>
                <p className="nofi-time">{format(item.createdAt, 'HH:mm')}</p>
              </div>
              <div className="w-full h-[1px] bg-[#DADADA]" />
            </Fragment>
          ))}
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isConfirm}
        onOpenChange={() => {}}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {/* {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Та системээс гарах уу?</ModalHeader>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Хаах
                </Button>
                <Button
                  className="rounded-xl bg-mainColor font-bold leading-none text-white"
                  onPress={() => {
                    onClose();
                    AuthService.logout().then(response => {
                      if (response.success) {
                        removeAccessToken();
                        router.push('/');
                      }
                    });
                  }}
                >
                  Гарах
                </Button>
              </ModalFooter>
            </>
          )} */}
        </ModalContent>
      </Modal>
    </ProfileLayout>
  );
};

export default Notification;
