'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserTab } from '@/types/reference';
import UserTabData from '@/app/data/UserTabData';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import { useTypedSelector } from '@/app/lib/reducer';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import { IAdParam } from '@/interfaces/request.interface';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const UserTypeMenu: React.FC = () => {
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
            <div
              key={index}
              onClick={() => onAdvParam({ page: 1, limit: 10, order: 'DESC', userType: item.type })}
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
          ))}
        </motion.div>
      </nav>
    </div>
  );
};

export default UserTypeMenu;
