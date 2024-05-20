import { Users } from '@/types/user';

interface IProps {
  user: Users;
}
const AuthName: React.FC<IProps> = ({ user }) => (
  <div className="ml-3 mr-5 font-bold text-black text-lg">
    {user?.lastName != null && user?.firstName != null
      ? `${user?.lastName?.substring(0, 1)}. ${user?.firstName}`
      : 'Хэрэглэгч'}
  </div>
);
export default AuthName;
