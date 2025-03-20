import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from '@context/auth';

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated } = useAuthState();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/auth/signin');
      }
    }, []);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
export default withAuth;
