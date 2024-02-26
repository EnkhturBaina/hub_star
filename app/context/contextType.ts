import { CustomerType } from "@/types/customerType";

export interface CurrentContextType {
  mainDirection: [];
  direction: [];
  subDirection: [];
  username: string;
  directionLoading: boolean;
  custTypeData: [] | null;
}
