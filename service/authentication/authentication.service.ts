import { IVerifyOtp, IUser } from "@/interfaces/request.interface";
import { api } from "../api.service";
import { IResponseLogin } from "@/interfaces/response.interface";

const register = (user: IUser) => {
  return api.post("/authentication/register", user);
};
const login = (user: IUser): Promise<IResponseLogin> => {
  return api.post("/authentication/login", user);
};
const otpVerify = (otp: IVerifyOtp) => {
  return api.post("/authentication/verify/otp", otp);
};
const logout = () => {
  return api.post("/authentication/logout");
};
const profile = () => {
  return api.get("/authentication");
};
const changePassword = (password: string) => {
  return api.post("/changePassword", { password });
};
export const AuthService = {
  register,
  login,
  otpVerify,
  logout,
  profile,
  changePassword,
};
