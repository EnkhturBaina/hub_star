import { Address, LocalFile } from './reference';
import { Users } from './user';

export type Advertisement = {
  id: number;
  mainDirectionId: number;
  directionId: number;
  subDirectionId: number;
  categoryId: number;
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
  images: LocalFile[];
  saveUsers: Users[];
  progresses: AdvertisementProgress[];
  createdAt: string;
};
export type AdvertisementProgress = {
  id: number;
  advertisementId: number;
  advertisement: Advertisement;
  process: 'ORDER' | 'IGNORE' | 'APPROVE';
  isShow: boolean;
  point: number;
};
