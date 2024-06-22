'use client';
import { MainDirection } from '@/types/reference';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  mainDirection: MainDirection;
};
const CatItem: React.FC<Props> = ({ mainDirection }) => {
  const { coverId, name } = mainDirection;
  return (
    <>
      <div className="cursor-pointer bg-gradient-to-b shadow-solid-8 hover:bg-gradient-to-t hover:from-mainColor hover:to-transparent !w-64 h-36 !flex-none">
        <Link
          className="relative block h-full rounded-lg hover:opacity-50"
          href={{ pathname: '/advice', query: { mainDirectionId: mainDirection.id } }}
        >
          <Image
            alt={name ?? 'alt'}
            src={process.env.NEXT_PUBLIC_MEDIA_URL + coverId}
            className="rounded-lg object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw"
          />
          <span className="absolute left-1/2 top-1/2 z-99 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl uppercase text-white">
            {name}
          </span>
        </Link>
      </div>
    </>
  );
};

export default CatItem;
