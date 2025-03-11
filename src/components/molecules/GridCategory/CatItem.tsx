'use client';
import React from 'react';
import { MainDirection } from '@typeDefs/reference';
import Image from 'next/image';
import Link from 'next/link';
import classNames from '@utils/classNames';
interface IProps {
  mainDirection: MainDirection;
  queryId?: string | number | string[];
}
const CatItem: React.FC<IProps> = ({ mainDirection = null, queryId = null }) => {
  const { coverId, name, id } = mainDirection;
  return (
    <>
      <div
        className={classNames(
          'cursor-pointer bg-gradient-to-b shadow-solid-8 w-full lg:h-36 h-25 !flex-none hover:bg-gradient-to-t hover:from-mainColor hover:to-transparent',
          queryId == id ? 'bg-gradient-to-t from-mainColor to-transparent' : ''
        )}
      >
        <Link
          className={classNames(
            'relative block h-full rounded-lg hover:opacity-50',
            queryId == id ? 'opacity-60' : ''
          )}
          href={{ pathname: '/advice', query: { mainDirectionId: mainDirection.id } }}
        >
          <Image
            alt={name ?? 'alt'}
            src={process.env.NEXT_PUBLIC_MEDIA_URL + coverId}
            className="rounded-lg object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw"
          />
          <span className="absolute left-1/2 top-1/2 z-99 w-full -translate-x-1/2 -translate-y-1/2 text-center md:text-lg text-base uppercase text-white">
            {name}
          </span>
        </Link>
      </div>
    </>
  );
};

export default CatItem;
