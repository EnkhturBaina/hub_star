import { CustomerType } from "@/types/customerType";
import { UserData } from "@/types/userData";

export interface CurrentContextType {
  mainDirection: [];
  direction: [];
  subDirection: [];
  username: string;
  directionLoading: boolean;
  custTypeData: [] | null;
  getAds: () => void;
  adsData: [];
  adsLoading: boolean;
  authUserData: UserData;
  setAuthUserData: (todo: UserData) => void;
}
