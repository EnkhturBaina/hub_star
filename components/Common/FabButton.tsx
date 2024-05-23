import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { RiHome5Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { useAppContext } from '@/app/app-context';
import { useDispatch } from 'react-redux';
import { emptyAdvParam } from '@/app/lib/features/adv-param';

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

const FabButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('common');
  const [isFabEnabled, setIsFabEnabled] = useState(false);

  const toggleFAB = useCallback(() => {
    setIsFabEnabled(prevState => !prevState);
  }, []);

  const langs = [
    { id: 'en', name: 'English', img: '/en.png' },
    { id: 'mn', name: 'Монгол хэл', img: '/mn.png' },
    { id: 'zh', name: '中國人', img: '/zh.png' },
  ];

  const handleChangeLanguage = (languageCode: string) => {
    // Change language using i18next
    i18n.changeLanguage(languageCode);
    // Redirect to the same page with the new language
    router.push(router.pathname, router.asPath, { locale: languageCode });
  };
  const handleHome = () => {
    dispatch(emptyAdvParam());
    router.push('/');
  };

  return (
    // FAB button container
    <div className="fixed bottom-25 right-5 flex flex-col items-center z-99999">
      <div
        className={`w-fit rounded-full p-3 bg-white shadow-lg cursor-pointer mb-2 ${isFabEnabled ? 'invisible' : 'visible'}`}
        onClick={handleHome}
      >
        <RiHome5Fill className="text-4xl" />
      </div>

      <div className="bg-white shadow-lg h-16 w-16 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all ease-in">
        <div onClick={toggleFAB} className={`rounded-full transition-transform ease-in`}>
          {langs
            ?.filter(el => el.id === router.locale)
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
                    <motion.li
                      key={index}
                      className="h-14 w-14 rounded-full"
                      onClick={() => {
                        handleChangeLanguage(el.id);
                        setIsFabEnabled(false);
                      }}
                    >
                      <Image
                        className="h-14 w-14 transition-all duration-300 hover:opacity-100 dark:hidden"
                        src={el.img}
                        alt={el.name}
                        width="0"
                        height="0"
                        sizes="100vw"
                      />
                    </motion.li>
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

export default FabButton;
