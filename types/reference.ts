import { AdProcess, Advertisement } from './advertisement';
import Users from './user';
export type ProfileRoute = {
  id: number;
  name: string;
  url: string;
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
  subDirections: SubDirection[];
};
/** Үйл ажиллагааны нэр */
export type SubDirection = {
  id: number;
  directionId: number;
  direction: RefDirection;
  name: string;
};
/** Хэрэглэгчийн төрөл */
export type Category = {
  id: number;
  logoId: number;
  name: string;
  isSpecial: boolean;
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
  authorId: number;
  author?: Users;
  advertisementId: number;
  advertisement?: Advertisement;
  process: AdProcess;
  description: string;
  isSeen?: boolean;
  createdBy?: number;
  createdUser?: Users;
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
