import { Advertisement } from "@/types/advertisement";
import {
  Address,
  Category,
  Direction,
  MainDirection,
  PageMeta,
  SubDirection,
} from "@/types/reference";
import { Users } from "@/types/user";
export interface IResponse {
  success: boolean;
  message: string;
  statusCode: number;
}
export interface IResponseLogin extends IResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    user: Users;
  };
}
export interface IResponseProfile extends IResponse {
  response: {
    user: Users;
  };
}
export interface IResponseLocalFile extends IResponse {
  response: {
    id: number;
    filename: string;
    path: string;
    mimetype: string;
  }
}
export interface IResponseMainDirections extends IResponse {
  response: MainDirection[];
}
export interface IResponseDirections extends IResponse {
  response: Direction[];
}
export interface IResponseSubDirections extends IResponse {
  response: SubDirection[];
}
export interface IResponseCategories extends IResponse {
  response: Category[];
}
export interface IResponseAddresses extends IResponse {
  response: Address[];
}
export interface IResponseAdvertisements extends IResponse {
  response: {
    data: Advertisement[];
    meta: PageMeta;
  };
}
export interface IResponseAdvertisement extends IResponse {
  response: Advertisement;
}
