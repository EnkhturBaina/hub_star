import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  return <div>Register</div>;
};
export const getStaticProps = withTranslationProps();
export default SignUpPage;
