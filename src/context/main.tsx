import React, { createContext, useContext, useEffect, useState } from 'react';
import ReferenceService from '@services/reference';
import { MainDirection } from '@typeDefs/reference';
import { useRouter } from 'next/router';

export interface IFilterContextData {
  mainDirections: MainDirection[];
  addQuery: (query: any) => void;
}
export const filterContextDefaultValue: IFilterContextData = {
  mainDirections: [],
  addQuery: () => null,
};
export const MainStateContext = createContext<IFilterContextData>(filterContextDefaultValue);

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);

  useEffect(() => {
    const loadMainDirection = async () => {
      try {
        const result = await ReferenceService.getMainDirection({
          lang: router.locale,
          userType: router.query?.userType,
        });
        if (result.success) {
          setMainDirections(result.response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    loadMainDirection();
  }, [router.query?.userType, router.locale]);

  const addQuery = (query: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...query,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <MainStateContext.Provider value={{ mainDirections, addQuery }}>
      {children}
    </MainStateContext.Provider>
  );
};

export const useMainState = () => useContext(MainStateContext);
