'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@lib/features/adv-param';
import { useTypedSelector } from '@lib/reducer';
import SpecialServiceData from '@datas/SpecialServiceData';
import { IAdParam } from '@/interfaces/request.interface';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SpecialTypeMenu: React.FC = () => {
  const dispatch = useDispatch();
  const advParam = useTypedSelector(state => state.advParam);
  const { t } = useTranslation();
  const router = useRouter();

  const onAdvParam = (param: IAdParam) => {
    if (param.specialService) {
      router.push('/special');
    }
    if (param.userType) {
      router.push('/adv');
    }
    dispatch(setAdvParam(param));
  };
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
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top flex no-scrollbar flex-row md:justify-center justify-start overflow-x-scroll whitespace-nowrap md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-12.5 gap-2"
    >
      {SpecialServiceData.map((item, index: number) => (
        <div
          key={index}
          onClick={() => {
            onAdvParam({
              order: 'DESC',
              page: 1,
              limit: 10,
              specialService: item.type,
            });
          }}
          className={`flex h-full flex-row md:flex-col md:gap-2 items-center justify-around p-2 min-w-40 special-service hover:bg-primary rounded-lg border border-white group shadow-md ${advParam.specialService == item.type ? 'bg-primary' : 'bg-white'}`}
        >
          <div
            className={`h-5 w-5 md:h-16 md:w-16 rounded-[4px] content-center flex ${advParam.specialService === item.type ? 'active-icon' : ''}`}
          >
            {item.icon}
          </div>
          <span
            className={`md:ml-0 ml-1 flex items-center justify-center md:text-center text-start align-middle text-xs font-bold leading-none text-[#212529] md:max-w-40 text-wrap group-hover:text-white ${advParam.specialService == item.type && 'text-white'}`}
          >
            {t(item.title)}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default SpecialTypeMenu;
