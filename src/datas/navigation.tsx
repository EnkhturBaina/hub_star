import {
  AddIcon,
  ConsultingIcon,
  ExecutorIcon,
  MachineIcon,
  MaterialIcon,
  MessageIcon,
  NotificationIcon,
  PublicSelectionIcon,
  SubscriberIcon,
  SupplierIcon,
  TrainingIcon,
  TransportationIcon,
} from '@components/common/icons';
import { NavigationMenu } from '@typeDefs/site';

export const UserNavigation: NavigationMenu[] = [
  { name: 'Профайл', href: '/profile' },
  { name: 'Баталгаажуулалт', href: '/profile/confirmation' },
  { name: 'Үйлчилгээ байршуулах', icon: <AddIcon />, href: '/profile/new-ad' },
  { name: 'Байршуулсан үйлчилгээ', href: '/profile/my-ad' },
  { name: 'Хийгдэж буй ажил', href: '/profile/part-ad' },
  { name: 'Хадгалсан үйлчилгээнүүд', href: '/profile/save-ad' },
  { name: 'Үйлчилгээний түүх', href: '/profile/confirm-ad' },
  { name: 'Дансны мэдээлэл', href: '/profile/#' },
  { name: 'Нууц үг', href: '/profile/change-password' },
  { name: 'Мэдэгдэл', icon: <NotificationIcon />, href: '/profile/my-notification' },
  { name: 'Мессэж', icon: <MessageIcon />, href: '/profile/my-notification' },
  { name: 'Зөвлөмжүүд', href: '/profile/my-advice' },
];
export const CategoryNavigation: NavigationMenu[] = [
  { name: 'subscriber', imagePath: '/images/subscriber.svg', href: '/ad?userType=SUBSCRIBER' },
  { name: 'executor', imagePath: '/images/executor.svg', href: '/ad?userType=EXECUTOR' },
  { name: 'supplier', imagePath: '/images/supplier.svg', href: '/ad?userType=SUPPLIER' },
  { name: 'transportation', imagePath: '/images/transportation.svg', href: '/ad?userType=TRANSPORTATION' },
  { name: 'machinery', imagePath: '/images/machinery.svg', href: '/ad?userType=MACHINERY' },
];
export const SpecialCategoryNavigation: NavigationMenu[] = [
  {
    name: 'publicSelection',
    icon: <PublicSelectionIcon />,
    href: '/ad?specialService=PUBLIC_SELECTION',
  },
  {
    name: 'internationalTrade',
    icon: <PublicSelectionIcon />,
    href: '/ad?specialService=INTERNATIONAL_TRADE',
  },
  {
    name: 'consultingService',
    icon: <ConsultingIcon />,
    href: '/ad?specialService=CONSULTING_SERVICE',
  },
  {
    name: 'consultingService',
    icon: <ConsultingIcon />,
    href: '/ad?specialService=CONSULTING_SERVICE',
  },
  {
    name: 'vocationalTraining',
    icon: <TrainingIcon />,
    href: '/ad?specialService=VOCATIONAL_TRAINING',
  },
  {
    name: 'laboratoryMaterial',
    icon: <MaterialIcon />,
    href: '/ad?specialService=LABORATORY_MATERIAL',
  },
];
