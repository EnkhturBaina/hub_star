'use client';
import LeftMenu from '@components/molecules/Profile/LeftMenu';
import React, { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuChevronLeft, LuLayoutGrid, LuMenu } from 'react-icons/lu';
import AuthName from '@components/molecules/Auth/auth-name';
// import Image from 'next/image';
import ImageUpload from '@components/molecules/Image/image-upload';
import { Users } from '@typeDefs/user';
import { AuthService } from '@services/authentication/authentication.service';
import toast from 'react-hot-toast';
import { useAuthState } from '@context/auth';
import { Image } from '@heroui/react';

type Props = {
  children: React.ReactNode;
};
const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const [visible, setVisible] = useState(false);

  const sideBarRef = useRef(null);

  const saveUserImage = (value: Users) => {
    AuthService.updateById(user.id, value).then(response => {
      if (response.success) {
        setUser(response.response);
        toast.success('Амжилттай хадгаллаа');
      }
    });
  };
  if (!user) {
    return null;
  } else {
    return (
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <div className="flex flex-col rounded-xl bg-white">
            <ImageUpload
              className="cursor-pointer relative h-64 w-full bg-cover bg-center"
              setFileId={coverId => {
                saveUserImage({ ...user, coverId });
              }}
            >
              <Image
                src={
                  user.coverId
                    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user.coverId}`
                    : '/images/profile_bg.jpg'
                }
                alt={'ковер'}
                removeWrapper
                className="z-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-8 right-8">
                <div className="bg-gray-300 text-base bg-opacity-60 text-white flex flex-row items-center rounded px-4 py-1 min-w-max">
                  <FaCamera className="text-lg mr-3" />
                  Дэвсгэр зураг солих
                </div>
              </div>
            </ImageUpload>

            <div className="w-[90%] mx-auto h-[110px] py-2 relative">
              <div className="w-[120px] h-[120px] absolute left-0 -top-[50%] shadow-sm shadow-black/50 rounded-full">
                <Image
                  alt=""
                  removeWrapper
                  className="w-full h-full z-10 rounded-full object-cover bg-cover"
                  src={
                    user.avatarId
                      ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user.avatarId}`
                      : '/images/user/user.png'
                  }
                />
                <ImageUpload
                  className="z-20 absolute right-2 bottom-2 cursor-pointer rounded-full bg-gray-100 p-2 text-black shadow-md shadow-black/20 "
                  setFileId={avatarId => {
                    saveUserImage({ ...user, avatarId });
                  }}
                >
                  <FaCamera className="text-2xl" />
                </ImageUpload>
              </div>
              <div className="flex flex-col justify-center text-start ml-[124px]">
                <span className="mb-0 md:text-2xl text-xl font-bold text-black md:mb-2 uppercase">
                  <AuthName user={user} />
                </span>
                <span className="text-lg ml-3 mr-5">{user.jobPosition}</span>
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-xl gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 flex-row"
        >
          <div
            className="ml-4 w-fit rounded-xl bg-white p-4 md:hidden"
            onClick={() => {
              setVisible(true);
            }}
          >
            <LuMenu className="text-2xl" />
          </div>
          <div className="hidden md:block md:w-1/4">
            <LeftMenu />
          </div>
          <Sidebar
            animation="overlay"
            icon="labeled"
            onHide={() => setVisible(false)}
            visible={visible}
            width="wide"
            className="!bg-white"
            ref={sideBarRef}
          >
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-row items-center justify-center">
                <LuLayoutGrid className="text-2xl" />
                <span className="ml-3 font-bold">Меню</span>
              </div>
              <LuChevronLeft className="text-2xl" onClick={() => setVisible(false)} />
            </div>
            <LeftMenu />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">{children}</Segment>
          </SidebarPusher>
        </SidebarPushable>
      </section>
    );
  }
};

export default ProfileLayout;
