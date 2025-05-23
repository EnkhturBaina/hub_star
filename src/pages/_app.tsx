import React from 'react';
import { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import App from 'next/app';
import '@styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { Nunito_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AuthProvider } from '@context/auth';
import Header from '@components/molecules/Header';
import LanguageSwitcher from '@components/atoms/LanguageSwitcher';
import Footer from '@components/molecules/Footer';
import ScrollToTop from '@components/molecules/ScrollToTop';
import { MainProvider } from '@context/main';
import { SocketProvider } from '@context/socketContext';
import ProfileLayout from '@components/molecules/Layouts/ProfileLayout';
import Head from 'next/head';

const roboto = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
interface MyAppProps extends AppProps {
  pageProps: {
    messages: Record<string, string>;
  };
}
function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();
  const locale = router.locale || 'mn';
  const isAuthRoute = router.pathname.startsWith('/auth');
  const isProfileRoute = router.pathname.startsWith('/profile');

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="description" content="All at once" />
        <meta name="keywords" content="Meta Start LLC, All at once, Hubstar" />
        <meta name="author" content="G.Ulziikhutag" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <NextIntlClientProvider
        messages={pageProps.messages}
        locale={locale}
        timeZone="Asia/Ulaanbaatar"
      >
        <div className={`dark:bg-black ${roboto.className}`}>
          <HeroUIProvider>
            <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
              <AuthProvider>
                <SocketProvider>
                  <div className="w-full min-h-screen h-fit flex flex-col justify-between">
                    {isAuthRoute ? (
                      <>
                        <Component {...pageProps} />
                        <LanguageSwitcher />
                        <Footer />
                      </>
                    ) : isProfileRoute ? (
                      <>
                        <Toaster
                          position="top-right"
                          reverseOrder={false}
                          gutter={8}
                          containerClassName="custom-toast-container"
                          toastOptions={{
                            duration: 5000,
                          }}
                        />
                        <Header />
                        <ProfileLayout>
                          <Component {...pageProps} />
                        </ProfileLayout>
                        <LanguageSwitcher />
                        <Footer />
                      </>
                    ) : (
                      <MainProvider>
                        <Toaster
                          position="top-right"
                          reverseOrder={false}
                          gutter={8}
                          containerClassName="custom-toast-container"
                          toastOptions={{
                            duration: 5000,
                          }}
                        />
                        <Header />
                        <Component {...pageProps} />
                        <LanguageSwitcher />
                        <Footer />
                        <ScrollToTop />
                      </MainProvider>
                    )}
                  </div>
                </SocketProvider>
              </AuthProvider>
            </ThemeProvider>
          </HeroUIProvider>
        </div>
      </NextIntlClientProvider>
    </>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const { ctx } = appContext;
  const locale = ctx.locale || 'mn';
  let messages;
  try {
    messages = (await import(`../locales/${locale}.json`)).default;
  } catch (error: any) {
    console.warn(`⚠️ Missing locale file for "${locale}", falling back to "mn"`);
    messages = (await import(`../locales/mn.json`)).default;
    console.log('noop ====>', error);
  }

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, pageProps: { ...appProps.pageProps, messages } };
};

export default MyApp;
