import { useAuthState } from '@context/auth';
import { Avatar, Badge, Button, Divider, Layout, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import { classNames } from '@utils/helpers';
import { AddIcon } from '@components/common/icons/helper/add-icon';
import {
  ExecutorIcon,
  MachineIcon,
  MessageIcon,
  NotificationIcon,
  SubscriberIcon,
  SupplierIcon,
  TransportationIcon,
} from '@components/common/icons';
import Footer from '@components/footer';

const { Header, Content, Sider } = Layout;

interface Props {
  children?: any;
}
const MainLayout: React.FC<Props> = ({ children }) => {
  const { setLogout, user } = useAuthState();
  const router = useRouter();
  const [choosedMenu, setChoosedMenu] = useState(router.pathname);

  const handleMenuClick = async (link: string) => {
    if (link !== choosedMenu) {
      setChoosedMenu(link);
      router.push(`/${link}`);
    }
  };

  const handleLogoutButtonClick = async () => {
    setLogout();
    router.push('/');
    return;
  };
  const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

  return (
    <Layout>
      <Header className="bg-white flex items-center sticky top-0 z-1">
        <div style={{ position: 'relative', width: '170px', height: '50px' }}>
          <Image
            src="/images/logo/svg_logo.svg"
            alt="main_logo"
            className="rounded-t-lg object-cover hover:cursor-pointer"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onClick={() => handleMenuClick('/')}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="hidden w-full max-w-[80%] h-fit md:block">{/* <SearchBox /> */}</div>
        <div
          className={classNames(
            'visible flex h-auto w-full max-w-fit items-center justify-between'
          )}
          //   ${
          //     navigationOpen &&
          //     'navbar !visible mt-4 h-auto max-h-[400px] rounded-md p-7.5 xl:h-auto xl:p-0 xl:shadow-none'
          //   }`
        >
          <Divider orientation="right" className="mx-5 h-10 sm:mx-1 md:mx-2 xl:mx-5 xl:block" />
          <div className="flex flex-row items-center">
            {!user ? (
              <Link className="text-black hover:text-primary " href="/auth/signin">
                <Button className="h-12 rounded-sm">
                  <span className="font-bold">Нэвтрэх</span>
                </Button>
              </Link>
            ) : (
              <>
                {/* <Link href="/profile/information" className="flex flex-row items-center">
                  <Avatar
                    name={user?.firstName}
                    src={
                      user.avatarId
                        ? process.env.NEXT_PUBLIC_MEDIA_URL + user.avatarId
                        : '/images/user/user.png'
                    }
                    className="h-12 w-12 text-lg"
                    onClick={() => router.pathname === '/profile/information'}
                  />
                  <div className="hidden md:block">
                    <AuthName user={user} />
                  </div>
                </Link> */}

                {/* <div className="flex w-30 flex-row justify-around gap-2">
                  <Link href="/profile/notification">
                    <Badge content={advParam.notification || 0}>
                      <NotificationIcon />
                    </Badge>
                  </Link>
                  <Link href="/profile/messenger">
                    <Badge content={messages.length}>
                      <MessageIcon />
                    </Badge>
                  </Link>
                  <Link href="/profile/post-service">
                    <AddIcon />
                  </Link>
                </div> */}
              </>
            )}
          </div>
        </div>
        <div className="mx-4 mt-2 block md:hidden">{/* <SearchBox /> */}</div>
        {/* <SubscriberIcon width={50} height={50} /> */}
        {/* <ExecutorIcon width={50} height={50} /> */}
        {/* <SupplierIcon width={50} height={50} /> */}
        <MachineIcon width={50} height={50} />
      </Header>
      <Layout>
        <Sider></Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  );
};
export default MainLayout;
