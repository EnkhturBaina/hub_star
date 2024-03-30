import { IResponseAdvertisement, IResponseAdvertisements } from '@/interfaces/response.interface';
import { api } from '../api.service';
import { IAdParam, ICreateAd } from '@/interfaces/request.interface';

const get = (params: IAdParam): Promise<IResponseAdvertisements> => {
  return api.get('/advertisement', { params });
};
const getById = (id: number): Promise<IResponseAdvertisement> => {
  return api.get(`/advertisement/${id}`);
};
const create = (advertisement: ICreateAd): Promise<IResponseAdvertisement> => {
  return api.post('/advertisement', advertisement);
};
const save = (id: number): Promise<IResponseAdvertisement> => {
  return api.post(`advertisement/${id}`);
};
export const AdvertisementService = { get, getById, create, save };
