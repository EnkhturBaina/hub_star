'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserTab } from '@typeDefs/reference';
import UserTabData from '@datas/UserTabData';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from '@utils/classNames';
import { useTranslations } from 'next-intl';

const UserTypeMenu: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="no-scrollbar mt-2 flex overflow-y-scroll md:justify-center">
      <nav>
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
          {UserTabData.map((item: UserTab, index: number) => (
            <Link
              key={index}
              href={{
                pathname: '/adv',
                query: { userType: item.type },
              }}
              className={classNames(
                'relative text-base xl:text-base flex h-full w-fit cursor-pointer mr-2 items-center gap-1 border-b justify-center border-stroke px-6 py-2 last:border-0 flex-row md:flex-col md:w-auto md:border-0 xl:px-13.5 xl:pt-5',
                router.query.userType === item.type
                  ? 'active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-mainColor md:!text-lg !text-base text-[#f3a23f] !font-semibold'
                  : 'text-black font-normal transition-all duration-300 ease-in-out hover:text-[#f3a23f] md:hover:text-lg hover:text-base group hover:!font-semibold'
              )}
            >
              <Image
                src={item.image}
                alt="logo"
                width={router.query.userType === item.type ? 50 : 40}
                height={router.query.userType === item.type ? 50 : 40}
                className={classNames(
                  'block h-7 w-7 md:h-12 md:w-12 transition-all duration-300 ease-in-out md:group-hover:min-h-14 group-hover:min-h-8 md:group-hover:min-w-14 group-hover:min-w-fit',
                  router.query.userType == item.type
                    ? 'md:min-h-14 min-h-8 md:min-w-14 min-w-8'
                    : ''
                )}
                sizes="100vw"
              />
              {t(item.title)}
            </Link>
          ))}
        </motion.div>
      </nav>
    </div>
  );
};

export default UserTypeMenu;
