import { ReferenceService } from "@/service/reference/reference.service";
import { Category, MainDirection } from "@/types/reference";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface IAppContextProps {
  mainDirections: MainDirection[];
  categories: Category[];
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

interface IProps {
  children: ReactNode;
}
const AppProvider: React.FC<IProps> = ({ children }) => {
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
  const value: IAppContextProps = {
    mainDirections,
    categories,
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
