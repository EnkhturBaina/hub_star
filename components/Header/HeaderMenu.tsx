'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppContext } from '@/app/app-context';
import { UserTab, UserType } from '@/types/reference';
import UserTabData from '@/app/data/UserTabData';
import { usePathname } from 'next/navigation';

const HeaderMenu = () => {
  const { adParam, setAdParam } = useAppContext();
  const pathUrl = usePathname();

  const onClickUserType = (userType: UserType) => {
    setAdParam({
      order: 'DESC',
      process: 'CREATED',
      page: 1,
      limit: 10,
      userType,
      mainDirectionId: adParam.mainDirectionId,
      directionIds: adParam.directionIds,
      subDirectionIds: adParam.subDirectionIds,
    });
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
      {/* <div className="w-full overflow-hidden">
          <Button
            isDisabled
            radius="full"
            className="h-8 w-50 bg-gradient-to-r from-blue-500 to-blue-900 font-bold uppercase leading-none tracking-wide text-white !opacity-100"
          >
            Хэрэглэгчид
          </Button>
        </div> */}
      {pathUrl === '/special'
        ? null
        : UserTabData.map((item: UserTab, index: number) => {
            return (
              <div
                key={index}
                onClick={() => onClickUserType(item.type)}
                className={`relative flex h-full w-fit cursor-pointer mr-2 items-center border-b justify-center border-stroke px-6 py-2 last:border-0 flex-row md:flex-col md:w-auto md:border-0 xl:px-13.5 xl:pt-5 ${
                  adParam.userType === item.type
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
                <div className="text-xs font-semibold text-black xl:text-sm">{item.title}</div>
              </div>
            );
          })}
    </motion.div>
  );
};

export default HeaderMenu;
