import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Loader from '@components/common/loader';

import { AuthProvider } from '@context/auth';

// import { SocketContext, socket } from '@context/socket';
// import { ManagedUIContext } from '@context/uiContext';

import '@styles/main.scss';
import { NextPageWithLayout } from '@typeDefs/site';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const MyApp: FC<AppProps> = ({ Component, router, pageProps }: AppPropsWithLayout) => {
  const [pageLoading, setPageLoading] = useState(true);

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

  const getLayout = Component.getLayout ?? (page => page);
  return getLayout(
    <>
      {/* {pageLoading && <Loader />} */}
      <AuthProvider>
        {/* <ManagedUIContext>
      
        <SocketContext.Provider value={socket}> */}
        <Component {...pageProps} />
      </AuthProvider>
      {/* </SocketContext.Provider> */}
      {/* //   </AuthProvider> */}
      {/* // </ManagedUIContext> */}
    </>
  );
};

export default MyApp;
