'use client';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import UserTabData from '@/app/data/UserTabData';
import Rating from '@/components/Common/Rating';
import { Advertisement } from '@/types/advertisement';
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
type Props = {
  servicesData: Advertisement[];
  isStars: boolean;
  editAdv?: (advertisement: Advertisement) => void;
  removeAdv?: (id: number) => void;
  // onIgeree?: () => void;
};
const GridServices: React.FC<Props> = ({ servicesData, isStars, editAdv, removeAdv }) => {
  function takeTypeName({
    userType,
    specialService,
  }: {
    userType: string;
    specialService: string;
  }) {
    if (userType !== null) {
      UserTabData?.map(el => {
        if (el.type === userType) {
          return (
            <span className="line-clamp-3" key={el.type}>
              {el.title}
            </span>
          );
        }
      });
    } else if (specialService !== null) {
      SpecialServiceData?.map(el => {
        if (el.type === specialService) {
          return (
            <span className="line-clamp-3" key={el.type}>
              {el.title}
            </span>
          );
        }
      });
    } else {
      return false;
    }
  }
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
      className="animate_top grid gap-6 bg-white sm:grid-cols-2 grid-cols- lg:grid-cols-3 p-3"
    >
      {servicesData.map((adv: Advertisement, index: number) => (
        <div className="rounded-lg bg-white shadow-solid-8" key={'grid' + index}>
          <Link href={'/adv/item?id=' + adv.id} className="relative block aspect-[368/239]">
            <Image
              src={process.env.NEXT_PUBLIC_MEDIA_URL + adv.images[0]?.id}
              alt={adv.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isStars && (
              <div className="absolute md:right-4 right-2 md:bottom-4 bottom-2 flex flex-row items-center justify-center">
                <Rating point={adv.rating} />
              </div>
            )}
          </Link>
          <div className="flex flex-col px-3 pb-2 gap-2">
            <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-base font-bold  duration-300 hover:text-primary ">
              {adv.title?.length > 60 ? `${adv.title.slice(0, 60)}...` : adv.title}
            </h3>
            {takeTypeName({ userType: adv.userType, specialService: adv.specialService })}
            <div className="flex flex-row items-center justify-end gap-2">
              {editAdv && (
                <Tooltip content="Засах">
                  <Button isIconOnly color="primary" onClick={() => editAdv(adv)}>
                    <FaEdit />
                  </Button>
                </Tooltip>
              )}

              {removeAdv && (
                <Popover placement="top" color="danger">
                  <PopoverTrigger>
                    <Button isIconOnly color="danger">
                      <FaTrash />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-wrap font-bold ">
                        Үйлчилгээг устгахдаа итгэлтэй байна уу?
                      </div>
                      <Button variant="solid" color="danger" onClick={() => removeAdv(adv?.id)}>
                        Тийм
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              {/* {onIgeree && (
                <Button color="primary" onClick={() => onIgeree()}>
                  Гэрээ байгуулах
                </Button>
              )} */}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default GridServices;
