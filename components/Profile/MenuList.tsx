import Account from './Content/Account';
import Advices from './Content/Advices';
import Confirmation from './Content/Confirmation';
import DoingServices from './Content/DoingServices';
import Messenger from './Content/Messenger';
import Notification from './Content/Notification';
import Password from './Content/Password';
import PostedServices from './Content/PostedServices';
import Profile from './Content/Profile';
import SavedServices from './Content/SavedServices';
import ServiceHistory from './Content/ServiceHistory';

const MenuList: any[] = [
  {
    id: '1',
    title: 'Профайл',
    key: 'profile',
    content: <Profile />,
  },
  {
    id: '2',
    title: 'Мессенжер',
    key: 'messenger',
    content: <Messenger />,
  },
  {
    id: '3',
    title: 'Байршуулсан үйлчилгээ',
    key: 'posted_services',
    content: <PostedServices />,
  },
  {
    id: '4',
    title: 'Хийгдэж буй ажил',
    key: 'doing_services',
    content: <DoingServices />,
  },
  {
    id: '5',
    title: 'Хадгалагдсан үйлчилгээнүүд',
    key: 'saved_services',
    content: <SavedServices />,
  },
  {
    id: '6',
    title: 'Үйлчилгээний түүх',
    key: 'service_history',
    content: <ServiceHistory />,
  },
  {
    id: '7',
    title: 'Дансны мэдээлэл',
    key: 'account',
    content: <Account />,
  },
  {
    id: '8',
    title: 'Баталгаажуулалт',
    key: 'confirmation',
    content: <Confirmation />,
  },
  {
    id: '9',
    title: 'Нууц үг',
    key: 'password',
    content: <Password />,
  },
  {
    id: '10',
    title: 'Мэдэгдэл',
    key: 'notification',
    content: <Notification />,
  },
  {
    id: '11',
    title: 'Зөвлөмжүүд',
    key: 'advices',
    content: <Advices />,
  },
];

export default MenuList;
