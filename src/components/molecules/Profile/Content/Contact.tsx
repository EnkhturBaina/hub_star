import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import Users from '@typeDefs/user';
import { Input, Textarea } from '@heroui/react';
import Rating from '@components/atoms/Rating';
import { toInteger } from 'lodash';
import AdvertisementService from '@services/advertisement';
type Props = {
  user: Users;
};
const Contact: React.FC<Props> = ({ user }) => {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      await AdvertisementService.get({
        page: 1,
        limit: 300,
        order: 'DESC',
        process: 'DOING',
        userBy: user?.id,
      }).then(res => {
        if (res.success) {
          calculateAverage(res.response.data.map(item => item.rating));
        }
      });
    };
    getData();
  }, [user?.id]);

  const calculateAverage = (arr: number[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    setRating(toInteger(sum / arr.length));
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
          <div className="items-center">
            <Rating point={rating} />
          </div>
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
            key="webUrl"
            type="email"
            label="Веб хуудас"
            labelPlacement="outside"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.webUrl}
          />
          <Input
            disabled
            key="email"
            type="email"
            label="И-мэйл хаяг"
            labelPlacement="outside"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.email}
          />
          <Textarea
            disabled
            variant="bordered"
            label="Хаяг"
            labelPlacement="outside"
            radius="sm"
            placeholder="Хаяг"
            classNames={{
              base: 'w-full',
              label: 'font-bold',
              inputWrapper: ['custom-input-wrapper', 'bg-white'],
            }}
            value={user?.address}
          />
        </motion.div>
      )}
    </>
  );
};
export default Contact;
