import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AppProvider } from '@/app/app-context';
import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Nunito_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import FabButton from '@/components/Common/FabButton';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Suspense } from 'react';
import Loading from '@/components/Common/Loading';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/store';
import { Toaster } from 'react-hot-toast';

const roboto = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
function MyApp({ Component, pageProps }: AppProps) {
  const pathUrl = usePathname();
  return (
    <Suspense fallback={<Loading />}>
      <div className={`dark:bg-black ${roboto.className}`}>
        <NextUIProvider>
          <Provider store={store}>
            <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
              <div className="w-full min-h-screen flex flex-col justify-between">
                <AppProvider>
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName="custom-toast-container"
                    toastOptions={{
                      duration: 5000,
                    }}
                  />
                  {pathUrl === '/auth/signin' || pathUrl === '/auth/signup' ? null : <Header />}
                  <Component {...pageProps} />
                  <FabButton />
                </AppProvider>
                <Footer />
                <ScrollToTop />
              </div>
            </ThemeProvider>
          </Provider>
        </NextUIProvider>
      </div>
    </Suspense>
  );
}

export default appWithTranslation(MyApp);
