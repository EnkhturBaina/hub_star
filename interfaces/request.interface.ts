import { AddressType } from '@/types/reference';

export interface IPageOptions {
  order: 'ASC' | 'DESC';
  page: number;
  limit: number;
}
export interface IAdParam extends IPageOptions {
  categoryId?: number;
  mainDirectionId?: number;
  directionIds?: number[];
  subDirectionIds?: number[];
  title?: string;
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
export interface IFile {
  filename: string;
  folder: string;
  path: string;
  size: string;
  type: string;
}
export interface IUser {
  email: string;
  password: string;
}
export interface IVerifyOtp {
  otp: string;
  details: string;
  type: 'Registration' | 'Forget' | 'Verification';
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
