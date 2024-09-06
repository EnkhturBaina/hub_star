import AuthName from '@/components/Auth/auth-name';
import Contact from '@/components/Profile/Content/Contact';
import DoingServices from '@/components/Profile/Content/DoingServices';
import Profile from '@/components/Profile/Content/Profile';
import OtherLeftMenu from '@/components/Profile/OtherLeftMenu';
import { AuthService } from '@/service/authentication/authentication.service';
import { OtherProfileMenu } from '@/types/reference';
import Users from '@/types/user';
import { NextPage } from 'next';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuChevronLeft, LuLayoutGrid, LuMenu } from 'react-icons/lu';
import { Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react';

const OtherProfile: NextPage = () => {
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);
  const [user, setUser] = useState<Users>();
  const [currentMenuId, setCurrentMenuId] = useState<string>('1');

  const paramId = useSearchParams().get('item');

  const menus: OtherProfileMenu[] = [
    {
      id: '1',
      name: 'Профайл',
      component: <Profile user={user} />,
    },
    {
      id: '2',
      name: 'Хийсэн ажилууд',
      component: <DoingServices userId={user?.id} />,
    },
    {
      id: '3',
      name: 'Холбогдох',
      component: <Contact user={user} />,
    },
  ];
  const getUser = useCallback(async () => {
    if (!!paramId) {
      await AuthService.otherProfile(Number(paramId)).then(res => {
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
    <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
      <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
        <div className="flex flex-col rounded-xl bg-white">
          <div className="cursor-pointer relative h-64 w-full bg-cover bg-center">
            <Image
              src={
                user?.coverId
                  ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user?.coverId}`
                  : '/images/profile_bg.jpg'
              }
              alt={'ковер'}
              className="h-65"
              fill
            />
          </div>
          <div className="relative h-30 mx-5 md:mx-25">
            <div className="absolute w-full left-2 flex flex-row md:-bottom-10 md:left-20 gap-3 -top-[30%] md:-top-2/4">
              <div className="relative md:mr-6">
                <Image
                  className="rounded-full border-5 border-white md:h-40 md:w-40"
                  src={
                    user?.avatarId
                      ? `${process.env.NEXT_PUBLIC_BASE_API_URL}local-files/${user?.avatarId}`
                      : '/images/user/user.png'
                  }
                  alt=""
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-col justify-center md:mb-2 text-start">
                <span className="mb-0 text-2xl font-bold text-black md:mb-2">
                  <AuthName user={user} />
                </span>
                <span className="text-xl ml-3 mr-5">{user?.jobPosition}</span>
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
          <OtherLeftMenu menus={menus} currentId={currentMenuId} setCurrentId={setCurrentMenuId} />
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
          <OtherLeftMenu menus={menus} currentId={currentMenuId} setCurrentId={setCurrentMenuId} />
        </Sidebar>
        <SidebarPusher className="!w-full">
          <Segment className="!rounded-xl !border-0">{renderComponent()}</Segment>
        </SidebarPusher>
      </SidebarPushable>
    </section>
  );
};
export default OtherProfile;
