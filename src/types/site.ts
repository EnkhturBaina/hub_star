import { NextPage } from 'next';
import { ReactNode, ReactElement } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
