import ReferenceService from '@services/reference';
import { Advertisement } from '@typeDefs/advertisement';
import { MainDirection, PageMeta } from '@typeDefs/reference';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AdvertisementService } from '@services/advertisement/advertisement.service';
import { Users } from '@typeDefs/user';
import { getAccessToken } from '@services/api.service';
import { useRouter } from 'next/router';

export interface IFilterContextData {
  mainDirections: MainDirection[];
  advertisements: Advertisement[];
  adMeta: PageMeta;
}
export const filterContextDefaultValue: IFilterContextData = {
  mainDirections: [],
  advertisements: [],
  adMeta: {
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    limit: 9,
    itemCount: 0,
    hasPreviousPage: false,
  },
};
export const FilterStateContext = createContext<IFilterContextData>(filterContextDefaultValue);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Users>();
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [adMeta, setAdMeta] = useState<PageMeta>({
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    limit: 9,
  });
  const accessToken = getAccessToken();

  const getUser = useCallback(() => {
    AuthService.profile()
      .then(response => {
        if (response.success) {
          setUser(response.response.user);
        }
      })
      .catch(() => {
        setUser(undefined);
      });
  }, [accessToken]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const getMainDirection = useCallback(async () => {
    await ReferenceService.getMainDirection({
      // ids: advParam.mainDirectionIds,
      userType: advParam.userType,
      lang: router.locale,
    }).then(res => {
      if (res.success) {
        setMainDirections(res.response);
      }
    });
  }, [advParam.userType, advParam.mainDirectionIds, router.locale]);

  useEffect(() => {
    getMainDirection();
  }, [getMainDirection]);

  useEffect(() => {
    AdvertisementService.get(advParam).then(response => {
      if (response.success) {
        setAdvertisements(response.response.data);
        setAdMeta(response.response.meta);
      }
    });
  }, [advParam]);
  return (
    <FilterStateContext.Provider
      value={{
        mainDirections,
        advertisements,
        adMeta,
      }}
    >
      {children}
    </FilterStateContext.Provider>
  );
};

export const useFilterState = () => useContext(FilterStateContext);
