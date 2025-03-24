import React from 'react';
import { motion } from 'framer-motion';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import { Users } from '@typeDefs/user';
import TextField from '@components/atoms/textField';
import TextAreaField from '@components/atoms/textAreaField';
import { useTranslations } from 'next-intl';

interface IProps {
  user: Users;
  handleUser?: (values: Users) => void;
  edit?: boolean;
}
const Profile: React.FC<IProps> = ({ user = null, handleUser, edit = false }) => {
  const t = useTranslations('auth');
  const handleChange = (prop: keyof Users) => (value: any) => {
    handleUser({ ...user, [prop]: value });
  };
  return (
    <>
      {user == null ? (
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
          <TextField label={t('lastName')} value={user.lastName} disabled />
          <TextField label={t('firstName')} value={user.firstName} disabled />
          <TextField label={t('phone')} value={user.phone} disabled />
          <TextField label={t('email')} value={user.email} disabled />
          <TextField
            label="Байгууллагын нэр"
            value={user.organizationName}
            disabled={true}
            handleChange={handleChange('organizationName')}
          />
          <TextField
            label="Байгууллагын регистр"
            value={user.organizationRegno}
            disabled={true}
            handleChange={handleChange('organizationRegno')}
          />
          <TextField
            label="Албан тушаал"
            value={user.jobPosition}
            disabled={!edit}
            handleChange={handleChange('jobPosition')}
          />
          <TextAreaField
            label="Хаяг"
            value={user.address}
            disabled={!edit}
            onChange={handleChange('address')}
          />
        </motion.div>
      )}
    </>
  );
};

export default Profile;
