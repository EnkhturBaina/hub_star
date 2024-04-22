'use client';
import LeftMenu from '@/components/Profile/LeftMenu';
import React, { useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuChevronLeft, LuLayoutGrid, LuMenu } from 'react-icons/lu';
import AuthName from '@/components/Auth/auth-name';
import Image from 'next/image';
import ImageUpload from '@/components/Image/image-upload';
import { Users } from '@/types/user';
import { AuthService } from '@/service/authentication/authentication.service';
import toast from 'react-hot-toast';
import { useAppContext } from '@/app/app-context';

type Props = {
  children: React.ReactNode;
};
const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { user, setUser } = useAppContext();
  const [values, setValues] = useState<Users>(user);
  const [visible, setVisible] = useState(false);

  const sideBarRef = useRef(null);
  const saveUserImage = () => {
    AuthService.updateById(user.id, values).then(response => {
      if (response.success) {
        toast.success('Амжилттай хадгаллаа');
      }
    });
  };

  useEffect(() => {
    values &&
      setUser((prevState: Users) => ({
        ...prevState,
        avatarId: values.avatarId,
        coverId: values.coverId,
      }));
  }, [values]);
  if (!user) {
    return null;
  } else {
    return (
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <div className="flex flex-col rounded-xl bg-white">
            <div className="relative h-64 w-full bg-cover bg-center">
              <Image
                src={
                  user.coverId
                    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user.coverId}`
                    : '/images/profile_bg.jpg'
                }
                alt={'ковер'}
                className="h-65"
                fill
              />
              <div className="absolute bottom-8 right-8">
                <ImageUpload
                  className="cursor-pointer bg-gray-300 text-base bg-opacity-60 text-white flex flex-row items-center rounded px-4 py-1 min-w-max"
                  setFileId={coverId => {
                    setValues({
                      ...values,
                      coverId,
                    });
                    saveUserImage();
                  }}
                >
                  <FaCamera className="text-lg mr-3" />
                  Дэвсгэр зураг солих
                </ImageUpload>
              </div>
            </div>
            <div
              className="relative h-30"
              style={{
                marginLeft: 100,
                marginRight: 100,
              }}
            >
              <div
                className="absolute w-full left-2 flex flex-row md:-bottom-28 md:left-30 gap-3"
                style={{
                  top: '-50%',
                }}
              >
                <div className="relative md:mr-6">
                  <Image
                    className="rounded-full border-5 border-white md:h-60 md:w-60"
                    src={
                      user.avatarId
                        ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user.avatarId}`
                        : '/images/user/user-01.png'
                    }
                    alt=""
                    width={120}
                    height={120}
                  />
                  <ImageUpload
                    className="right-0 bottom-0 cursor-pointer rounded-full bg-gray-100 p-3 text-black absolute w-fit"
                    setFileId={fileId => {
                      console.log('fileId AVATAR========>', fileId);
                      setValues({
                        ...values,
                        avatarId: fileId,
                      });
                      saveUserImage();
                    }}
                  >
                    <FaCamera className="text-2xl" />
                  </ImageUpload>
                </div>
                <div className="flex flex-col justify-end md:mb-2 text-start">
                  <span className="mb-0 text-2xl font-bold text-black md:mb-2">
                    <AuthName user={user} />
                  </span>
                  <span className="text-xl ml-3 mr-5">{user.jobPosition}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-xl flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 lg:w-3/4 lg:flex-row"
        >
          <div
            className="ml-4 mt-2 w-fit rounded-xl bg-white p-4 md:hidden"
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
