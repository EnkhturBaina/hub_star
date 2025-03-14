import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Textarea } from '@heroui/react';
import toast from 'react-hot-toast';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import { Users } from '@typeDefs/user';
import { AuthService } from '@services/authentication/authentication.service';
import { NextPage } from 'next';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';
import ProfileLayout from '@components/molecules/Profile/ProfileLayout';

const Profile: NextPage = () => {
  const { user } = useAuthState();
  const [profileData, setProfileData] = useState<Users>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const validateEmail = value => value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  useEffect(() => {
    if (profileData == null) {
      setProfileData(user);
    }
  }, [user]);

  const isInvalid = useMemo(() => {
    if (profileData?.email === '') return false;

    return validateEmail(profileData?.email) ? false : true;
  }, [profileData?.email]);

  const saveProfile = () => {
    if (!profileData?.lastName) {
      toast.error('Овог оруулна уу.');
    } else if (!profileData?.firstName) {
      toast.error('Нэрээ оруулна уу.');
    } else if (!profileData?.jobPosition) {
      toast.error('Албан тушаал оруулна уу.');
    } else if (profileData?.phone == '') {
      toast.error('Утасны дугаараа оруулна уу.');
    } else if (profileData?.email == '') {
      toast.error('И-Мэйл хаягаа оруулна уу.');
    } else if (isInvalid) {
      toast.error('И-Мэйл хаяг буруу байна.');
    } else if (profileData?.email == '') {
      toast.error('Хаяг оруулна уу.');
    } else {
      setIsSaving(true);
      try {
        AuthService.updateById(profileData.id, {
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          jobPosition: profileData.jobPosition,
          address: profileData.address,
          organizationName: profileData.organizationName,
          userType: profileData.userType,
          isConfirm: profileData.isConfirm,
          isCitizen: profileData.isCitizen,
        })
          .then(() => {
            // setAuthUserData(response?.data?.response);
            setIsSaving(false);
            toast.success('Амжилттай хадгаллаа');
          })
          .catch(error => {
            console.error('Error fetching :', error);
          });
      } catch (error) {
        console.error('catch error :', error);
      }
    }
  };

  return (
    <ProfileLayout>
      {profileData == null ? (
        <ProfileFields />
      ) : (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden p-2"
        >
          <Input
            key="lName"
            type="text"
            label="Овог"
            labelPlacement="outside"
            placeholder="Овог"
            radius="sm"
            size="lg"
            variant="bordered"
            isRequired
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.lastName || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                lastName: e,
              }));
            }}
          />
          <Input
            key="fName"
            type="text"
            label="Нэр"
            labelPlacement="outside"
            placeholder="Нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            isRequired
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.firstName || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                firstName: e,
              }));
            }}
          />
          <Input
            key="position"
            type="text"
            label="Албан тушаал"
            labelPlacement="outside"
            placeholder="Албан тушаал"
            radius="sm"
            size="lg"
            variant="bordered"
            isRequired
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.jobPosition || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                jobPosition: e,
              }));
            }}
          />
          <Input
            key="mobileNumber"
            type="text"
            label="Утасны дугаар"
            labelPlacement="outside"
            placeholder="Утасны дугаар"
            radius="sm"
            size="lg"
            variant="bordered"
            isRequired
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.phone || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                phone: e,
              }));
            }}
          />
          <Input
            key="email"
            type="email"
            label="И-мэйл хаяг"
            labelPlacement="outside"
            placeholder="И-мэйл хаяг"
            radius="sm"
            size="lg"
            variant="bordered"
            isRequired
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            isInvalid={isInvalid}
            color={isInvalid ? 'danger' : 'default'}
            errorMessage={isInvalid && 'И-Мэйл хаягаа зөв оруулна уу.'}
            value={profileData?.email || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                email: e,
              }));
            }}
          />
          {!profileData?.isCitizen && (
            <Input
              key="organizationName"
              type="text"
              label="Байгууллагын нэр"
              labelPlacement="outside"
              placeholder="Байгууллагын нэр"
              radius="sm"
              size="lg"
              variant="bordered"
              classNames={{
                label: 'font-bold',
                inputWrapper: ['custom-input-wrapper', 'bg-white'],
              }}
              value={profileData?.organizationName ?? ''}
              onValueChange={e => {
                setProfileData((prevState: Users) => ({
                  ...prevState,
                  organizationName: e,
                }));
              }}
            />
          )}
          <Input
            key="organizationName"
            type="text"
            label="Байгууллагын регистр"
            labelPlacement="outside"
            placeholder="Байгууллагын регистр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.organizationRegno ?? ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                organizationRegno: e,
              }));
            }}
          />
          <Textarea
            variant="bordered"
            label="Хаяг"
            labelPlacement="outside"
            radius="sm"
            placeholder="Хаяг"
            isRequired
            classNames={{
              base: 'w-full',
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={profileData?.address || ''}
            onValueChange={e => {
              setProfileData((prevState: Users) => ({
                ...prevState,
                address: e,
              }));
            }}
          />
          <div className="flex flex-row justify-end">
            <Button
              className="mr-4 bg-mainColor !text-white"
              radius="sm"
              size="md"
              onClick={saveProfile}
              isDisabled={isSaving}
            >
              Хадгалах
            </Button>
          </div>
        </motion.div>
      )}
    </ProfileLayout>
  );
};

export default withAuth(Profile);
