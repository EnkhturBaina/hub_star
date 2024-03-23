import {
  Address,
  Category,
  Direction,
  MainDirection,
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
