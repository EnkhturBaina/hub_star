import { ReferenceService } from "@/service/reference/reference.service";
import { Advertisement } from "@/types/advertisement";
import { Category, MainDirection, PageMeta } from "@/types/reference";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTypedSelector } from "../redux/reducer";
import { AdvertisementService } from "@/service/advertisement/advertisement.service";
interface IAppContextProps {
  mainDirections: MainDirection[];
  categories: Category[];
  advertisements: Advertisement[];
  adMeta: PageMeta;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

interface IProps {
  children: ReactNode;
}
const AppProvider: React.FC<IProps> = ({ children }) => {
  const { adParam } = useTypedSelector((state) => state);
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [adMeta, setAdMeta] = useState<PageMeta>({
    page: 1,
    pageCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    limit: 10,
  });
  const getMainDirection = () => {
    ReferenceService.getMainDirection().then((res) => {
      if (res.success) {
        setMainDirections(res.response);
      }
    });
  };
  const getCategory = () => {
    ReferenceService.getCategory().then((res) => {
      if (res.success) {
        setCategories(res.response);
      }
    });
  };
  useEffect(() => {
    getMainDirection();
    getCategory();
  }, []);
  useEffect(() => {
    AdvertisementService.get(adParam).then((response) => {
      if (response.success) {
        setAdvertisements(response.response.data);
        setAdMeta(response.response.meta);
      }
    });
  }, [adParam]);
  const value: IAppContextProps = {
    mainDirections,
    categories,
    advertisements,
    adMeta,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ProviderReport");
  }
  return context;
};
export { AppProvider, useAppContext };
