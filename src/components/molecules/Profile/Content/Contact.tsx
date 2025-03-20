import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileFields from '@components/molecules/Skeleton/ProfileFields';
import Users from '@typeDefs/user';
import Rating from '@components/atoms/Rating';
import { toInteger } from 'lodash';
import AdvertisementService from '@services/advertisement';
import TextField from '@components/atoms/textField';
import TextAreaField from '@components/atoms/textAreaField';
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
          <TextField label="Утасны дугаар" value={user?.phone} disabled />
          <TextField label="Веб хуудас" value={user?.webUrl} disabled />
          <TextField label="И-мэйл хаяг" value={user?.email} disabled />
          <TextAreaField disabled label="Хаяг" value={user?.address} onChange={() => {}} />
        </motion.div>
      )}
    </>
  );
};
export default Contact;
