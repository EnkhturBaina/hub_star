import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
interface IProps {
  ssr?: boolean;
  to: string;
}
const Redirect: FC<IProps> = ({ to, ssr }) => {
  const router = useRouter();
  useEffect(() => {
    if (ssr) {
      window.location.pathname = to;
    } else {
      router.push(to);
    }
  }, []);

  return null;
};

export default Redirect;
