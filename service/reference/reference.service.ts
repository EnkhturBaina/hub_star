import {
  IResponse,
  IResponseAddresses,
  IResponseAllAdvice,
  IResponseCategories,
  IResponseDirections,
  IResponseLocalFile,
  IResponseMainDirection,
  IResponseMainDirections,
  IResponseMenu,
  IResponsePage,
  IResponseSubDirections,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import {
  IAddressParam,
  IAdviceParam,
  IDirectionParam,
  ISubDirectionParam,
} from '@/interfaces/request.interface';
const getMainDirection = (params: { categoryId?: number }): Promise<IResponseMainDirections> => {
  return api.get('/reference/main-direction', { params });
};
const getMainDirectionById = (id: number | string): Promise<IResponseMainDirection> => {
  return api.get('/reference/main-direction/show/' + id);
};
const getDirection = (params: IDirectionParam): Promise<IResponseDirections> => {
  return api.get('/reference/direction', { params });
};
const getSubDirection = (params: ISubDirectionParam): Promise<IResponseSubDirections> => {
  return api.get('/reference/sub-direction', {
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
};
const getMenuPage = (menuId: any): Promise<IResponsePage> => {
  return api.get('/reference/pages/menu/' + menuId);
};
const getAdvice = (params: IAdviceParam): Promise<IResponseAllAdvice> => {
  return api.get('reference/advice', { params });
};
export const ReferenceService = {
  getMainDirection,
  getMainDirectionById,
  getDirection,
  getSubDirection,
  getCategory,
  getAddress,
  fileUpload,
  removeFileUpload,
  getMenu,
  getMenuPage,
  getAdvice,
};
