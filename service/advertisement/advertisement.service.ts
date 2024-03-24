import {
  IResponseAdvertisement,
  IResponseAdvertisements,
} from "@/interfaces/response.interface";
import { api } from "../api.service";
import { IAdParam } from "@/interfaces/request.interface";
import { Advertisement } from "@/types/advertisement";

const get = (params: IAdParam): Promise<IResponseAdvertisements> => {
  return api.get("/advertisement", { params });
};
const getById = (id: number): Promise<IResponseAdvertisement> => {
  return api.get(`/advertisement/${id}`);
};
const create = (
  advertisement: Advertisement,
): Promise<IResponseAdvertisement> => {
  return api.post("/advertisement", advertisement);
};
const save = (id: number): Promise<IResponseAdvertisement> => {
  return api.post(`advertisement/${id}`);
};
export const AdvertisementService = { get, getById, create, save };
