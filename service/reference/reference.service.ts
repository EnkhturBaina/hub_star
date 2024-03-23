import {
  IResponseAddresses,
  IResponseCategories,
  IResponseDirections,
  IResponseMainDirections,
  IResponseSubDirections,
} from "@/interfaces/response.interface";
import { api } from "../api.service";

const getMainDirection = (): Promise<IResponseMainDirections> => {
  return api.get("/reference/main-direction");
};
const getDirection = (): Promise<IResponseDirections> => {
  return api.get("/reference/main-direction");
};
const getSubDirection = (): Promise<IResponseSubDirections> => {
  return api.get("/reference/main-direction");
};
const getCategory = (): Promise<IResponseCategories> => {
  return api.get("/reference/main-direction");
};
const getAddress = (): Promise<IResponseAddresses> => {
  return api.get("/reference/main-direction");
};
export const ReferenceService = {
  getMainDirection,
  getDirection,
  getSubDirection,
  getCategory,
  getAddress,
};
