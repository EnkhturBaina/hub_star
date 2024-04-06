import { NextPage } from 'next';

/** TODO ETR bro Бусад хэрэглэгчийн профайл */
type Props = {
  params: {
    slug: number;
  };
};
const UserProfilePage: NextPage<Props> = ({ params }) => {
  return <div>Hello other user {params.slug}</div>;
};
export default UserProfilePage;
