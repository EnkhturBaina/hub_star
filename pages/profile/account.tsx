import { motion } from 'framer-motion';
import { Button, Input } from '@heroui/react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AccountFields from '@/components/Skeleton/AccountFields';
import { Users } from '@/types/user';
import { useAppContext } from '@/app/app-context';
import { AuthService } from '@/service/authentication/authentication.service';
import ProfileLayout from '@/layouts/profile.layout';
import withAuth from '@/components/Common/withAuth';

const Account: React.FC = () => {
  const { user } = useAppContext();
  const [values, setValues] = useState<Users>(user);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange =
    (prop: keyof Users) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = () => {
    if (!values?.bank) {
      toast.error('Банкны нэр оруулна уу.');
    } else if (!values?.bankAccountNo) {
      toast.error('Дансны дугаар оруулна уу.');
    } else if (!values?.bankAccount) {
      toast.error('Эзэмшигчийн нэр оруулна уу.');
    } else {
      setIsSaving(true);
      AuthService.updateById(user.id, values)
        .then(response => {
          if (response.success) {
            setIsSaving(false);
            toast.success('Амжилттай хадгаллаа');
          }
        })
        .catch(error => {
          toast.error('Error fetching :' + error);
        });
    }
  };
  return (
    <ProfileLayout>
      {!values ? (
        <AccountFields />
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
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              duration: 5000,
            }}
          />
          <Input
            key="bank"
            type="text"
            label="Банкны нэр"
            labelPlacement="outside"
            placeholder="Банкны нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={values?.bank ?? ''}
            onChange={handleChange('bank')}
          />
          <Input
            key="bankAccountNo"
            type="number"
            label="Дансны дугаар"
            labelPlacement="outside"
            placeholder="Дансны дугаар"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={values?.bankAccountNo ?? ''}
            onChange={handleChange('bankAccountNo')}
          />
          <Input
            key="bankAccount"
            type="text"
            label="Эзэмшигчийн нэр"
            labelPlacement="outside"
            placeholder="Эзэмшигчийн нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={values?.bankAccount ?? ''}
            onChange={handleChange('bankAccount')}
          />

          <div className="flex flex-row justify-end">
            <Button
              className="mr-4 bg-mainColor !text-white"
              radius="sm"
              size="md"
              onClick={handleSubmit}
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
export default withAuth(Account);
