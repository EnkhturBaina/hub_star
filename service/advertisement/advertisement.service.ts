import {
  IResponseAdProgress,
  IResponseAdvertisement,
  IResponseAdvertisements,
  IResponseAllAdProgress,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import { IAdParam, IAdProgressParam, ICreateAd } from '@/interfaces/request.interface';
import { AdvertisementProgress, AdProcess, Advertisement } from '@/types/advertisement';

const get = (params: IAdParam): Promise<IResponseAdvertisements> => {
  return api.get('/advertisement', { params });
};
const getById = (id: number): Promise<IResponseAdvertisement> => {
  return api.get(`/advertisement/${id}`);
};
const create = (advertisement: ICreateAd): Promise<IResponseAdvertisement> => {
  return api.post('/advertisement', advertisement);
};
const update = (advertisement: Advertisement): Promise<IResponseAdvertisement> => {
  return api.patch('/advertisement/' + advertisement.id, advertisement);
};
const save = (id: number): Promise<IResponseAdvertisement> => {
  return api.post('advertisement/save/' + id);
};
const addProgress = (progress: AdvertisementProgress): Promise<IResponseAdProgress> => {
  return api.post('ad-progress', progress);
};
const editProgress = (progress: AdvertisementProgress): Promise<IResponseAdProgress> => {
  return api.post('ad-progress', progress);
};
const getProgress = (params: IAdProgressParam): Promise<IResponseAllAdProgress> => {
  return api.get('ad-progress', { params });
};
const removeProgress = (id: number): Promise<IResponseAdProgress> => {
  return api.delete('ad-progress/' + id);
};
export const AdvertisementService = {
  get,
  getById,
  create,
  update,
  save,
  addProgress,
  editProgress,
  getProgress,
  removeProgress,
};
