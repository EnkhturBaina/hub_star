import React from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '@styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import Footer from '@components/molecules/Footer';
import ScrollToTop from '@components/molecules/ScrollToTop';
import { Nunito_Sans } from 'next/font/google';
import Header from '@components/molecules/Header';
import FabButton from '@components/atoms/FabButton';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Provider } from 'react-redux';
import { store } from '@lib/store';
import { Toaster } from 'react-hot-toast';
import LoadingProvider from '@components/atoms/Loading';
import { useRouter } from 'next/router';
import { AuthProvider } from '@context/auth';

const roboto = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
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
                <FabButton />
              </AuthProvider>
              <Footer />
              <ScrollToTop />
            </div>
          </ThemeProvider>
        </Provider>
      </HeroUIProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
