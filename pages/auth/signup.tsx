import Signin from '@/components/Auth/Signin';
import Signup from '@/components/Auth/Signup';
import { Metadata, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const metadata: Metadata = {
  title: 'Hub star',
  description: 'All at once',
  // other metadata
};
const SignupPage: NextPage = () => {
  return <Signup />;
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default SignupPage;
