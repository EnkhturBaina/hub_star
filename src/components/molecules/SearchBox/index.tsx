'use client';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalHeader,
  CardBody,
  Card,
} from '@heroui/react';
import Drawer from '../Drawer';
import { useRouter } from 'next/router';
import { MainDirection, RefDirection, SubDirection } from '@typeDefs/reference';
import Image from 'next/image';
import { BiMinus, BiPlus } from 'react-icons/bi';
import ReferenceService from '@services/reference';
import classNames from '@utils/classNames';

type selectedProps = {
  id: MainDirection['id'];
  name: MainDirection['name'];
};
const SearchBox: React.FC = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState<string>('');
  const mainDirections = [];
  const [directions, setDirections] = useState([]);

  const [openDrawer, setIsOpenDrawer] = useState(false);
  const [subID, setSubID] = useState<number>(null);
  const [selectedID, setSelectedID] = useState<selectedProps>(null);
  const [selectedItems, setSelectedItems] = useState<MainDirection['directions'] | any>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [choosedBranchId, setChoosedBranchId] = useState(0);
  const [orgOpen, setOrgOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    setSelectedItems([]);
    setSelectedID(null);
  }, [isOpen]);

  useEffect(() => {
    const loadData = async () => {
      if (searchVal.length >= 3) {
        const result = await ReferenceService.getDirectionFilter({
          name: searchVal,
          lang: router.locale.toUpperCase(),
        });
        setDirections(result.response.data);
      }
    };
    loadData();
  }, [searchVal]);

  useEffect(() => {
    const loadBranch = async () => {
      const result = await ReferenceService.getAllBranch();
      if (result.success) {
        setBranches(result.response);
      }
    };
    loadBranch();
  }, [orgOpen]);
  useEffect(() => {
    const loadPartnership = async () => {
      const result = await ReferenceService.getAllPartnership(choosedBranchId);
      if (result.success) {
        setPartnerships(result.response);
      }
    };
    loadPartnership();
  }, [choosedBranchId]);

  const onClickDirection = (
    mainDirection: MainDirection,
    direction?: RefDirection,
    subDirection?: SubDirection | any
  ) => {
    setIsOpenDrawer(false);
    onClose();
    router.push({
      pathname: '/adv',
      query: {
        mainDirectionIds: [mainDirection.id],
        directionIds: direction?.id,
        subDirectionIds: subDirection?.id,
      },
    });
  };

  return (
    <div className="flex w-full h-10 flex-row">
      {/* <DropDown /> */}
      <Drawer isOpen={openDrawer} setIsOpen={setIsOpenDrawer}>
        <div className="!mb-2 !mt-0 md:flex gap-[48px] h-min w-full">
          <div className="w-fit flex flex-col gap-0 items-start justify-start">
            <Button
              className={classNames(
                'min-w-[300px] min-h-[38px] h-fit w-fit rounded-md flex justify-between items-center text-[14px] hover:bg-[#f39d34] hover:text-white text-black',
                orgOpen ? 'bg-[#F7941D] !text-white' : 'bg-transparent'
              )}
              onPress={() => {
                setOrgOpen(prev => !prev);
              }}
            >
              <div className="flex items-center gap-1 w-fit">
                <Image
                  src={'/images/icon/branch.svg'}
                  alt="add"
                  height={20}
                  width={20}
                  className="rounded-md object-contain object-center"
                />
                Салбарын байгууллагууд
              </div>
              {orgOpen ? <BiMinus /> : <BiPlus />}
              {/* <PiArrowRightBold /> */}
            </Button>
            <div className="pl-6 py-2">
              {orgOpen
                ? branches.map((branch: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setChoosedBranchId(choosedBranchId === branch?.id ? 0 : branch.id);
                      }}
                      className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0"
                    >
                      <span
                        className={classNames(
                          'text-md flex gap-1 items-center hover:text-mainColor',
                          branch.id === choosedBranchId ? 'text-mainColor' : null
                        )}
                      >
                        <span className="text-red-500">*</span>
                        {branch?.name}
                      </span>
                      {branch?.id === choosedBranchId &&
                        partnerships.map((partnership: any, index: number) => (
                          <div
                            key={index}
                            onClick={() => {
                              router.push({
                                pathname: 'partnership',
                                query: {
                                  choosedId: partnership?.id,
                                },
                              });
                              setIsOpenDrawer(false);
                            }}
                            className="mb-2 mt-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-[#fdb15a] ml-4"
                          >
                            - <span className="text-md">{partnership.name}</span>
                          </div>
                        ))}
                    </div>
                  ))
                : null}
            </div>
            {mainDirections.map((md: MainDirection, idx: number) => (
              <>
                <Button
                  key={idx}
                  className={`min-w-[300px] min-h-[38px] h-fit w-fit rounded-md flex justify-between items-center text-[14px] hover:bg-[#f39d34] hover:text-white text-black 
                  ${md.id == selectedID?.id ? 'bg-[#F7941D] !text-white' : 'bg-transparent'}`}
                  onPress={() => {
                    if (selectedID?.id == md.id) {
                      setSelectedID(null);
                    } else {
                      setSelectedID({ id: md.id, name: md.name });
                      setSelectedItems(md.directions);
                    }
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
                  {md.id === selectedID?.id ? <BiMinus /> : <BiPlus />}
                  {/* <PiArrowRightBold /> */}
                </Button>
                <div className="pl-6 py-2">
                  {md.id === selectedID?.id
                    ? selectedItems.map((d: RefDirection, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => {
                            if (!d.subDirections.length) {
                              onClickDirection(md, d);
                            } else {
                              setSubID(prev => (prev ? null : d.id));
                            }
                          }}
                          className="mb-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0"
                        >
                          <span
                            className={`text-md flex gap-1 items-center hover:text-mainColor ${d.id === subID && 'text-mainColor'}`}
                          >
                            <span className="text-red-500">*</span>
                            {d.name}
                          </span>
                          {d.id === subID &&
                            d.subDirections.map((sub: any, idx2: number) => (
                              <div
                                key={idx2}
                                onClick={() => onClickDirection(md, d, sub)}
                                className="mb-2 mt-2 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-[#fdb15a] ml-4"
                              >
                                - <span className="text-md">{sub.name}</span>
                              </div>
                            ))}
                        </div>
                      ))
                    : null}
                </div>
              </>
            ))}
          </div>
        </div>
      </Drawer>
      {/* 
      <div className="flex flex-col w-full">
        <Input
          size="sm"
          radius="none"
          placeholder="Хайх..."
          value={searchVal}
          onValueChange={setSearchVal}
        />
        <Card className="bg-orange-300 max-w-[400px]">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
        </Card>
      </div> */}
      {/* {JSON.stringify(directions)} */}
      <div className="w-full">
        <Input
          classNames={{
            base: 'w-full h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Хайх ..."
          size="sm"
          type="search"
          onClick={onOpen}
        />
      </div>
      <Modal isOpen={isOpen} scrollBehavior={'outside'} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Хайлт</ModalHeader>
          <ModalBody>
            <Input
              classNames={{
                base: 'w-full h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              placeholder="Хайх ..."
              size="sm"
              type="search"
              value={searchVal}
              onValueChange={setSearchVal}
            />
            {directions.map(item => (
              <Fragment key={item?.id}>
                <Card className="cursor-pointer">
                  <CardBody className="text-lg bg-slate-300" onClick={() => onClickDirection(item)}>
                    {item?.name}
                  </CardBody>
                  {(item?.directions ?? []).map(direction => (
                    <Card key={direction?.id} className="ml-1">
                      <CardBody
                        className="text-medium bg-slate-200"
                        onClick={() => onClickDirection(item, direction)}
                      >
                        {direction?.name}
                      </CardBody>
                      {(direction?.subDirections ?? []).map(sub => (
                        <Card key={sub?.id} className="ml-2 bg-slate-100">
                          <CardBody
                            className="text-medium"
                            onClick={() => onClickDirection(item, direction, sub)}
                          >
                            {sub?.name}
                          </CardBody>
                        </Card>
                      ))}
                    </Card>
                  ))}
                </Card>
              </Fragment>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Autocomplete
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
      > */}
      {/* {directions.map(item => (
          <AutocompleteItem key={item.id} value={item.id}>
            {item.name}
          </AutocompleteItem>
        ))} */}
      {/* </Autocomplete> */}
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
