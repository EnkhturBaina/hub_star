import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import { Users } from '@typeDefs/user';
import { NextPage } from 'next';
import { useAuthState } from '@context/auth';
import AuthService from '@services/auth';
import TextField from '@components/atoms/textField';
import MyButton from '@components/atoms/button';
import TextAreaField from '@components/atoms/textAreaField';
import withAuth from '@components/atoms/withAuth';

const Profile: NextPage = () => {
  const { user } = useAuthState();
  const [values, setValues] = useState<Users>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const validateEmail = value => value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  useEffect(() => {
    if (values == null) {
      setValues(user);
    }
  }, [user]);

  const isInvalid = useMemo(() => {
    if (values?.email === '') return false;

    return validateEmail(values?.email) ? false : true;
  }, [values?.email]);

  const handleChange = (prop: keyof Users) => (value: any) => {
    setValues({ ...values, [prop]: value });
  };
  const saveProfile = () => {
    if (!values?.lastName) {
      toast.error('Овог оруулна уу.');
    } else if (!values?.firstName) {
      toast.error('Нэрээ оруулна уу.');
    } else if (!values?.jobPosition) {
      toast.error('Албан тушаал оруулна уу.');
    } else if (values?.phone == '') {
      toast.error('Утасны дугаараа оруулна уу.');
    } else if (values?.email == '') {
      toast.error('И-Мэйл хаягаа оруулна уу.');
    } else if (isInvalid) {
      toast.error('И-Мэйл хаяг буруу байна.');
    } else if (values?.address == '') {
      toast.error('Хаяг оруулна уу.');
    } else {
      setIsSaving(true);
      try {
        AuthService.updateById(values.id, {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          jobPosition: values.jobPosition,
          address: values.address,
          organizationName: values.organizationName,
          userType: values.userType,
          isConfirm: values.isConfirm,
          isCitizen: values.isCitizen,
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
  if (values == null) return <ProfileFields />;
  else
    return (
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
        <TextField label="Овог" value={values.lastName} disabled />
        <TextField label="Нэр" value={values.firstName} disabled />
        <TextField label="Утасны дугаар" value={values.phone} disabled />
        <TextField label="И-мэйл хаяг" value={values.email} disabled />
        <TextField
          label="Албан тушаал"
          placeholder="--"
          value={values.jobPosition}
          handleChange={handleChange('jobPosition')}
        />

        {!values?.isCitizen && (
          <TextField
            label="Байгууллагын нэр"
            value={values.organizationName}
            handleChange={handleChange('organizationName')}
          />
        )}
        <TextField
          label="Байгууллагын регистр"
          value={values.organizationRegno}
          handleChange={handleChange('organizationRegno')}
        />
        <TextAreaField label="Хаяг" value={values.address} onChange={handleChange('address')} />
        <div className="flex flex-row justify-end">
          <MyButton onClick={saveProfile} loading={isSaving}>
            Хадгалах
          </MyButton>
        </div>
      </motion.div>
    );
};

export default withAuth(Profile);
