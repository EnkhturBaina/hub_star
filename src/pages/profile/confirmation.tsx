import React, { useEffect, useState } from 'react';
import withAuth from '@components/atoms/withAuth';
import { GrOrganization, GrUser } from 'react-icons/gr';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
// import { Button, Input } from '@heroui/react';
import classNames from '@utils/classNames';
import AuthService from '@services/auth';
import MyButton from '@components/atoms/button';
import NumberField from '@components/atoms/numberField';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const Confirmation = () => {
  const t = useTranslations('profile');
  const router = useRouter();
  const [type, setType] = useState('');
  const [orgRegno, setOrgregno] = useState<number>();

  useEffect(() => {
    const getToken = async (token: any) => {
      if (typeof router.query.code == 'string') {
        const { response } = await AuthService.getSsoGovToken(token);
        if (typeof response.access_token == 'string') {
          const data = await AuthService.getSsoGovData(response.access_token);
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
    <>
      <Head>
        <title>{t('confirmation')} | Hub Star</title>
      </Head>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        <MyButton
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          onClick={() => setType('org')}
        >
          <GrOrganization
            className={classNames(
              'text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer',
              type == 'org' ? 'text-mainBlue' : null
            )}
          />
          <div className="font-medium text-center text-2xl">Хуулийн этгээд</div>
        </MyButton>
        <MyButton
          className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
          onClick={() => setType('citizen')}
        >
          <GrUser
            className={classNames(
              ' text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer',
              type == 'citizen' ? 'text-mainBlue' : null
            )}
          />
          <div className="font-medium text-center text-2xl">Хувь хүн</div>
        </MyButton>
      </div>
      <div className="flex flex-col gap-y-2">
        {type == 'org' ? (
          <>
            <div className="border border-yellow-400 bg-yellow-50 p-4 rounded-md text-yellow-800 mt-4">
              Анхааруулга: Байгууллага тоон гарын үсгээр баталгаажуулалт хийгдэнэ
            </div>
            <NumberField
              label="Байгууллагын регистр"
              placeholder="--"
              value={orgRegno}
              onChange={setOrgregno}
            />
          </>
        ) : null}
        <MyButton className="mt-4" onClick={handleConfirm}>
          Баталгаажуулах
        </MyButton>
      </div>
    </>
  );
};
export default withAuth(Confirmation);
