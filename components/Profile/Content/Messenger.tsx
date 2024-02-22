"use client";

import { Avatar, Chip, Divider, Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

const Messenger = () => {
  return (
    <div className="mb-4 max-h-[1000px] w-full overflow-hidden">
      <div className="flex flex-row gap-4">
        <div className="w-2/3 rounded-md border border-stroke bg-white p-6"></div>
        <div className="flex w-1/3 flex-col rounded-md border border-stroke bg-white p-6">
          <Input
            type="text"
            label=""
            placeholder="хайх"
            labelPlacement="outside"
            radius="sm"
            size="md"
            variant="bordered"
            classNames={{
              base: "mb-4",
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            startContent={
              <CiSearch className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
          />
          <Divider />
          <div className="mt-2 flex h-full max-h-screen flex-grow flex-col gap-y-4 overflow-y-auto py-4 pr-2">
            {[...new Array(36)].map((element, i) => {
              return (
                <div className="flex cursor-pointer items-center gap-2" key={i}>
                  <Avatar
                    alt={`avatar-${i}`}
                    className="flex-shrink-0"
                    size="sm"
                    src="/images/user/user-01.png"
                  />
                  <div className="flex w-full flex-row items-center justify-between">
                    <span className="text-small font-bold">axaxa - {i}</span>
                    <Chip
                      variant="shadow"
                      classNames={{
                        base: "bg-mainColor border-small",
                        content: "drop-shadow shadow-black text-white px-1",
                      }}
                    >
                      {i}
                    </Chip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
