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
        // type="search"
        label=""
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400"></span>
          </div>
        }
        radius="none"
        size="sm"
        isClearable
        onClear={() => console.log('input cleared')}
        className="h-10"
        classNames={{ mainWrapper: 'contents', innerWrapper: '!pb-0' }}
      />
      <Button radius="none" isIconOnly aria-label="Like" className="h-10 w-10 rounded-r bg-black">
        <Image src="/search.svg" alt="logo" width={15} height={15} className="block" />
      </Button>
    </div>
  );
};

export default SearchBox;
