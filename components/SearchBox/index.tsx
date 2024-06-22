'use client';
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { useAppContext } from '@/app/app-context';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import Drawer from '../Drawer';
import { useRouter } from 'next/router';
import { MainDirection, RefDirection } from '@/types/reference';
import Image from 'next/image';
import { BiRightArrowAlt } from 'react-icons/bi';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { PiArrowRightBold } from 'react-icons/pi';

type selectedProps = {
  id: MainDirection['id'];
  name: MainDirection['name'];
};

const SearchBox: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState<string>(undefined);
  const { mainDirections } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedID, setSelectedID] = useState<selectedProps>({
    id: mainDirections[0]?.id,
    name: mainDirections[0]?.name,
  });

  const [selectedItems, setSelectedItems] = useState<MainDirection['directions']>(
    mainDirections[0]?.directions || []
  );

  useEffect(() => {
    if (mainDirections.length > 0) {
      setSelectedItems(mainDirections[0].directions);
      setSelectedID({
        id: mainDirections[0].id,
        name: mainDirections[0].name,
      });
    }
  }, [mainDirections]);

  const handleSelection = (mainDirectionId: number) => {
    dispatch(
      setAdvParam({ page: 1, limit: 10, order: 'DESC', mainDirectionIds: [mainDirectionId] })
    );
  };

  const onClickDirection = (direction: RefDirection) => {
    setIsOpen(false);
    router.push('/adv');
    dispatch(
      setAdvParam({
        order: 'DESC',
        page: 1,
        limit: 10,
        mainDirectionIds: [direction.mainDirectionId],
        directionIds: [direction.id],
      })
    );
  };

  return (
    <div className="flex w-full h-10 flex-row">
      {/* <DropDown /> */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="!mb-2 !mt-0 md:flex gap-[48px] h-min w-full">
          <div className="w-fit flex flex-col gap-0 items-start justify-start">
            {mainDirections.map((md: MainDirection, idx: number) => (
              <>
                <Button
                  className={`min-w-[300px] min-h-[38px] h-fit w-fit rounded-md flex justify-between items-center text-[14px] hover:bg-[#f39d34] hover:text-white text-black 
                  ${md.id == selectedID.id ? 'bg-[#F7941D] !text-white' : 'bg-transparent'}`}
                  key={idx}
                  onClick={() => {
                    setSelectedID({ id: md.id, name: md.name });
                    setSelectedItems(md.directions);
                  }}
                >
                  <div className="flex items-center gap-1 w-fit">
                    <Image
                      src={process.env.NEXT_PUBLIC_MEDIA_URL + md.logoId}
                      alt="add"
                      height={20}
                      width={20}
                      className="rounded-md object-contain object-center"
                    />
                    {md?.name}
                  </div>
                  <PiArrowRightBold />
                </Button>
                <div className="pl-6 py-2">
                  {md.id === selectedID.id
                    ? selectedItems.map((d: RefDirection, idx: number) => {
                        return (
                          <div
                            key={idx}
                            onClick={() => onClickDirection(d)}
                            className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                          >
                            <span className="text-md flex gap-1 items-center">
                              <span className="text-red-500">*</span>
                              {d.name}
                            </span>
                          </div>
                        );
                      })
                    : null}
                </div>
              </>
            ))}
          </div>
          <div className="md:block hidden space-y-2 w-full">
            <div className="text-2xl font-bold borer-b borer-b-black w-full">
              {selectedID.name || ''}
            </div>
            <div className="space-y-2">
              {selectedItems.map((d: RefDirection, idx: number) => {
                return (
                  <div
                    key={idx}
                    onClick={() => onClickDirection(d)}
                    className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                  >
                    <span className="text-md">{d.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Drawer>

      <Autocomplete
        label=""
        size="sm"
        radius="none"
        value={searchVal}
        placeholder="Хайх ..."
        onValueChange={setSearchVal}
        onSelectionChange={handleSelection}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400"></span>
          </div>
        }
        onClear={() => setSearchVal(undefined)}
        isClearable
        className="min-h-10 flex items-center"
        classNames={{
          base: 'border-1 rounded-none',
          // mainWrapper: 'contents h-10',
          // innerWrapper: '!pb-0',
        }}
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
