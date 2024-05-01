import {
  Address,
  LocalFile,
  MainDirection,
  RefDirection,
  SubDirection,
  UserType,
} from './reference';
import { Users } from './user';
export type AdProcess = 'CREATED' | 'DOING' | 'DONE';
export type Advertisement = {
  id: number;
  mainDirectionId: number;
  mainDirection?: MainDirection;
  directionId: number;
  direction?: RefDirection;
  subDirectionId: number;
  subDirection?: SubDirection;
  userType: UserType;
  provinceId: number;
  province: Address;
  districtId: number;
  district: Address;
  khorooId: number;
  khoroo: Address;
  title: string;
  address: string;
  desciption: string;
  price: number;
  counter: number;
  email: string;
  phone: string;
  isMessenger: boolean;
  isTermOfService: boolean;
  rating: number;
  images: LocalFile[];
  saveUsers: Users[];
  createdBy: number;
  createdUser?: Users;
  createdAt: string;
  doingBy: number;
  process: AdProcess;
  workerCount?: number;
  isAfternoon?: boolean;
  productName?: string;
  unitAmount?: number;
  packageAmount?: number;
  machineryTypeId?: number;
  markId?: number;
  modelId?: number;
  powerId?: number;
  fromAddress?: string;
  toAddress?: string;
  measurement?: string;
};
