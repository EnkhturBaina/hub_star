'use client';
import LeftMenu from '@components/molecules/Profile/LeftMenu';
import React, { useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuChevronLeft, LuLayoutGrid, LuMenu } from 'react-icons/lu';
import { useAuthState } from '@context/auth';
import ProfileCard from '../Profile/ProfileCard';

interface IProps {
  children: React.ReactNode;
}
const ProfileLayout: React.FC<IProps> = ({ children }) => {
  const { user } = useAuthState();
  const [visible, setVisible] = useState(false);

  const sideBarRef = useRef(null);

  if (!user) {
    return null;
  } else {
    return (
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <ProfileCard />
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
