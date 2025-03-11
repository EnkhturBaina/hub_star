import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';

const isServer = () => {
  return typeof window === 'undefined';
};

let context = <GetServerSidePropsContext>{};
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL!;

export const setAccessToken = (_accessToken: string) => {
  console.log(_accessToken);
};
export const getAccessToken = () => 'access-token';
export const removeAccessToken = () => 'access-token';
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

api.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer access-token';
  if (isServer() && context?.req?.cookies) {
    config.headers.Cookie = `gid=${context.req.cookies.gid};`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    // if (
    //   error.response?.status === 401 &&
    //   !error.response?.config?.url?.includes("authentication/refresh") &&
    //   !error.response?.config?.url?.includes("signin")
    // ) {
    //   return refreshToken(error);
    // }
    return Promise.reject(error);
  }
);
