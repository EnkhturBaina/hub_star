import ProfileLayout from '@/layouts/profile.layout';
import withAuth from '@/components/Common/withAuth';
import { GrOrganization, GrUser } from 'react-icons/gr';
import { GetStaticProps } from 'next';
import { withTranslationProps } from '@/app/lib/with-translation';
// remove? import { ConfirmationOrganization } from '@/components/Profile/Content/confirmation-organization';
// remove? import { ConfirmationCitizen } from '@/components/Profile/Content/confirmation-citizen';
import { useRouter } from 'next/router';
import { SsoGovService } from '@/service/sso-gov/sso-gov.service';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Confirmation = () => {
  const router = useRouter();
  const getToken = async (token: string) => {
    const { response } = await SsoGovService.getToken(token);
    if (typeof response.access_token == 'string') {
      const data = await SsoGovService.getData(response.access_token);
      console.log('data =========>', data);
    }
  };

  useEffect(() => {
    if (typeof router.query.code == 'string') {
      getToken(router.query.code);
    }
  }, [router.query.code]);

  useEffect(() => {
    if (router.query.error == 'access_denied') {
      toast.error('Баталгаажуулалт хийхээс татгазлаа.');
    }
  }, [router.query.error]);

  return (
    <ProfileLayout>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        <Link
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          href={`${process.env.NEXT_PUBLIC_BASE_API_URL}sso-gov/auth-request-org`}
        >
          <GrOrganization className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
          <div className="font-medium text-center text-2xl">Хуулийн этгээд</div>
        </Link>
        <Link
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          href={`${process.env.NEXT_PUBLIC_BASE_API_URL}sso-gov/auth-request-citizen`}
        >
          <GrUser className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
          <div className="font-medium text-center text-2xl">Хувь хүн</div>
        </Link>
      </div>
    </ProfileLayout>
  );
};
export const getStaticProps: GetStaticProps = withTranslationProps();
export default withAuth(Confirmation);
