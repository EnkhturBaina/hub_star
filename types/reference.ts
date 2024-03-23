import { IFile } from "@/interfaces/request.interface";
import { Advertisement } from "./advertisement";
/** Үйл ажиллагааны үндсэн чиглэл */
export type MainDirection = {
  id: number;
  logo: IFile;
  name: string;
  directions: Direction[];
};
/** Үйл ажиллагааны чиглэл */
export type Direction = {
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
  direction: Direction;
  name: string;
};
/** Хэрэглэгчийн төрөл */
export type Category = {
  id: number;
  logo: IFile;
  name: string;
  isSpecial: boolean;
};
/** Хаяг */
export type Address = {
  id: number;
  name: string;
  parentId: number;
  parent: Address;
  position: number;
  type: "COUNTRY" | "PROVINCE" | "DISTRICT" | "KHOROO";
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
}