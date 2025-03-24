import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import { Users } from '@typeDefs/user';
import { NextPage } from 'next';
import { useAuthState } from '@context/auth';
import AuthService from '@services/auth';
import MyButton from '@components/atoms/button';
import withAuth from '@components/atoms/withAuth';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Profile from '@components/molecules/Profile/Content/Profile';

const ProfilePage: NextPage = () => {
  const t = useTranslations('profile');
  const { user } = useAuthState();
  const [values, setValues] = useState<Users>(null);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  useEffect(() => {
    if (values == null) {
      setValues(user);
    }
  }, [user]);

  const saveProfile = () => {
    if (!values?.jobPosition) {
      toast.error('Албан тушаал оруулна уу.');
    } else if (values?.address == '') {
      toast.error('Хаяг оруулна уу.');
    } else {
      setButtonLoader(true);
      try {
        AuthService.editMyProfile({
          jobPosition: values.jobPosition,
          address: values.address,
          organizationName: values.organizationName,
        })
          .then(() => {
            // setAuthUserData(response?.data?.response);
            setButtonLoader(false);
            toast.success('Амжилттай хадгаллаа');
          })
          .catch(error => {
            console.error('Error fetching :', error);
          });
      } catch (error) {
        setButtonLoader(false);
        console.error('catch error :', error);
      }
    }
  };
  if (values == null) return <ProfileFields />;
  else
    return (
      <>
        <Head>
          <title>{t('profile')} | Hub Star</title>
        </Head>
        <Profile user={values} handleUser={setValues} edit={true} />
        <div className="flex flex-row justify-end">
          <MyButton onClick={saveProfile} loading={buttonLoader}>
            Хадгалах
          </MyButton>
        </div>
      </>
    );
};

export default withAuth(ProfilePage);
