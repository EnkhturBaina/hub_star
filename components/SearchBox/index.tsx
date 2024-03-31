'use client';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import DropDown from './DropDown';

const SearchBox = () => {
  return (
    <div className="flex w-full flex-row">
      <DropDown />
      <Input
        label=""
        placeholder="Хайх ..."
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400"></span>
          </div>
        }
        radius="none"
        size="sm"
        isClearable
        onClear={() => console.log('input cleared')}
        className="border-1 px-1 rounded-none"
        classNames={{
          mainWrapper: 'contents h-10',
          innerWrapper: '!pb-0',
          inputWrapper: 'h-full bg-white px-2 hover:bg-white',
        }}
      />
      <Button
        radius="none"
        isIconOnly
        aria-label="Like"
        className="h-10 w-10 rounded-r-md bg-black"
      >
        <Image src="/search.svg" alt="logo" width={15} height={15} className="block" />
      </Button>
    </div>
  );
};

export default SearchBox;
