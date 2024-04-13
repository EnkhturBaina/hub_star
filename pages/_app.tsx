import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AppProvider } from '@/app/app-context';
import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { NextUIProvider, Select, SelectItem } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import ToasterContext from '@/app/ToastContext';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { GrLanguage } from 'react-icons/gr';
import { RiHome5Fill } from 'react-icons/ri';
import FabButton from './FabButton';

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
      <NextUIProvider>
        <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
          <ToasterContext />
          <AppProvider>
            {pathUrl === '/auth/signin' || pathUrl === '/auth/signup' ? null : <Header />}
            <Component {...pageProps} />
          </AppProvider>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </NextUIProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
