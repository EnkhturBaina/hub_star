import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AccountFields from '@components/molecules/Skeleton/AccountFields';
import { Users } from '@typeDefs/user';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';
import AuthService from '@services/auth';
import TextField from '@components/atoms/textField';
import MyButton from '@components/atoms/button';

const Account: React.FC = () => {
  const { user } = useAuthState();
  const [values, setValues] = useState<Users>(user);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const handleChange = (prop: keyof Users) => (value: any) => {
    setValues({ ...values, [prop]: value });
  };

  const handleSubmit = async () => {
    if (!values?.bank) {
      toast.error('Банкны нэр оруулна уу.');
    } else if (!values?.bankAccountNo) {
      toast.error('Дансны дугаар оруулна уу.');
    } else if (!values?.bankAccount) {
      toast.error('Эзэмшигчийн нэр оруулна уу.');
    } else {
      try {
        setButtonLoader(true);
        const result = await AuthService.updateById(user.id, values);
        if (result.success) {
          setButtonLoader(false);
          toast.success('Амжилттай хадгаллаа');
        }
      } catch (error) {
        console.log('noop bank =>', error);
      }
    }
  };
  if (!values) return <AccountFields />;
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
        <TextField
          label="Банкны нэр"
          placeholder="--"
          value={values.bank}
          handleChange={handleChange('bank')}
        />
        <TextField
          label="Дансны дугаар"
          placeholder="--"
          value={values.bankAccountNo}
          handleChange={handleChange('bankAccountNo')}
        />
        <div className="flex flex-row justify-end">
          <MyButton onClick={handleSubmit} loading={buttonLoader}>
            Хадгалах
          </MyButton>
        </div>
      </motion.div>
    );
};
export default withAuth(Account);
