import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { OrderType, SpecialServiceType } from '@/types/reference';
import { Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import SideCheckSpecialDirection from '@/components/Common/SideCheckSpecialDirection';

const SpecialService: NextPage = () => {
  const { advertisements, adMeta } = useAppContext();
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  const onAdvParam = (param: IAdParam) => {
    dispatch(setAdvParam(param));
  };

  return (
    <>
      <section className="pt-30 lg:pt-30 xl:pt-30.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">{adMeta.itemCount}</span>
              </span>
              <div>
                <BreadCrumbs
                  items={[
                    'Онцгой үйлчилгээ',
                    SpecialServiceData.find(item => item.type == advParam.specialService)?.title,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-xl flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 lg:w-3/4 lg:flex-row"
        >
          <Sidebar
            animation="push"
            icon="labeled"
            onHide={() => setVisible(false)}
            visible={visible}
            width="wide"
            className="!bg-white"
            ref={sideBarRef}
          >
            <SideCheckSpecialDirection closeFnc={() => (visible ? setVisible(false) : undefined)} />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">
              <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
                <div className={`hidden md:block md:w-1/4 lg:w-[20%]`}>
                  <SideCheckSpecialDirection />
                </div>
                <div className="pb-6 lg:w-3/4 w-full">
                  <div className="mb-4 flex flex-row justify-between">
                    {!visible ? (
                      <div
                        className="w-fit rounded-xl bg-white p-2 md:hidden border-[#e4e4e7] border-2"
                        onClick={() => {
                          setVisible(true);
                        }}
                      >
                        <LuSettings2 className="text-2xl" />
                      </div>
                    ) : null}
                    <Select
                      label="Эрэмбэлэлт"
                      labelPlacement="inside"
                      radius="sm"
                      size="md"
                      variant="bordered"
                      classNames={{
                        base: 'w-50 !mt-0',
                        label: 'font-bold',
                        trigger: 'custom-select-trigger bg-white !h-12 !min-h-12',
                        innerWrapper: '!pt-0',
                      }}
                      value="DESC"
                      onChange={e => {
                        onAdvParam({ ...advParam, order: e.target.value as OrderType });
                      }}
                    >
                      <SelectItem key="DESC">Огноогоор (Z-A)</SelectItem>
                      <SelectItem key="ASC">Огноогоор (A-Z)</SelectItem>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {advertisements.map((blog, key) => (
                      <BlogItem blog={blog} key={key} />
                    ))}
                  </div>
                  <PaginationComp page={adMeta.page} pageCount={adMeta.pageCount} />
                </div>
              </div>
            </Segment>
          </SidebarPusher>
        </SidebarPushable>
      </section>
    </>
  );
};

export default SpecialService;
