import { UserTab } from '@/types/reference';

const UserTabData: UserTab[] = [
  {
    type: 'SUBSCRIBER',
    image: '/images/user-type/subscriber.svg',
    title: 'ЗАХИАЛАГЧ',
  },
  {
    type: 'EXECUTOR',
    image: '/images/user-type/executor.svg',
    title: 'ГҮЙЦЭТГЭГЧ',
  },
  {
    type: 'SUPPLIER',
    image: '/images/user-type/supplier.svg',
    title: 'ХАНГАН НИЙЛҮҮЛЭГЧ',
  },
  {
    type: 'TRANSPORTATION',
    image: '/images/user-type/transportation.svg',
    title: 'ТЭЭВЭР',
  },
  {
    type: 'MACHINERY',
    image: '/images/user-type/machinery.svg',
    title: 'МАШИН МЕХАНИЗМ',
  },
];

export default UserTabData;
