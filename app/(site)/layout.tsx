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
import { MainContextComp } from "../context/MainContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathUrl = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <NextUIProvider>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
          >
            <MainContextComp>
              {pathUrl === "/auth/signin" ||
              pathUrl === "/auth/signup" ? null : (
                <Header />
              )}
              <ToasterContext />
              {children}
              <Footer />
              <ScrollToTop />
            </MainContextComp>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
