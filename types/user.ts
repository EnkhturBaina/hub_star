import { Advertisement } from './advertisement';
import { Category, LocalFile, MainDirection } from './reference';
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
  categoryId?: number;
  category?: Category; // Хэрэглэгчийн төрөл
  mainDirectionId?: number;
  mainDirection?: MainDirection; // Үйл ажиллагаанийн чиглэл
  frontPassportImageId?: number;
  frontPassportImage?: LocalFile; // үнэмлэхний урд талын зураг
  behindPassportImageId?: number;
  behindPassportImage?: LocalFile; // үнэмлэхний ард талын зураг
  selfieImageId?: number;
  selfieImage?: LocalFile; // селфи зураг
  organizationLogoId?: number;
  organizationLogo?: LocalFile; // Багууллагын лого
  organizationName?: string; // Байгууллагын нэр
  organizationRegno?: string; // Байгууллагын регистр
  trainingOrg?: string; // Сургалтын байгууллага
  saveAdvertisements?: Advertisement[];
  role?: string;
};
export default Users;