import {
  IResponseAdvertisement,
  IResponseAdvertisements,
} from '@/interfaces/response.interface';
import { api } from '../api.service';
import { IAdParam, ICreateAd } from '@/interfaces/request.interface';
import { Advertisement } from '@/types/advertisement';

const get = (params: IAdParam): Promise<IResponseAdvertisements> => {
  return api.get('/advertisement', { params });
};
const getById = (id: number | string | string[]): Promise<IResponseAdvertisement> => {
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
export const AdvertisementService = {
  get,
  getById,
  create,
  update,
  save,
};
