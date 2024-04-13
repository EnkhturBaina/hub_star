import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AppProvider } from '@/app/app-context';
import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import ToasterContext from '@/app/ToastContext';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
// import { Header } from 'semantic-ui-react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});
function MyApp({ Component, pageProps }: AppProps) {
  const pathUrl = usePathname();
  return (
    <div className={`dark:bg-black ${roboto.className}`}>
      <AppProvider>
        {pathUrl === '/auth/signin' || pathUrl === '/auth/signup' ? null : <Header />}
        <NextUIProvider>
          <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
            <ToasterContext />
            <Component {...pageProps} />
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </NextUIProvider>
      </AppProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);