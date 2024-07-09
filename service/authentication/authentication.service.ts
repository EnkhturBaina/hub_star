import { IVerifyOtp, IUser, IEmailOtp, IChangePassword } from '@/interfaces/request.interface';
import { api } from '../api.service';
import {
  IResponse,
  IResponseLogin,
  IResponseMyProfile,
  IResponseOtp,
  IResponseOtpVerify,
  IResponseProfile,
} from '@/interfaces/response.interface';
import { Users } from '@/types/user';

const register = (user: IUser): Promise<IResponseOtp> => {
  return api.post('/authentication/register', user);
};
const login = (user: IUser): Promise<IResponseLogin> => {
  return api.post('/authentication/login', user);
};
const emailOtp = (emailOtp: IEmailOtp): Promise<IResponseOtp> => {
  return api.post('/authentication/email/otp', emailOtp);
};
const otpVerify = (otp: IVerifyOtp): Promise<IResponseOtpVerify> => {
  return api.post('/authentication/verify/otp', otp);
};
const logout = (): Promise<IResponse> => {
  return api.post('/authentication/logout');
};
const profile = (): Promise<IResponseMyProfile> => {
  return api.get('/authentication');
};
const otherProfile = (id: number): Promise<IResponseProfile> => {
  return api.get('/authentication/profile/' + id);
};
const changePassword = (changePassword: IChangePassword): Promise<IResponse> => {
  return api.post('/authentication/change-password', changePassword);
};
const updateById = (id: number, user: Users): Promise<IResponseProfile> => {
  return api.patch(`/users/${id}`, user);
};
const removeUser = (id: number): Promise<IResponseProfile> => {
  return api.delete(`/users/${id}`);
};
export const AuthService = {
  register,
  login,
  emailOtp,
  otpVerify,
  logout,
  profile,
  otherProfile,
  changePassword,
  updateById,
  removeUser,
};
