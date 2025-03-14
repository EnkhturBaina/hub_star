import React, { useState } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import Image from 'next/image';
import { RefDirection, MainDirection } from '@typeDefs/reference';
import { useRouter } from 'next/router';
import { BiSolidRightArrowAlt } from 'react-icons/bi';

export default function DropDown() {
  // Sticky menu
  const router = useRouter();
  const mainDirections = [];
  const [isOpen, setIsOpen] = useState(false);

  const onClickDirection = (direction: RefDirection) => {
    setIsOpen(false);
    router.push({
      pathname: 'adv',
      query: { mainDirectionIds: [direction.mainDirectionId], directionIds: [direction.id] },
    });
  };
  return (
    <Popover
      key="bottom-start"
      placement="bottom-start"
      isOpen={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button radius="none" className="rounded-l-md bg-white border-1 items-center">
          <div className="flex flex-row items-center">
            <span className="font-bold">Бүгд</span>
            <BiSolidRightArrowAlt size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-mainGray !p-4">
        <div className="w-full columns-3 gap-y-8 space-y-8 md:w-[600px] lg:w-[800px]">
          {mainDirections.map((md: MainDirection, index: number) => {
            return (
              <div key={index} className="!mb-2 !mt-0 inline-block h-min w-full">
                <div className="mb-2 flex flex-row">
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + md.logoId}
                    alt="add"
                    height={20}
                    width={20}
                    className="rounded-md object-contain object-center"
                  />
                  <h4 className="!mt-0 ml-2 self-center text-sm font-semibold text-black">
                    {md?.name}
                  </h4>
                </div>
                <ul>
                  {md?.directions?.map((d: RefDirection, index: number) => {
                    return (
                      <li
                        key={index}
                        onClick={() => onClickDirection(d)}
                        className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                      >
                        <div className="flex flex-row items-center justify-between">
                          <span className="text-sm">{d.name}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
