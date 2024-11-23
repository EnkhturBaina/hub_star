import { HorizontalLogo } from '@components/common/icons';
import { useAuthState } from '@context/auth';
import AuthService from '@services/auth';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import { withTranslationProps } from '@utils/withTranslationProps';
import { Alert, Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SignInPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setLogin, user } = useAuthState();
  const [form] = Form.useForm();
  const [loginError, setLoginError] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);

  const onFinish = async () => {
    try {
      setButtonLoader(true);
      const res = await AuthService.authenticate(form.getFieldsValue());
      if (res && res.success) {
        AuthTokenStorageService.store(res?.response?.accessToken);
        setLogin(res?.response?.accessToken);
        setLoginError(null);
      } else {
        setButtonLoader(false);
        setLoginError('error');
      }
    } catch (e) {
      setButtonLoader(false);
      setLoginError('error');
    }
  };
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <HorizontalLogo className="mx-auto h-10 w-auto" />
        </Link>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form className="space-y-6" layout="vertical" form={form} onFinish={onFinish}>
            {loginError && (
              <div className="mb-3 mt-4 w-full">
                <Alert
                  type="error"
                  message="Алдаа гарлаа"
                  description="Нэвтрэх нэр эсвэл нууц үг буруу байна"
                  closable
                  onClose={() => setLoginError(null)}
                />
              </div>
            )}
            <Form.Item
              name="username"
              className="text-sm/6 font-medium text-gray-900"
              label={t('emailOrPhone')}
              rules={[
                { required: true, message: 'Нэвтрэх нэрээ оруулна уу!' },
                { type: 'string', warningOnly: true },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              className="text-sm/6 font-medium text-gray-900"
              label={t('password')}
              rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
            >
              <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
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
              <Button
                htmlType="submit"
                className="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm"
                loading={buttonLoader}
              >
                {t('login')}
              </Button>
            </div>
          </Form>
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
