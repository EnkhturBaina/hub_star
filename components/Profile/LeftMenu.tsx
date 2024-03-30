'use client';
import React, { useContext } from 'react';
import { MenuItem, Menu, Label } from 'semantic-ui-react';
import MenuList from './MenuList';
import { Divider } from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { AuthService } from '@/service/authentication/authentication.service';
import { setAccessToken } from '@/service/api.service';

const LeftMenu = ({
  selectedMenu,
  setSelectedMenu,
}: {
  selectedMenu: any;
  setSelectedMenu: any;
}) => {
  const handleItemClick = (e, { name }) => {
    setSelectedMenu(name);
  };
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full rounded-xl bg-white px-1 py-2 dark:border-default-100">
      <Menu vertical borderless fluid className="!border-0 !shadow-none">
        {MenuList.map((el, index) => {
          return (
            <MenuItem
              key={index}
              name={el.key}
              active={selectedMenu === el.key}
              onClick={handleItemClick}
              className={`!m-2 !rounded-xl ${
                selectedMenu == el.key ? '!bg-mainColor !text-white' : '!text-gray-500'
              }`}
            >
              {el.title}
            </MenuItem>
          );
        })}
        <Divider className="mx-auto w-11/12" />
        <MenuItem
          name="logout"
          onClick={onOpen}
          className={`!m-2 !flex !items-center !justify-between !rounded-xl !py-2 !leading-loose ${
            selectedMenu == 'logout' ? '!bg-mainColor !text-white' : '!text-red-600'
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
                        setAccessToken('');
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
