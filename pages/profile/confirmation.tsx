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
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Input } from '@nextui-org/react';
import { classNames } from '@/utils/util';

const Confirmation = () => {
  const router = useRouter();
  const [type, setType] = useState('');
  const [orgRegno, setOrgregno] = useState('');

  useEffect(() => {
    const getToken = async (token: any) => {
      if (typeof router.query.code == 'string') {
        const { response } = await SsoGovService.getToken(token);
        if (typeof response.access_token == 'string') {
          const data = await SsoGovService.getData(response.access_token);
          console.log('data =========>', data);
        }
      }
    };
    getToken(router.query?.code);
  }, [router.query.code]);

  useEffect(() => {
    if (router.query.error == 'access_denied') {
      toast.error('Баталгаажуулалт хийхээс татгазлаа.');
    }
  }, [router.query.error]);

  const handleConfirm = () => {
    if (type == 'org') {
      router.push(`${process.env.NEXT_PUBLIC_BASE_API_URL}sso-gov/auth-request-org/${orgRegno}`);
    } else if (type == 'citizen') {
      router.push(`${process.env.NEXT_PUBLIC_BASE_API_URL}sso-gov/auth-request-citizen`);
    }
  };
  return (
    <ProfileLayout>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        <Button
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          onClick={() => setType('org')}
          isIconOnly
        >
          <GrOrganization
            className={classNames(
              'text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer',
              type == 'org' ? 'text-mainBlue' : null
            )}
          />
          <div className="font-medium text-center text-2xl">Хуулийн этгээд</div>
        </Button>
        <Button
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          onClick={() => setType('citizen')}
          isIconOnly
        >
          <GrUser
            className={classNames(
              ' text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer',
              type == 'citizen' ? 'text-mainBlue' : null
            )}
          />
          <div className="font-medium text-center text-2xl">Хувь хүн</div>
        </Button>
      </div>
      <div className="flex flex-col gap-y-2">
        {type == 'org' ? (
          <Input
            inputMode="numeric"
            label="Байгууллагын регистр"
            labelPlacement="outside"
            placeholder="--"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{ label: 'font-bold', innerWrapper: ['custom-input-wrapper', 'bg-white'] }}
            value={orgRegno}
            onValueChange={setOrgregno}
          />
        ) : null}
        <Button
          className="mr-4 bg-mainColor !text-white"
          radius="sm"
          size="md"
          onClick={handleConfirm}
        >
          Баталгаажуулах
        </Button>
      </div>
    </ProfileLayout>
  );
};
export const getStaticProps: GetStaticProps = withTranslationProps();
export default withAuth(Confirmation);
