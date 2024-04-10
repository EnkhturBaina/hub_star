'use client';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import DropDown from './DropDown';
import { useAppContext } from '@/app/app-context';
const SearchBox: React.FC = () => {
  const { adParam, setAdParam } = useAppContext();
  const [searchVal, setSearchVal] = useState<string>(undefined);
  const onClickSearch = () => {
    setAdParam({
      ...adParam,
      title: searchVal,
    });
  }
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
        onClear={() => setSearchVal(undefined)}
        classNames={{
          base: 'border-1 rounded-none',
          mainWrapper: 'contents h-10',
          innerWrapper: '!pb-0',
          inputWrapper: 'h-full bg-white px-2',
        }}
        onValueChange={setSearchVal}
        value={searchVal}
      />
      <Button
        radius="none"
        isIconOnly
        aria-label="Like"
        className="h-10 w-10 rounded-r-md bg-black"
        onClick={() => onClickSearch()}
      >
        <Image src="/search.svg" alt="logo" width={15} height={15} className="block" />
      </Button>
    </div>
  );
};

export default SearchBox;
