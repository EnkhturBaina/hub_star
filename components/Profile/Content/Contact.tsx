import { motion } from 'framer-motion';
import ProfileFields from '@/components/Skeleton/ProfileFields';
import Users from '@/types/user';
import { Input, Textarea } from '@nextui-org/react';
import Rating from '@/components/Common/Rating';
import { useCallback, useEffect, useState } from 'react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { toInteger } from 'lodash';
type Props = {
  user: Users;
};
const Contact: React.FC<Props> = ({ user }) => {
  const [rating, setRating] = useState<number>(0);

  const getData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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
