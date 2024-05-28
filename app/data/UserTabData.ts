import { UserTab } from '@/types/reference';

const UserTabData: UserTab[] = [
  {
    type: 'SUBSCRIBER',
    image: '/images/user-type/subscriber.svg',
    title: 'Захиалагч',
  },
  {
    type: 'EXECUTOR',
    image: '/images/user-type/executor.svg',
    title: 'Гүйцэтгэгч',
  },
  {
    type: 'SUPPLIER',
    image: '/images/user-type/supplier.svg',
    title: 'Ханган нийлүүлэгч',
  },
  {
    type: 'TRANSPORTATION',
    image: '/images/user-type/transportation.svg',
    title: 'Тээвэр',
  },
  {
    type: 'MACHINERY',
    image: '/images/user-type/machinery.svg',
    title: 'Машин механизм',
  },
];

export default UserTabData;
