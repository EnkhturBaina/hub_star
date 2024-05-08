'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Advertisement } from '@/types/advertisement';
import Rating from '@/components/Common/Rating';
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
  servicesData: Advertisement[];
  isStars: boolean;
  editAdv: (advertisement: Advertisement) => void;
  removeAdv: (id: number) => void;
};
const ListServices: React.FC<Props> = ({ servicesData, isStars, editAdv, removeAdv }) => {
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
      className="animate_top grid grid-cols-1 gap-3 bg-white"
    >
      {servicesData.map((adv: Advertisement, index: number) => {
        return (
          <div
            className="flex h-25 w-full flex-row justify-between rounded-lg bg-white shadow-solid-8"
            key={'list' + index}
          >
            <div className="flex flex-row">
              <Link href={`/adv/`} className="relative block aspect-[368/239]">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + adv.images[0]?.id}
                  alt={adv.title}
                  width={100}
                  height={80}
                  className="h-full w-35"
                />
              </Link>
              <div className="flex max-w-2xl flex-col px-3 pb-2">
                <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-lg font-bold  duration-300 hover:text-primary ">
                  <Link href={`/adv/${adv?.id}`} className="!text-black">
                    {`${adv?.title.slice(0, 100)}...`}
                  </Link>
                </h3>
                <span className="line-clamp-3">{adv?.desciption}</span>
              </div>
            </div>
            <div className="flex w-50 flex-row items-center justify-center gap-4">
              {isStars && <Rating point={adv?.rating} />}
              <Tooltip content="Засах">
                <Button isIconOnly color="primary" onClick={() => editAdv(adv)}>
                  <FaEdit />
                </Button>
              </Tooltip>

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
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ListServices;
