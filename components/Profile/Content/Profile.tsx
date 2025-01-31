'use client';
import { motion } from 'framer-motion';
import { Input, Textarea } from '@heroui/react';
import ProfileFields from '@/components/Skeleton/ProfileFields';
import { Users } from '@/types/user';

type Props = {
  user: Users;
};
const Profile: React.FC<Props> = ({ user }) => {
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
          <Input
            disabled
            key="lastName"
            type="text"
            label="Овог"
            labelPlacement="outside"
            placeholder="Овог"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.lastName}
          />
          <Input
            disabled
            key="firstName"
            type="text"
            label="Нэр"
            labelPlacement="outside"
            placeholder="Нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.firstName}
          />
          <Input
            disabled
            key="jobPosition"
            type="text"
            label="Албан тушаал"
            labelPlacement="outside"
            placeholder="Албан тушаал"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.jobPosition}
          />
          <Input
            disabled
            key="phone"
            type="text"
            label="Утасны дугаар"
            labelPlacement="outside"
            placeholder="Утасны дугаар"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.phone}
          />
          <Input
            disabled
            key="email"
            type="email"
            label="И-мэйл хаяг"
            labelPlacement="outside"
            placeholder="И-мэйл хаяг"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.email}
          />
          <Input
            disabled
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
            value={user?.organizationName ?? ''}
          />
        </motion.div>
      )}
    </>
  );
};

export default Profile;
