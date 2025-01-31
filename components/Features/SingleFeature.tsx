import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SpecialService, SpecialServiceType } from '@/types/reference';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
interface IProps {
  specialService: SpecialService;
}
const SingleFeature: React.FC<IProps> = ({ specialService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const handleSpecialService = (type: SpecialServiceType) => {
    dispatch(
      setAdvParam({
        order: 'DESC',
        page: 1,
        limit: 10,
        specialService: type,
      })
    );
    router.push('/special');
  };
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -10,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="animate_top flex md:h-35 h-30 cursor-pointer flex-col items-center justify-center rounded-lg border border-white bg-white shadow-md transition-all hover:bg-primary hover:shadow-solid-4 group"
    >
      <div
        onClick={() => handleSpecialService(specialService.type)}
        className="flex h-full flex-col items-center md:justify-between justify-center p-2 w-full special-service "
      >
        <div className="flex h-[55px] md:my-auto my-0 w-[55px] rounded-[4px] justify-center">
          {specialService.icon}
        </div>
        <span className=" flex h-1/3 items-center justify-center text-center align-middle text-sm font-bold leading-none hover:text-white text-[#212529] group-hover:text-white">
          {t(specialService.title)}
        </span>
      </div>
    </motion.div>
  );
};

export default SingleFeature;
