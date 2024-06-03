import { ReferenceService } from '@/service/reference/reference.service';
import { Advertisement } from '@/types/advertisement';
import { MainDirection, PageMeta } from '@/types/reference';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { Users } from '@/types/user';
import { AuthService } from '@/service/authentication/authentication.service';
import { getAccessToken } from '@/service/api.service';
import { useTypedSelector } from './lib/reducer';
interface IAppContextProps {
  user: Users;
  setUser: Dispatch<SetStateAction<Users>>;
  mainDirections: MainDirection[];
  advertisements: Advertisement[];
  adMeta: PageMeta;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

interface IProps {
  children: ReactNode;
}
const AppProvider: React.FC<IProps> = ({ children }) => {
  // const [adParam, setAdParam] = useState<IAdParam>({
  //   order: 'DESC',
  //   page: 1,
  //   limit: 9,
  //   process: 'CREATED',
  // });
  const advParam = useTypedSelector(state => state.advParam);
  const [user, setUser] = useState<Users>();
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [adMeta, setAdMeta] = useState<PageMeta>({
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    limit: 10,
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
      ids: advParam.mainDirectionIds,
      userType: advParam.userType,
    }).then(res => {
      if (res.success) {
        setMainDirections(res.response);
      }
    });
  }, [advParam.userType, advParam.mainDirectionIds]);

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
  const value: IAppContextProps = {
    user,
    mainDirections,
    advertisements,
    adMeta,
    setUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a ProviderReport');
  }
  return context;
};
export { AppProvider, useAppContext };
