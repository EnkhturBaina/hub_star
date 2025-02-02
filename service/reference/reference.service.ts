import {
  IResponse,
  IResponseAddresses,
  IResponseAllAdvice,
  IResponseAllParticipant,
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
  IResponseParticipant,
  IResponseSubDirections,
  IResponseSuccess,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import {
  IAddressParam,
  IAdviceParam,
  IDirectionParam,
  IMachineryParam,
  IMainDirectionParam,
  IParticipantParam,
  IRefNotificationParam,
  ISubDirectionParam,
} from '@/interfaces/request.interface';
import { Participant, RefNotification } from '@/types/reference';
const getMainDirection = (params: IMainDirectionParam): Promise<IResponseMainDirections> => {
  return api.get('/reference/main-direction', { params });
};
const getDirectionFilter = (params: any): Promise<IResponseSuccess> => {
  return api.get('/reference/main-direction/filter', { params });
};
const getMainDirectionById = (id: number): Promise<IResponseMainDirection> => {
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
const getPageByType = (type: 'TERM_OF_SERVICE'): Promise<IResponsePage> => {
  return api.get('/reference/pages/' + type);
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
const getParticipant = (params: IParticipantParam): Promise<IResponseAllParticipant> => {
  return api.get('/ad/participant', { params });
};
const createParticipant = (data: Participant): Promise<IResponseParticipant> => {
  return api.post('/ad/participant', data);
};
const removeParticipant = (id: number): Promise<IResponse> => {
  return api.delete('/ad/participant' + id);
};
const getAllBranch = (): Promise<IResponseSuccess> => {
  return api.get('/reference/branch');
};
const getAllPartnership = (branchId?: any): Promise<IResponseSuccess> => {
  return api.get('/partnership', { params: { branchId } });
};
const getByIdPartnership = (partnershipId: any): Promise<IResponseSuccess> => {
  return api.get(`/partnership/${partnershipId}`);
};
export const ReferenceService = {
  getMainDirection,
  getDirectionFilter,
  getMainDirectionById,
  getDirection,
  getSubDirection,
  getAddress,
  fileUpload,
  removeFileUpload,
  getMenu,
  getMenuPage,
  getPageByType,
  getAdvice,
  getNotification,
  createNotification,
  updateNotification,
  removeNotification,
  getNews,
  getNewsById,
  getMachinery,
  getParticipant,
  createParticipant,
  removeParticipant,
  getAllBranch,
  getAllPartnership,
  getByIdPartnership,
};
