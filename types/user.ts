import { Advertisement } from './advertisement';
import { LocalFile, MainDirection, UserType } from './reference';
/** Хэрэглэгчийн мэдээлэл */
export type Users = {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  jobPosition?: string;
  bank?: string; // Банк
  bankAccount?: string; // Эзэмшигчийн нэр
  bankAccountNo?: string; // Дансны дугаар
  isActive?: boolean;
  avatarId?: number;
  avatar?: LocalFile;
  coverId?: number;
  cover?: LocalFile;
  address?: string;
  userType: UserType; // Хэрэглэгчийн төрөл
  mainDirectionId?: number;
  mainDirection?: MainDirection; // Үйл ажиллагаанийн чиглэл
  frontPassportImageId?: number; // үнэмлэхний урд талын зураг
  behindPassportImageId?: number; // үнэмлэхний ард талын зураг
  selfieImageId?: number; // селфи зураг
  organizationLogoId?: number; // Багууллагын лого
  organizationName?: string; // Байгууллагын нэр
  organizationRegno?: string; // Байгууллагын регистр
  trainingOrg?: string; // Байгууллагын үйл ажилгааний чиглэл
  saveAdvertisements?: Advertisement[];
  role?: string;
  webUrl?: string; // Веб хуудас
  experience?: string; // Байгууллагын танилцуулга ба ажлын туршлага
};
export default Users;
