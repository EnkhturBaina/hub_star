import React from 'react';
import { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import App from 'next/app';
import '@styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import Footer from '@components/molecules/Footer';
import ScrollToTop from '@components/molecules/ScrollToTop';
import { Nunito_Sans } from 'next/font/google';
import Header from '@components/molecules/Header';
import LanguageSwitcher from '@components/atoms/LanguageSwitcher';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Provider } from 'react-redux';
import { store } from '@lib/store';
import { Toaster } from 'react-hot-toast';
import LoadingProvider from '@components/atoms/Loading';
import { useRouter } from 'next/router';
import { AuthProvider } from '@context/auth';
import cookie from 'js-cookie';

const roboto = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
interface MyAppProps extends AppProps {
  pageProps: {
    messages: Record<string, string>;
    locale: string;
  };
}
function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider messages={pageProps.messages} locale={pageProps.locale}>
      <div className={`dark:bg-black ${roboto.className}`}>
        <HeroUIProvider>
          <Provider store={store}>
            <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
              <div className="w-full min-h-screen h-fit flex flex-col justify-between">
                <AuthProvider>
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName="custom-toast-container"
                    toastOptions={{
                      duration: 5000,
                    }}
                  />
                  {/^\/auth\/.*/.test(router.pathname) ? null : <Header />}
                  <LoadingProvider>
                    <Component {...pageProps} />
                  </LoadingProvider>
                  <LanguageSwitcher locale={pageProps.locale} />
                </AuthProvider>
                <Footer />
                <ScrollToTop />
              </div>
            </ThemeProvider>
          </Provider>
        </HeroUIProvider>
      </div>
    </NextIntlClientProvider>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const { ctx } = appContext;
  const locale = ctx.req?.cookies?.locale || cookie.get('locale');
  const messages = (await import(`../locales/${locale}.json`)).default;

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, pageProps: { ...appProps.pageProps, messages, locale } };
};

export default MyApp;
