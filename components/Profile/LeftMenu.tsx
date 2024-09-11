'use client';
import React, { useState } from 'react';
import { MenuItem, Menu, Label } from 'semantic-ui-react';
import { Divider, Input, ModalBody } from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { AuthService } from '@/service/authentication/authentication.service';
import { removeAccessToken } from '@/service/api.service';
import { ProfileRoute } from '@/types/reference';
import { useAppContext } from '@/app/app-context';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';

const profileRoutes: ProfileRoute[] = [
  {
    id: 1,
    name: 'Профайл',
    url: '/profile/information',
  },
  {
    id: 2,
    name: 'Баталгаажуулалт',
    url: '/profile/confirmation',
  },
  // {
  //   id: 2,
  //   name: 'Мессенжер',
  //   url: '/profile/messenger',
  // },
  {
    id: 3,
    name: 'Үйлчилгээ байршуулах',
    url: '/profile/post-service',
  },
  {
    id: 4,
    name: 'Байршуулсан үйлчилгээ',
    url: '/profile/posted-services',
  },
  {
    id: 5,
    name: 'Хийгдэж буй ажил',
    url: '/profile/doing-services',
  },
  {
    id: 6,
    name: 'Хадгалагдсан үйлчилгээнүүд',
    url: '/profile/saved-services',
  },
  {
    id: 7,
    name: 'Үйлчилгээний түүх',
    url: '/profile/service-history',
  },
  {
    id: 8,
    name: 'Дансны мэдээлэл',
    url: '/profile/account',
  },
  {
    id: 9,
    name: 'Нууц үг',
    url: '/profile/password',
  },
  {
    id: 10,
    name: 'Мэдэгдэл',
    url: '/profile/notification',
  },
  {
    id: 11,
    name: 'Зөвлөмжүүд',
    url: '/profile/advices',
  },
];
const LeftMenu = () => {
  const router = useRouter();
  const pathUrl = usePathname();
  const [delValue, setDelValue] = useState<string>();
  const { user } = useAppContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelModal,
    onOpen: onOpenDelModal,
    onOpenChange: onOpenDelChange,
  } = useDisclosure();

  const handleItemClick = (item: ProfileRoute) => {
    router.push(item.url);
  };

  return (
    <div className="w-full rounded-xl bg-white px-1 py-2 dark:border-default-100">
      <Menu vertical borderless fluid className="!border-0 !shadow-none">
        {profileRoutes.map((el, index) => {
          return (
            <MenuItem
              key={index}
              name={el.url}
              active={pathUrl == el.url}
              onClick={() => handleItemClick(el)}
              className={`!m-2 !rounded-xl lg:text-base text-sm ${
                pathUrl == el.url ? '!bg-mainColor !text-white' : '!text-gray-500'
              }`}
            >
              {el.name}
            </MenuItem>
          );
        })}
        <Divider className="mx-auto w-11/12" />
        <MenuItem
          name="logout"
          onClick={onOpenDelModal}
          className={`!m-2 !flex !items-center !justify-between !rounded-xl !py-2 !leading-loose ${
            pathUrl == 'logout' ? '!bg-mainColor !text-white' : '!text-red-500 !font-semibold'
          }`}
        >
          Профайл устгах
          <Label className="!bg-transparent">
            <CiLogout className="text-2xl !text-red-500" />
          </Label>
        </MenuItem>
        <MenuItem
          name="logout"
          onClick={onOpen}
          className={`!m-2 !flex !items-center !justify-between !rounded-xl !py-2 !leading-loose ${
            pathUrl == 'logout' ? '!bg-mainColor !text-white' : '!text-green-500 !font-semibold'
          }`}
        >
          Системээс гарах
          <Label className="!bg-transparent">
            <CiLogout className="text-2xl !text-green-600" />
          </Label>
        </MenuItem>
      </Menu>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Та системээс гарах уу?</ModalHeader>
              <ModalFooter className="w-full flex justify-start items-center pl-0">
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
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop="opaque"
        isOpen={isOpenDelModal}
        onOpenChange={onOpenDelChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Та дараах 448302 тоог оруулаад `Устгах` товчийг дарна уу?
              </ModalHeader>
              <ModalBody>
                <Input value={delValue} onChange={e => setDelValue(e.target.value)} />
              </ModalBody>
              <ModalFooter className="w-full flex justify-start items-center pl-0">
                <Button color="default" variant="light" onPress={onClose}>
                  Хаах
                </Button>
                <Button
                  className="rounded-xl bg-mainColor font-bold leading-none text-white"
                  isDisabled={delValue !== '448302'}
                  onPress={() => {
                    onClose();
                    AdvertisementService.get({
                      userBy: user.id,
                      process: 'DOING',
                      order: 'ASC',
                      page: 1,
                      limit: 10,
                    }).then(res => {
                      if (res.success && res.response.meta.itemCount == 0) {
                        AuthService.removeUser(user.id).then(response => {
                          if (response.success) {
                            removeAccessToken();
                            router.push('/auth/signin');
                          }
                        });
                      } else {
                        toast.error('Хийгдэж буй ажил байгаа тул устгах боломжгүй байна!');
                      }
                    });
                  }}
                >
                  Устгах
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LeftMenu;
