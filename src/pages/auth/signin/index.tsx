import { HorizontalLogo } from '@components/common/icons';
import { withTranslationProps } from '@utils/withTranslationProps';
import { Alert } from 'antd';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useState } from 'react';

const SignInPage: NextPage = () => {
  const { t } = useTranslation();
  const [loginError, setLoginError] = useState();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <HorizontalLogo className="mx-auto h-10 w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form action="#" method="POST" className="space-y-6">
            {loginError && (
              <div className="mb-3 mt-4 w-64">
                <Alert
                  type="error"
                  message="Алдаа гарлаа"
                  description="Нэвтрэх нэр эсвэл нууц үг буруу байна"
                  onClose={() => setLoginError(null)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                {t('emailOrPhone')}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                {t('password')}
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm/6">
                <Link
                  href="/auth/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('login')}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {t('doYouHaveAnAccount')}{' '}
          <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
};
export const getStaticProps = withTranslationProps();
export default SignInPage;
