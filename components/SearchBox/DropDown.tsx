import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { useAppContext } from "@/utils/context/app-context";

export default function DropDown() {
  // Sticky menu
  const { mainDirections } = useAppContext();
  const [dropdownToggler, setDropdownToggler] = useState(false);
  return (
    <Popover key="bottom-start" placement="bottom-start">
      <PopoverTrigger>
        <Button
          radius="none"
          onClick={() => setDropdownToggler(!dropdownToggler)}
          className="rounded-l"
        >
          Бүгд
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-mainGray !p-4">
        <div className="w-full columns-3 gap-y-8 space-y-8 md:w-[600px] lg:w-[800px]">
          {mainDirections.map((md: any, index: number) => {
            return (
              <div
                key={index}
                className="!mb-2 !mt-0 inline-block h-min w-full"
              >
                <div className="mb-2 flex flex-row">
                  <Image
                    src={process.env.IMG_PATH + md?.logo?.path}
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
                  {md?.children?.map((d: any, index: number) => {
                    return (
                      <Popover placement="right" className="w-full" key={index}>
                        <PopoverTrigger>
                          <li className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor">
                            <div className="flex flex-row items-center justify-between">
                              <span className="text-sm">{d.name}</span>
                              {d.sub_children?.length !== 0 ? (
                                <BsChevronRight />
                              ) : null}
                            </div>
                          </li>
                        </PopoverTrigger>
                        {d.sub_children?.length !== 0 ? (
                          <PopoverContent className="w-40 min-w-max items-start p-4">
                            <ul>
                              {d.sub_children?.map(
                                (sub: any, index: number) => {
                                  return (
                                    <li
                                      key={index}
                                      className="mb-3 cursor-pointer transition-all duration-300 last:mb-0 hover:text-mainColor"
                                    >
                                      {sub.name}
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </PopoverContent>
                        ) : null}
                      </Popover>
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
