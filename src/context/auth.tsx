import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

export interface AuthContextData {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  setLogin: (token: string) => void;
  setLogout: () => void;
  loadUserFromCookies: () => void;
}

export const authContextDefaultValue: AuthContextData = {
  isAuthenticated: false,
  user: null,
  loading: true,
  setLogin: () => null,
  setLogout: () => null,
  loadUserFromCookies: () => null,
};

export const AuthStateContext = createContext<AuthContextData>(authContextDefaultValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const setLogin = async (token: string) => {
    try {
      interface Response {
        data: any;
        // response: any;
      }
      const result: Response = await AuthService.getCurrentUser(token);
      if (result && result?.data.success) {
        AuthTokenStorageService.store(token);
        setUser(result.data?.response?.user);
      } else {
        return null;
      }
    } catch (err: any) {
      // noop
      console.log('Login hiihed aldaa garlaa', err);
    }
  };

  const setLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  async function loadUserFromCookies() {
    const authToken =
      AuthTokenStorageService.getAccessToken() &&
      AuthTokenStorageService.getAccessToken() != 'false'
        ? AuthTokenStorageService.getAccessToken()
        : '';
    if (authToken) {
      try {
        const res = await AuthService.getCurrentUser(authToken);
        if (res && res?.status === 200) {
          if (!isEmpty(res?.data)) {
            setUser(res?.data?.response?.user);
          }
        } else {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <AuthStateContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        setLogin,
        setLogout,
        loadUserFromCookies,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
