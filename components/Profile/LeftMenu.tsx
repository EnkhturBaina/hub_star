'use client';
import React, { useContext } from 'react';
import { MenuItem, Menu, Label } from 'semantic-ui-react';
import { Divider } from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';
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

const profileRoutes: ProfileRoute[] = [
  {
    id: 1,
    name: 'Профайл',
    url: '/profile/information',
  },
  // {
  //   id: 2,
  //   name: 'Мессенжер',
  //   url: '/profile/messenger',
  // },
  {
    id: 2,
    name: 'Үйлчилгээ байршуулах',
    url: '/profile/post-service',
  },
  {
    id: 3,
    name: 'Байршуулсан үйлчилгээ',
    url: '/profile/posted-services',
  },
  {
    id: 4,
    name: 'Хийгдэж буй ажил',
    url: '/profile/doing-services',
  },
  {
    id: 5,
    name: 'Хадгалагдсан үйлчилгээнүүд',
    url: '/profile/saved-services',
  },
  {
    id: 6,
    name: 'Үйлчилгээний түүх',
    url: '/profile/service-history',
  },
  {
    id: 7,
    name: 'Дансны мэдээлэл',
    url: '/profile/account',
  },
  {
    id: 8,
    name: 'Баталгаажуулалт',
    url: '/profile/confirmation',
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
  const handleItemClick = (item: ProfileRoute) => {
    router.push(item.url);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              className={`!m-2 !rounded-xl ${
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
          onClick={onOpen}
          className={`!m-2 !flex !items-center !justify-between !rounded-xl !py-2 !leading-loose ${
            pathUrl == 'logout' ? '!bg-mainColor !text-white' : '!text-red-600'
          }`}
        >
          Системээс гарах
          <Label className="!bg-transparent">
            <CiLogout className="text-2xl !text-red-600" />
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
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LeftMenu;
