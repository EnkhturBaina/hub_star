import { Advertisement } from '@/types/advertisement';
import {
  Address,
  Category,
  RefDirection,
  MainDirection,
  PageMeta,
  SubDirection,
  FooterMenu,
  FooterMenuPage,
  Advice,
  RefNotification,
  RefNews,
} from '@/types/reference';
import { Users } from '@/types/user';
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
export interface IResponseOtp extends IResponse {
  response: {
    status: string;
    details: string;
  };
}
export interface IResponseOtpVerify extends IResponse {
  response: {
    user: Users;
    accessToken: string;
    refreshToken: string;
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
  };
}
export interface IResponseMainDirections extends IResponse {
  response: MainDirection[];
}
export interface IResponseMainDirection extends IResponse {
  response: MainDirection;
}
export interface IResponseDirections extends IResponse {
  response: RefDirection[];
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
export interface IResponseMenu extends IResponse {
  response: FooterMenu[];
}
export interface IResponsePage extends IResponse {
  response: FooterMenuPage;
}
export interface IResponseAllAdvice extends IResponse {
  response: {
    data: Advice[];
    meta: PageMeta;
  };
}
export interface IResponseNotifications extends IResponse {
  response: RefNotification[];
}
export interface IResponseNotification extends IResponse {
  response: RefNotification;
}

export interface IResponseNews extends IResponse {
  response: RefNews[];
}
export interface IResponseOneNews extends IResponse {
  response: RefNews;
}
