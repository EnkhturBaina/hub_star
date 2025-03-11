'use client';
import React from 'react';
import { motion } from 'framer-motion';
import SpecialServiceData from '@datas/SpecialServiceData';
import Link from 'next/link';
import classNames from '@utils/classNames';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

const SpecialTypeMenu: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
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
        <Link
          key={index}
          href={{
            pathname: '/special',
            query: { specialService: item.type },
          }}
          className={classNames(
            'flex h-full flex-row md:flex-col md:gap-2 items-center justify-around p-2 min-w-40 special-service hover:bg-primary rounded-lg border border-white group shadow-md',
            router.query.specialService == item.type ? 'bg-primary' : 'bg-white'
          )}
        >
          <div
            className={classNames(
              'h-5 w-5 md:h-16 md:w-16 rounded-[4px] content-center flex',
              router.query.specialService === item.type ? 'active-icon' : ''
            )}
          >
            {item.icon}
          </div>
          <span
            className={classNames(
              'md:ml-0 ml-1 flex items-center justify-center md:text-center text-start align-middle text-xs font-bold leading-none text-[#212529] md:max-w-40 text-wrap group-hover:text-white',
              router.query.specialService == item.type && 'text-white'
            )}
          >
            {t(item.title)}
          </span>
        </Link>
      ))}
    </motion.div>
  );
};

export default SpecialTypeMenu;
