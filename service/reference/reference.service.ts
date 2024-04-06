import {
  IResponse,
  IResponseAddresses,
  IResponseCategories,
  IResponseDirections,
  IResponseLocalFile,
  IResponseMainDirections,
  IResponseMenu,
  IResponsePage,
  IResponseSubDirections,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import { IAddressParam, IDirectionParam, ISubDirectionParam } from '@/interfaces/request.interface';
const getMainDirection = (params: { categoryId?: number }): Promise<IResponseMainDirections> => {
  return api.get('/reference/main-direction', { params });
};
const getDirection = (params: IDirectionParam): Promise<IResponseDirections> => {
  return api.get('/reference/main-direction/direction', { params });
};
const getSubDirection = (params: ISubDirectionParam): Promise<IResponseSubDirections> => {
  return api.get('/reference/main-direction/direction/sub-direction', {
    params,
  });
};
const getCategory = (): Promise<IResponseCategories> => {
  return api.get('/reference/category');
};
const getAddress = (params: IAddressParam): Promise<IResponseAddresses> => {
  return api.get('/reference/address', { params });
};
const fileUpload = (file: Blob): Promise<IResponseLocalFile> => {
  return api.post(
    '/local-files/fileUpload',
    { file },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
const removeFileUpload = (id: number): Promise<IResponse> => {
  return api.delete(`/local-files/${id}`);
};
const getMenu = (): Promise<IResponseMenu> => {
  return api.get('/reference/menu');
}
const getMenuPage = (menuId: number): Promise<IResponsePage> => {
  return api.get('/reference/pages/menu/' + menuId);
}
export const ReferenceService = {
  getMainDirection,
  getDirection,
  getSubDirection,
  getCategory,
  getAddress,
  fileUpload,
  removeFileUpload,
  getMenu,
  getMenuPage,
};
