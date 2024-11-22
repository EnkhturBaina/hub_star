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
import Navbar from '@components/navbar';

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
      <Navbar />
      <Layout>
        <Sider></Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  );
};
export default MainLayout;
