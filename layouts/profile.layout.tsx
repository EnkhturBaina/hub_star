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
  const [userImage, setUserImage] = useState<Users>(user);
  const [visible, setVisible] = useState(false);

  const sideBarRef = useRef(null);
  const saveUserImage = () => {
    AuthService.updateById(userImage.id, {
      avatarId: userImage.avatarId,
      coverId: userImage.coverId,
    }).then(response => {
      if (response.success) {
        toast.success('Амжилттай хадгаллаа');
      }
    });
  };

  useEffect(() => {
    userImage &&
      setUser((prevState: Users) => ({
        ...prevState,
        avatarId: userImage.avatarId,
        coverId: userImage.coverId,
      }));
  }, [userImage]);
  if (!user) {
    return null;
  } else {
    return (
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <div className="relative flex flex-col rounded-xl bg-white" style={{ height: 330 }}>
            <div className="relative">
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
              </div>
              <ImageUpload
                className="absolute bottom-8 right-10 cursor-pointer bg-gray-300 text-base bg-opacity-60 text-white flex flex-row items-center rounded-2xl px-4 py-1"
                setFileId={fileId => {
                  console.log('fileId ========>', fileId);
                  setUserImage((prevState: Users) => ({
                    ...prevState,
                    coverId: fileId,
                  }));
                  saveUserImage();
                }}
              >
                <FaCamera className="text-lg mr-3" />
                Дэвсгэр зураг солих
              </ImageUpload>
              <div className="absolute -bottom-12 left-2 flex flex-row justify-between md:-bottom-28 md:left-30">
                <div className="relative md:mr-6">
                  {user.avatarId == null ? (
                    <Image
                      className="h-28 w-28 rounded-full border-5 border-white md:h-60 md:w-60"
                      src="/images/user/user-01.png"
                      alt=""
                      width={400}
                      height={400}
                    />
                  ) : (
                    <Image
                      className="h-28 w-28 rounded-full border-5 border-white md:h-60 md:w-60 bg-white"
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user.avatarId}`}
                      alt=""
                      width={400}
                      height={400}
                    />
                  )}
                  <ImageUpload
                    className="bottom-1 right-1 cursor-pointer rounded-full bg-gray-100 p-3 text-black absolute w-fit"
                    setFileId={fileId => {
                      console.log('fileId AVATAR========>', fileId);
                      setUserImage((prevState: Users) => ({
                        ...prevState,
                        avatarId: fileId,
                      }));
                      saveUserImage();
                    }}
                  >
                    <FaCamera className="text-2xl" />
                  </ImageUpload>
                </div>
                <div className="-mb-4 flex flex-col justify-end md:mb-2">
                  <span className="mb-0 text-2xl font-bold text-black md:mb-2">
                    <AuthName user={user} />
                  </span>
                  <span className="text-xl">{user.jobPosition}</span>
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
