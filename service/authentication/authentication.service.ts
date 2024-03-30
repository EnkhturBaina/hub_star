import { IVerifyOtp, IUser } from '@/interfaces/request.interface';
import { api } from '../api.service';
import { IResponse, IResponseLogin, IResponseProfile } from '@/interfaces/response.interface';
import { Users } from '@/types/user';

const register = (user: IUser) => {
  return api.post('/authentication/register', user);
};
const login = (user: IUser): Promise<IResponseLogin> => {
  return api.post('/authentication/login', user);
};
const otpVerify = (otp: IVerifyOtp) => {
  return api.post('/authentication/verify/otp', otp);
};
const logout = (): Promise<IResponse> => {
  return api.post('/authentication/logout');
};
const profile = (): Promise<IResponseProfile> => {
  return api.get('/authentication');
};
const changePassword = (password: string) => {
  return api.post('/changePassword', { password });
};
const updateById = (id: number, user: Users): Promise<IResponseProfile> => {
  return api.patch(`/users/${id}`, user);
};
export const AuthService = {
  register,
  login,
  otpVerify,
  logout,
  profile,
  changePassword,
  updateById,
};
