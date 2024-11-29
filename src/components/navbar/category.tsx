import Motion from '@components/common/motion';
import { CategoryNavigation } from '@datas/navigation';
import { classNames } from '@utils/helpers';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CategoryNav: React.FC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  useEffect(() => {
    console.log('query ==========>', query);
  }, [query]);
  return (
    <nav className="flex justify-around bg-white shadow-md py-4">
      {CategoryNavigation.map(item => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            'flex flex-col items-center text-gray-600 hover:text-mainColor',
            query.userType == item.name.toUpperCase() ? 'active text-mainColor' : ''
          )}
        >
          <div className="text-2xl">
            {item.imagePath && (
              <Image
                src={item.imagePath}
                alt="logo"
                width={40}
                height={40}
                className="block h-6 w-6 md:h-12 md:w-12"
                sizes="100vw"
              />
            )}
          </div>
          <span className={classNames('text-sm')}>{t(item.name)}</span>
        </Link>
      ))}
    </nav>
  );
};
export default CategoryNav;
