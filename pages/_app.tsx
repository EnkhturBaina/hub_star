import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AppProvider } from '@/app/app-context';
import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Nunito_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import FabButton from '@/components/Common/FabButton';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/store';
import { Toaster } from 'react-hot-toast';
import LoadingProvider from '@/components/Common/Loading';

const roboto = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
function MyApp({ Component, pageProps }: AppProps) {
  const pathUrl = usePathname();

  return (
    <div className={`dark:bg-black ${roboto.className}`}>
      <HeroUIProvider>
        <Provider store={store}>
          <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
            <div className="w-full min-h-screen h-fit flex flex-col justify-between">
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
                {/^\/auth\/.*/.test(pathUrl) ? null : <Header />}
                <LoadingProvider>
                  <Component {...pageProps} />
                </LoadingProvider>
                <FabButton />
              </AppProvider>
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
