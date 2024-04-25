import { AdProcess } from '@/types/advertisement';
import { AddressType, OtpType } from '@/types/reference';
export interface IPageOptions {
  order: 'ASC' | 'DESC';
  page: number;
  limit: number;
}
export interface IAdParam extends IPageOptions {
  categoryId?: number;
  process?: AdProcess;
  mainDirectionId?: number;
  directionIds?: number[];
  subDirectionIds?: number[];
  title?: string;
  userBy?: number;
  createdBy?: number;
}
export interface ICreateAd {
  mainDirectionId?: number;
  directionId?: number;
  subDirectionId?: number;
  categoryId?: number;
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
