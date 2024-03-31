'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppContext } from '@/utils/context/app-context';
import { Category } from '@/types/reference';
import { useTypedSelector } from '@/utils/redux/reducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import { setAdParam } from '@/utils/redux/slice/ad-param';

const HeaderMenu = () => {
  const { categories } = useAppContext();
  const { adParam } = useTypedSelector(state => state);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-row justify-center xl:w-full">
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
        className="animate_top"
      >
        <div className="no-scrollbar hidden flex-row justify-center overflow-x-auto whitespace-nowrap md:flex md:flex-row  md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-12.5">
          {categories
            .filter(item => !item.isSpecial)
            .map((item: Category, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    dispatch(
                      setAdParam({
                        order: 'DESC',
                        page: 1,
                        limit: 10,
                        categoryId: item.id,
                        mainDirectionId: adParam.mainDirectionId,
                        directionIds: adParam.directionIds,
                        subDirectionIds: adParam.subDirectionIds,
                      })
                    )
                  }
                  className={`relative flex h-full w-full cursor-pointer flex-col items-center border-b border-stroke px-6 py-2 last:border-0  md:w-auto md:border-0 xl:px-13.5 xl:pt-5 ${
                    adParam.categoryId === item.id
                      ? 'active before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:rounded-tl-[4px] before:rounded-tr-[4px] before:bg-mainColor'
                      : ''
                  }`}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_IMG_URL + item.logo.path}
                    alt="logo"
                    width={40}
                    height={40}
                    className="block"
                    sizes="100vw"
                  />
                  <div className="w-auto">
                    <button className="text-xs font-semibold text-black xl:text-sm">
                      {item.name}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
};

export default HeaderMenu;
