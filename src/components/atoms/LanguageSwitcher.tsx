import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { RiHome5Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Link from 'next/link';

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    translateY: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const LanguageSwitcher = () => {
  const [isFabEnabled, setIsFabEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFabEnabled(prev => !prev);
  }, [router.locale]);
  const toggleFAB = useCallback(() => {
    setIsFabEnabled(prevState => !prevState);
  }, []);

  const langs = [
    { id: 'en', name: 'English', img: '/en.png' },
    { id: 'mn', name: 'Монгол хэл', img: '/mn.png' },
    { id: 'zh', name: '中國人', img: '/zh.png' },
  ];

  // const changeLanguage = (locale: string) => {
  //   // Change language using i18next
  //   router.locale = locale;
  //   router.reload();
  // };
  const handleHome = () => {
    router.push('/');
  };

  return (
    // FAB button container
    <div className="fixed md:bottom-25 bottom-6 md:right-5 right-0 flex flex-col items-center z-99999">
      <div
        className={`w-fit rounded-full p-1.5 bg-white shadow-lg cursor-pointer mb-2 ${isFabEnabled ? 'invisible' : 'visible'}`}
        onClick={handleHome}
      >
        <RiHome5Fill className="text-4xl" />
      </div>

      <div className="bg-white shadow-lg h-14 w-14 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all ease-in">
        <div onClick={toggleFAB} className={`rounded-full transition-transform ease-in`}>
          {langs
            ?.filter(el => el.id == router.locale)
            ?.map((el, index) => {
              return (
                <Image
                  key={index}
                  className="h-10 w-10 transition-all duration-300 hover:opacity-100 dark:hidden"
                  src={el.img}
                  alt={el.name}
                  loading="eager"
                  priority={true}
                  width="0"
                  height="0"
                  sizes="100vw"
                />
              );
            })}
        </div>

        {/* FAB button list */}
        <AnimatePresence>
          {isFabEnabled && (
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute bottom-20 flex justify-between flex-col items-center gap-4"
            >
              <div
                className={`w-fit rounded-full p-3 bg-white shadow-lg cursor-pointer ${!isFabEnabled ? 'invisible' : 'visible'}`}
              >
                <RiHome5Fill className="text-4xl" />
              </div>
              <div className="flex flex-col items-center gap-4 bg-white rounded-full shadow-lg p-2">
                {langs.map((el, index) => {
                  return (
                    <Link
                      key={index}
                      className="h-14 w-14 rounded-full"
                      href={router.asPath}
                      locale={el.id}
                    >
                      <Image
                        className="h-14 w-14 sm:h-10 sm:w-10 transition-all duration-300 hover:opacity-100 dark:hidden"
                        src={el.img}
                        alt={el.name}
                        width="0"
                        height="0"
                        sizes="100vw"
                      />
                    </Link>
                  );
                })}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
