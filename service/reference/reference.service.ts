import {
  IResponse,
  IResponseAddresses,
  IResponseAllAdvice,
  IResponseCategories,
  IResponseDirections,
  IResponseLocalFile,
  IResponseMachinery,
  IResponseMainDirection,
  IResponseMainDirections,
  IResponseMenu,
  IResponseNews,
  IResponseNotification,
  IResponseNotifications,
  IResponseOneNews,
  IResponsePage,
  IResponseSubDirections,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import {
  IAddressParam,
  IAdviceParam,
  IDirectionParam,
  IMachineryParam,
  IRefNotificationParam,
  ISubDirectionParam,
} from '@/interfaces/request.interface';
import { RefNotification } from '@/types/reference';
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
const getNotification = (params: IRefNotificationParam): Promise<IResponseNotifications> => {
  return api.get('/notification', { params });
};
const createNotification = (data: RefNotification): Promise<IResponseNotification> => {
  return api.post('/notification', data);
};
const updateNotification = (id: number, data: RefNotification): Promise<IResponseNotification> => {
  return api.patch('/notification/' + id, data);
};
const removeNotification = (id: number): Promise<IResponseNotification> => {
  return api.delete('/notification/' + id);
};
const getNews = (): Promise<IResponseNews> => {
  return api.get('/reference/news');
};
const getNewsById = (id: number | string): Promise<IResponseOneNews> => {
  return api.get('/reference/news/show/' + id);
};
const getMachinery = (params: IMachineryParam): Promise<IResponseMachinery> => {
  return api.get('/reference/machinery', { params });
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
  getNotification,
  createNotification,
  updateNotification,
  removeNotification,
  getNews,
  getNewsById,
  getMachinery,
};
