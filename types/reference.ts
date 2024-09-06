import { ReactNode } from 'react';
import { AdProcess, Advertisement } from './advertisement';
import Users from './user';
export type OtpType = 'Registration' | 'Forget' | 'Verification';
export type OrderType = 'ASC' | 'DESC';
export type ProfileRoute = {
  id: number;
  name: string;
  url: string;
};
export type OtherProfileMenu = {
  id: string;
  name: string;
  component: ReactNode;
};
/** Хуудаслалт  */
export type PageMeta = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
/** Үйл ажиллагааны үндсэн чиглэл */
export type MainDirection = {
  type: SpecialServiceType;
  map(
    arg0: (d: RefDirection, idx: number) => import('react').JSX.Element
  ): ReactNode | Iterable<ReactNode>;
  id: number;
  logoId: number;
  coverId: number;
  name: string;
  directions: RefDirection[];
};
/** Үйл ажиллагааны чиглэл */
export type RefDirection = {
  id: number;
  mainDirectionId: number;
  mainDirection: MainDirection;
  name: string;
  advices: Advice[];
  subDirections: SubDirection[];
};
/** Үйл ажиллагааны нэр */
export type SubDirection = {
  id: number;
  directionId: number;
  direction: RefDirection;
  name: string;
  advertisements: Advertisement[];
};

/** Хэрэглэгчийн төрөл */
export type UserType = 'SUBSCRIBER' | 'EXECUTOR' | 'SUPPLIER' | 'TRANSPORTATION' | 'MACHINERY';

/** Хэрэглэгчийн таб */
export type UserTab = {
  type: UserType;
  image: string;
  title: string;
};
/** Онцгой үйлчилгээний төрөл */
export type SpecialServiceType =
  | 'PUBLIC_SELECTION'
  | 'INTERNATIONAL_TRADE'
  | 'CONSULTING_SERVICE'
  | 'VOCATIONAL_TRAINING'
  | 'LABORATORY_MATERIAL'
  | 'MAKE_BUDGET';
/** Онцгой үйлчилгээ */
export type SpecialService = {
  type: SpecialServiceType;
  icon: ReactNode;
  title: string;
};
/** Хаягийн төрөл */
export type AddressType = 'COUNTRY' | 'PROVINCE' | 'DISTRICT' | 'KHOROO';
/** Хаяг */
export type Address = {
  id: number;
  name: string;
  parentId: number;
  parent: Address;
  position: number;
  type: AddressType;
  childrens: Address[];
  provinceAds: Advertisement[];
  districtAds: Advertisement[];
  khorooAds: Advertisement[];
};
/** Encrypted files */
export type LocalFile = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
};
export type FooterMenuType = 'MAIN' | 'SUPPORT' | 'TOOL';
export type NotificationType = 'NORMAL' | 'ORDER' | 'IGNORE' | 'APPROVE';
/** Лавлах цэсүүд */
export type FooterMenu = {
  id: number;
  type: FooterMenuType;
  title: string;
  relLink: string;
  position: number;
};
/** Сайтын цэсэнд харуулах хуудаснууд */
export type FooterMenuPage = {
  id: number;
  menuId: number;
  menu: FooterMenu;
  title?: string;
  description?: string;
  body?: string;
  date: Date;
  is_show: boolean;
  imageId: number;
};
/** Зөвлөмжүүд */
export type Advice = {
  id: number;
  mainDirectionId: number;
  mainDirection?: MainDirection;
  directionId: number;
  direction?: RefDirection;
  title: string;
  pdfId: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};
/** Мэдэгдэл */
export type RefNotification = {
  id: number;
  advertisementId: number;
  advertisement?: Advertisement;
  description: string;
  isSeen?: boolean;
  type: NotificationType;
  createdBy?: number;
  createdUser?: Users;
  receiveBy: number;
  receiveUser?: Users;
  createdAt?: Date;
};
export type RefNews = {
  id: number;
  title: string;
  description: string;
  body: string;
  date: Date;
  isPublish: boolean;
  relLink: string;
  imageId: number;
};
export type MachineryType = {
  id: number;
  name: string;
  type: string;
  parentId: number;
};
export type Participant = {
  id?: number;
  userType: UserType;
  advertisementId: number;
  advertisement?: Advertisement;
  createdBy?: number;
  createdUser?: number;
  userBy: number;
  user?: Users;
  createdAt?: Date;
}