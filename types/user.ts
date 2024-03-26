import { Advertisement } from "./advertisement";
import { LocalFile } from "./reference";

export type Users = {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    jobPosition?: string;
    bank?: string;
    bankAccount?: string;
    bankAccountNo?: string;
    isActive?: boolean;
    avatarId?: number;
    avatar?: LocalFile;
    coverId?: number;
    cover?: LocalFile;
    address?: string;
    saveAdvertisements?: Advertisement[];
}