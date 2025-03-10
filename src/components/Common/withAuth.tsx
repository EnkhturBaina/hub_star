import { getAccessToken } from '@/service/api.service';
import Redirect from './Redirect';

function withAuth(Component: React.ComponentType) {
  const token = getAccessToken();
  return function AuthComponent(props: any) {
    if (token) {
      return <Component {...props} />;
    }
    return <Redirect to={'/auth/signin'} />;
  };
}
export default withAuth;
