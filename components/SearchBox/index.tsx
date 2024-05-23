'use client';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useState } from 'react';
import DropDown from './DropDown';
import { useAppContext } from '@/app/app-context';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
const SearchBox: React.FC = () => {
  const [searchVal, setSearchVal] = useState<string>(undefined);
  const { mainDirections } = useAppContext();
  const dispatch = useDispatch();

  const handleSelection = (mainDirectionId: number) => {
    dispatch(setAdvParam({ page: 1, limit: 10, order: 'DESC', mainDirectionId }));
  };
  return (
    <div className="flex w-full flex-row">
      <DropDown />
      <Autocomplete
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
          // mainWrapper: 'contents h-10',
          // innerWrapper: '!pb-0',
          // inputWrapper: 'h-full bg-white px-2',
        }}
        onValueChange={setSearchVal}
        value={searchVal}
        onSelectionChange={handleSelection}
      >
        {mainDirections.map(item => (
          <AutocompleteItem key={item.id} value={item.id}>
            {item.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {/* <Button
        radius="none"
        isIconOnly
        aria-label="Like"
        className="h-12 w-12 rounded-r-md bg-black"
        // onClick={() => onClickSearch()}
      >
        <Image src="/search.svg" alt="logo" width={15} height={15} className="block" />
      </Button> */}
    </div>
  );
};

export default SearchBox;
