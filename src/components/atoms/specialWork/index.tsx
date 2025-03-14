import React from 'react';
import { SpecialService } from '@typeDefs/reference';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import classNames from '@utils/classNames';
import styles from './specialWork.module.css';

interface IProps {
  specialService: SpecialService;
}
const SpecialWork: React.FC<IProps> = ({ specialService }) => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <Link
      href={{
        pathname: '/special',
        query: { specialService: specialService.type },
      }}
      className={classNames(
        'flex h-full flex-row md:flex-col md:gap-2 items-center justify-around p-2 min-w-40 hover:bg-primary rounded-lg border border-white group shadow-md',
        styles.specialService,
        router.query.specialService == specialService.type ? 'bg-primary' : 'bg-white'
      )}
    >
      <div
        className={classNames(
          'h-5 w-5 md:h-16 md:w-16 rounded-[4px] content-center flex',
          router.query.specialService === specialService.type ? 'active-icon' : ''
        )}
      >
        {specialService.icon}
      </div>
      <span
        className={classNames(
          'md:ml-0 ml-1 flex items-center justify-center md:text-center text-start align-middle text-xs font-bold leading-none text-[#212529] md:max-w-40 text-wrap group-hover:text-white',
          router.query.specialService == specialService.type && 'text-white'
        )}
      >
        {t(specialService.title)}
      </span>
    </Link>
  );
};

export default SpecialWork;
