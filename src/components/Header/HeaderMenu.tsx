'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserTab } from '@/types/reference';
import UserTabData from '@/data/UserTabData';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/lib/features/adv-param';
import { useTypedSelector } from '@/lib/reducer';
import SpecialServiceData from '@/data/SpecialServiceData';
import { IAdParam } from '@/interfaces/request.interface';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const advParam = useTypedSelector(state => state.advParam);
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

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
      className="animate_top flex no-scrollbar flex-row justify-center overflow-x-auto whitespace-nowrap md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-12.5 gap-2"
    >
      {advParam.userType || pathname !== '/special'
        ? UserTabData.map((item: UserTab, index: number) => {
            return (
              <div
                key={index}
                onClick={() =>
                  onAdvParam({ page: 1, limit: 10, order: 'DESC', userType: item.type })
                }
                className={`relative flex h-full w-fit cursor-pointer mr-2 items-center border-b justify-center border-stroke px-6 py-2 last:border-0 flex-row md:flex-col md:w-auto md:border-0 xl:px-13.5 xl:pt-5 ${
                  advParam.userType === item.type
                    ? 'active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-mainColor'
                    : ''
                }`}
              >
                <Image
                  src={item.image}
                  alt="logo"
                  width={40}
                  height={40}
                  className="block h-6 w-6 md:h-12 md:w-12"
                  sizes="100vw"
                />
                <div className="text-xs font-semibold text-black xl:text-sm">{t(item.title)}</div>
              </div>
            );
          })
        : SpecialServiceData.map((item, index: number) => {
            return (
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
                className={`flex h-full flex-row md:flex-col items-center justify-around p-2 md:min-w-40 special-service hover:bg-primary rounded-lg border border-white group shadow-md ${advParam.specialService == item.type ? 'bg-primary' : 'bg-white'}`}
              >
                <div
                  className={`h-5 w-5 md:h-16 md:w-16 rounded-[4px] content-center flex ${advParam.specialService === item.type ? 'active-icon' : ''}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`flex items-center justify-center text-center align-middle text-xs font-bold leading-none text-[#212529] ml-2 md:ml-0 md:max-w-40 md:text-wrap group-hover:text-white ${advParam.specialService == item.type && 'text-white'}`}
                >
                  {t(item.title)}
                </span>
              </div>
            );
          })}
    </motion.div>
  );
};

export default HeaderMenu;
