export interface IPageOptions {
  order: "ASC" | "DESC";
  page: number;
  limit: number;
}
export interface IAdParam extends IPageOptions {
  mainDirectionIds?: number[];
  directionIds?: number[];
  subDirectionIds?: number[];
  categoryIds?: number[];
}
export interface IFile {
  key: string;
  bucket: string;
  mimeType: string;
  size: string | null;
  filename: string | null;
  file: string | null;
}
export interface IUser {
  email: string;
  password: string;
}
export interface IVerifyOtp {
  otp: string;
  details: string;
  type: "Registration" | "Forget" | "Verification";
}
