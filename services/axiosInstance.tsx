import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosClient = (token: string | null = null): AxiosInstance => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "x-api-key": process.env.API_KEY,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcwODkxMjI0MCwiZXhwIjoxNzA4OTk4NjQwfQ.6S0yRr59CWg9Ub9BTkksFjPrNfY7n8qUkUmStaf_094`,
  };

  const client = axios.create({
    baseURL: process.env.PUBLIC_URL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: any) => {
    // const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers = config.headers || {};
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          // localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    },
  );

  return client;
};

export default axiosClient;
