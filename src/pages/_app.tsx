import { ComponentType, FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Loader from '@components/common/loader';

import { AuthProvider } from '@context/auth';
// import { SocketContext, socket } from '@context/socket';
// import { ManagedUIContext } from '@context/uiContext';

import '@styles/main.scss';
import FabButton from '@components/common/fab-button';
import { ConfigProvider } from 'antd';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: FC<AppProps> = ({ Component, router, pageProps }: AppProps) => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };
    const handleError = (error: any) => {
      setPageLoading(false);
      console.log('is working error', error);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);
  }, [router]);

  // const getLayout = Component.getLayout ?? (page => page);
  return (
    <>
      {/* {pageLoading && <Loader />} */}
      <ConfigProvider theme={{ token: { colorPrimary: '#F7941D' } }}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <FabButton />
      </ConfigProvider>

      {/* <ManagedUIContext>
      
        <SocketContext.Provider value={socket}> */}

      {/* </SocketContext.Provider> */}
      {/* //   </AuthProvider> */}
      {/* // </ManagedUIContext> */}
    </>
  );
};

export default appWithTranslation(MyApp);
