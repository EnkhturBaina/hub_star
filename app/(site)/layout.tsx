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
            {pathUrl === "/auth/signin" ? null : <Header />}
            <ToasterContext />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
