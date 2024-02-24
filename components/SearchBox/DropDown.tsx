import React, { useContext, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import MainContext from "@/app/context/MainContext";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { Divider } from "semantic-ui-react";

export default function DropDown() {
  // Sticky menu
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const state = useContext(MainContext);
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
      <PopoverContent className="flex w-[800px] flex-row items-start bg-mainGray">
        {state?.mainDirection &&
          state?.mainDirection?.map((md: any, index: number) => {
            return (
              <div key={index}>
                <div className="mb-5 flex flex-row">
                  <Image
                    src={process.env.IMG_PATH + md?.logo?.path}
                    alt="add"
                    height={30}
                    width={30}
                    className="rounded-md object-contain object-center"
                  />
                  <h4 className="!mt-0 ml-2 self-center text-lg font-semibold text-black">
                    {md?.name}
                  </h4>
                </div>
                <ul>
                  {md?.children?.map((d: any, index: number) => {
                    return (
                      <Popover placement="right" className="w-full" key={index}>
                        <PopoverTrigger>
                          <li className="mb-3 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor">
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
                <Divider className="my-4" />
              </div>
            );
          })}
      </PopoverContent>
    </Popover>
  );
}
