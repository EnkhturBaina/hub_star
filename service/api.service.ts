import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const isServer = () => {
  return typeof window === "undefined";
};

// let accessToken = "";
let context = <GetServerSidePropsContext>{};
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL!;

export const setAccessToken = (_accessToken: string) => {
  if (_accessToken == "") {
    deleteCookie("access-token");
  }
  setCookie("access-token", _accessToken);
};

export const getAccessToken = () => getCookie("access-token");

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

api.interceptors.request.use((config) => {
  if (getCookie("access-token")) {
    config.headers.Authorization = `Bearer ${getCookie("access-token")}`;
  }

  if (isServer() && context?.req?.cookies) {
    config.headers.Cookie = `gid=${context.req.cookies.gid};`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
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
  },
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (oError: AxiosError) => {
  try {
    const { response } = oError;
    // create new Promise to retry original request
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers["Authorization"] = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });
    // check whether refreshing token or not
    if (!fetchingToken) {
      fetchingToken = true;
      // refresh token
      const { data } = await api.get(
        `authentication/refresh/${getCookie("access-token")}`,
      );
      // check if this is server or not. We don't wanna save response token on server.
      if (!isServer) {
        setAccessToken(data.accessToken);
      }
      // when new token arrives, retry old requests
      onAccessTokenFetched(data.accessToken);
    }
    return retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    const pathUrl = usePathname();
    const router = useRouter();
    if (!isServer() && pathUrl !== "/auth/signin") {
      router.push("/auth/signin");
    }
    if (isServer()) {
      context.res.setHeader("location", "/login");
      context.res.statusCode = 302;
      context.res.end();
    }
    return Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};
