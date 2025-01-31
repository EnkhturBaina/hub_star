'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Advertisement } from '@/types/advertisement';
import Rating from '@/components/Common/Rating';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Menu, MenuButton, MenuItem, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

type Props = {
  servicesData: Advertisement[];
  isStars: boolean;
  editAdv?: (advertisement: Advertisement) => void;
  removeAdv?: (id: number) => void;
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
      className="animate_top grid grid-cols-1 gap-6 bg-white p-2"
    >
      {servicesData.map((adv: Advertisement, index: number) => {
        return (
          <div
            className="flex min-h-32 max-h-32 overflow-visible h-fit w-full flex-row justify-between rounded-lg bg-white shadow-solid-8 p-2"
            key={'list' + index}
          >
            <div className="flex flex-row">
              <Link href={`/adv/`} className="w-fit relative block">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + adv.images[0]?.id}
                  alt={adv.title}
                  width={100}
                  height={80}
                  className="h-full min-w-35 object-cover bg-cover"
                />
              </Link>
              <div className="flex max-w-2xl flex-col px-3 pb-2">
                <h3 className="!mb-1 !mt-2 line-clamp-2 inline-block text-base font-bold  duration-300 hover:text-primary ">
                  <Link href={`/adv/${adv?.id}`} className="!text-black">
                    {`${adv?.title.slice(0, 100)}...`}
                  </Link>
                </h3>
                <span className="line-clamp-3 h-fit max-w-[80%]">{adv?.desciption}</span>
              </div>
            </div>
            <div className="flex w-fit flex-row sm:items-center items-start justify-center sm:gap-4 gap-2 pr-2 pt-2">
              {isStars && <Rating point={adv?.rating} />}

              <Menu as="div" className="relative inline-block text-left h-full">
                {(editAdv || removeAdv) && (
                  <MenuButton className="absolute right-2 top-2 flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                )}
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="py-1 absolute right-2 top-8">
                    <MenuItem>
                      {({ focus }) =>
                        editAdv && (
                          <Button
                            className="mt-2"
                            isIconOnly
                            color="primary"
                            onClick={() => editAdv(adv)}
                          >
                            <FaEdit />
                          </Button>
                        )
                      }
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) =>
                        removeAdv && (
                          <Popover placement="top" color="danger">
                            <PopoverTrigger>
                              <Button isIconOnly color="danger" className="mt-2">
                                <FaTrash />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2">
                                <div className="text-wrap font-bold ">
                                  Үйлчилгээг устгахдаа итгэлтэй байна уу?
                                </div>
                                <Button
                                  variant="solid"
                                  color="danger"
                                  onClick={() => removeAdv(adv?.id)}
                                >
                                  Тийм
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )
                      }
                    </MenuItem>
                  </div>
                </Transition>
              </Menu>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ListServices;
