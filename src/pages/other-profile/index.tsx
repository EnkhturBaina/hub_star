import React, { useCallback, useEffect, useRef, useState } from 'react';
import Contact from '@components/molecules/Profile/Content/Contact';
import Profile from '@components/molecules/Profile/Content/Profile';
import ServiceHistory from '@components/molecules/Profile/Content/ServiceHistory';
import OtherLeftMenu from '@components/molecules/Profile/OtherLeftMenu';
import { OtherProfileMenu } from '@typeDefs/reference';
import Users from '@typeDefs/user';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { LuChevronLeft, LuLayoutGrid, LuMenu } from 'react-icons/lu';
import { Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react';
import AuthService from '@services/auth';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import ProfileCard from '@components/molecules/Profile/ProfileCard';

const OtherProfile: NextPage = () => {
  const t = useTranslations('otherProfile');
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);
  const [user, setUser] = useState<Users>();
  const [currentMenuId, setCurrentMenuId] = useState<string>('1');

  const paramId = useSearchParams().get('item');

  const menus: OtherProfileMenu[] = [
    {
      id: '1',
      name: t('otherProfile'),
      component: <Profile user={user} />,
    },
    {
      id: '2',
      name: t('workDone'),
      component: <ServiceHistory userId={user?.id} />,
    },
    {
      id: '3',
      name: t('contact'),
      component: <Contact user={user} />,
    },
  ];
  const getUser = useCallback(async () => {
    if (paramId) {
      await AuthService.otherProfile(paramId).then(res => {
        if (res.success) {
          setUser(res.response);
        }
      });
    }
  }, [paramId]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  const renderComponent = (): React.ReactNode => {
    const index = menus.findIndex(item => item.id == currentMenuId);
    if (index > -1) {
      return menus[index].component;
    }
    return <div></div>;
  };
  return (
    <>
      <Head>
        <title>{t('otherProfile')} | Hub Star</title>
      </Head>
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <ProfileCard user={user} />
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
            <OtherLeftMenu
              menus={menus}
              currentId={currentMenuId}
              setCurrentId={setCurrentMenuId}
            />
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
            <OtherLeftMenu
              menus={menus}
              currentId={currentMenuId}
              setCurrentId={setCurrentMenuId}
            />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">{renderComponent()}</Segment>
          </SidebarPusher>
        </SidebarPushable>
      </section>
    </>
  );
};
export default OtherProfile;
