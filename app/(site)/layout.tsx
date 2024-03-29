"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
import "semantic-ui-css/semantic.min.css";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

import ToasterContext from "../context/ToastContext";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/utils/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppProvider } from "@/utils/context/app-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathUrl = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <Provider store={store}>
          <PersistGate
            loading={<div>Уншиж байна...</div>}
            persistor={persistor}
          >
            <AppProvider>
              <NextUIProvider>
                <ThemeProvider
                  enableSystem={false}
                  attribute="class"
                  defaultTheme="light"
                >
                  {pathUrl === "/auth/signin" ||
                  pathUrl === "/auth/signup" ? null : (
                    <Header />
                  )}
                  <ToasterContext />
                  {children}
                  <Footer />
                  <ScrollToTop />
                </ThemeProvider>
              </NextUIProvider>
            </AppProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
