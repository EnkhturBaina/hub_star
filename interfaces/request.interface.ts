import { AdProcess } from '@/types/advertisement';
import { AddressType, OrderType, OtpType, SpecialServiceType, UserType } from '@/types/reference';
export interface IPageOptions {
  order: OrderType;
  page: number;
  limit: number;
}
export interface IAdParam extends IPageOptions {
  userType?: UserType;
  process?: AdProcess;
  mainDirectionId?: number;
  directionIds?: number[];
  subDirectionIds?: number[];
  title?: string;
  userBy?: number;
  createdBy?: number;
  specialService?: SpecialServiceType;
}
export interface ICreateAd {
  mainDirectionId?: number;
  directionId?: number;
  subDirectionId?: number;
  userType?: UserType;
  provinceId?: number;
  districtId?: number;
  khorooId?: number;
  title?: string;
  address?: string;
  desciption?: string;
  price?: number;
  counter?: number;
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
  fromAddress?: string;
  toAddress?: string;
  measurement?: string;
}
export interface IUser {
  email: string;
  password: string;
}
export interface IEmailOtp {
  email: string;
  type: OtpType;
}
export interface IVerifyOtp {
  otp: string;
  details: string;
  type: OtpType;
}
export interface IChangePassword {
  email: string;
  password: string;
  token: string;
}
export interface IDirectionParam {
  mainDirectionId?: number;
  specialService?: SpecialServiceType;
  name?: string;
}
export interface ISubDirectionParam {
  directionId: number;
  name?: string;
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
  authorId: number;
}
export interface IMachineryParam {
  id?: number;
  name?: string;
  type?: string;
  parentId?: number;
}
