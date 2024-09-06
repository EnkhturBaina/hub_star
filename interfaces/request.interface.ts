import { AdProcess } from '@/types/advertisement';
import { AddressType, OrderType, OtpType, SpecialServiceType, UserType } from '@/types/reference';
export interface IPageOptions {
  order: OrderType;
  page: number;
  limit: number;
}
export interface IAdParam extends IPageOptions {
  userType?: UserType;
  adviceType?: any;
  process?: AdProcess;
  mainDirectionIds?: number[];
  directionIds?: number[];
  subDirectionIds?: number[];
  title?: string;
  userBy?: number;
  createdBy?: number;
  provinceId?: number;
  districtId?: number;
  khorooId?: number;
  materialId?: number;
  machineryTypeId?: number;
  specialService?: SpecialServiceType;
  isSpecial?: boolean;
}
export interface ICreateAd {
  id?: number;
  mainDirectionId?: number;
  directionId?: number;
  subDirectionId?: number;
  userType?: UserType;
  specialService?: SpecialServiceType;
  provinceId?: number;
  districtId?: number;
  khorooId?: number;
  title?: string;
  address?: string;
  desciption?: string;
  price?: number;
  counter?: number;
  process?: AdProcess;
  email?: string;
  phone?: string;
  isMessenger?: boolean;
  isTermOfService?: boolean;
  imageIds?: number[];
  workerCount?: number;
  isAfternoon?: boolean;
  productName?: string;
  unitAmount?: number;
  packageAmount?: number;
  machineryTypeId?: number;
  markId?: number;
  modelId?: number;
  powerId?: number;
  materialId?: number;
  fromAddress?: string;
  toAddress?: string;
  measurement?: string;
}
export interface IUser {
  username: string;
  password: string;
}
export interface ISendOtp {
  username: string;
  type: OtpType;
}
export interface IVerifyOtp {
  otp: string;
  details: string;
  type: OtpType;
}
export interface IChangePassword {
  password: string;
  token: string;
}
export interface IMainDirectionParam {
  ids?: number[];
  userType?: UserType;
  specialService?: SpecialServiceType;
  isAdvice?: boolean;
  lang?: string;
}
export interface IDirectionParam {
  ids?: number[];
  mainDirectionId?: number;
  specialServices?: SpecialServiceType[];
  name?: string;
  userType?: UserType;
  lang?: string;
}
export interface ISubDirectionParam {
  ids?: number[];
  directionId?: number;
  name?: string;
  userType?: UserType;
}
export interface IAddressParam {
  parentId?: number;
  name?: string;
  type: AddressType;
}
export interface IAdviceParam extends IPageOptions {
  title?: string;
  mainDirectionId?: number | string;
  directionIds?: number[];
}
export interface IRefNotificationParam {
  receiveBy: number;
}
export interface IMachineryParam {
  id?: number;
  name?: string;
  type?: 'DEDICATION' | 'MACHINERY_TYPE' | 'MARK' | 'POWER' | 'MODEL' | 'MATERIAL';
  parentId?: number;
}
export interface IParticipantParam {
  userType: 'SUBSCRIBER' | 'EXECUTOR';
  advertisementId: number;
}
