import { useAuthState } from '@context/auth';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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
      </Header>
      <Layout>
        <Sider></Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
