'use client';
import { Advertisement } from '@/types/advertisement';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';

const GridServices = ({
  servicesData,
  showAddBtn,
  isStars,
  isAddService,
  setIsAddService,
}: {
  servicesData: Advertisement[];
  showAddBtn: boolean;
  isStars: boolean;
  isAddService?: boolean;
  setIsAddService?: any;
}) => {
  console.log('servicesData', servicesData);

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
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top grid grid-cols-1 gap-6 bg-mainProfileCardBg md:grid-cols-2 lg:grid-cols-3"
    >
      {servicesData.map((adv: Advertisement, index: number) => (
        <div className="rounded-lg bg-white shadow-solid-8" key={'grid' + index}>
          <Link href={'/adv/' + adv.id} className="relative block aspect-[368/239]">
            {/* TODO ene deer yaahii ETR */}
            <Image
              src={process.env.NEXT_PUBLIC_MEDIA_URL + adv.images[0].id}
              // src={''}
              alt={adv.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isStars && (
              <div className="absolute right-4 bottom-4 flex flex-row items-center justify-center">
                <span className="font-bold text-white">Үнэлгээ:</span>
                <div className="flex flex-row items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-2xl text-mainColor ${index < adv.rating ? 'text-mainColor' : 'text-white'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Link>

          <div className="flex flex-col px-6 pb-2">
            <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold  duration-300 hover:text-primary ">
              {`${adv.title.slice(0, 25)}...`}
            </h3>
            <span className="line-clamp-3">{adv.desciption}</span>
            <div className="flex flex-row items-center"></div>
          </div>
        </div>
      ))}
      {showAddBtn ? (
        <div
          className="flex h-67 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
          onClick={() => setIsAddService(true)}
        >
          <IoAddCircle className="text-[150px] text-mainBgGray" />
        </div>
      ) : null}
    </motion.div>
  );
};

export default GridServices;
