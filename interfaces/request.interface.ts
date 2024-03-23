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
