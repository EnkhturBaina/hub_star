import { Users } from '@/types/user';
import { MdVerified } from 'react-icons/md';
interface IProps {
  user: Users;
}
const AuthName: React.FC<IProps> = ({ user }) => (
  <div className="flex flex-row ml-3 mr-5 font-bold text-black text-lg">
    {user?.isConfirm ? <MdVerified className="mt-1 mx-1 fill-primary" /> : null}
    {user?.lastName != null && user?.firstName != null
      ? `${user?.lastName?.substring(0, 1)}. ${user?.firstName}`
      : 'Хэрэглэгч'}
  </div>
);
export default AuthName;
