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
import React, { useEffect, useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import SpecialServiceData from '@/app/data/SpecialServiceData';
import { motion } from 'framer-motion';
import AdSkeleton from '@/components/Skeleton/AdSkeleton';

const SpecialService: NextPage = () => {
  const { adParam, setAdParam, advertisements, adMeta } = useAppContext();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    const param: IAdParam = {
      order: 'DESC',
      page: 1,
      limit: 10,
      process: 'CREATED',
    };
    if (router.query.specialServiceType) {
      param.specialService = router.query.specialServiceType as SpecialServiceType;
    }
    setAdParam(param);
  }, [router.query.specialServiceType]);

  return (
    <>
      <section className="pt-30 lg:pt-25 xl:pt-30.5">
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -10,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="animate_top flex no-scrollbar flex-row md:justify-center overflow-x-auto whitespace-nowrap md:flex-nowrap md:items-center lg:gap-7.5 xl:gap-5 gap-2 z-40 md:h-30 cursor-pointer items-center transition-all pb-2"
        >
          {SpecialServiceData.map((item, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setAdParam({ ...adParam, specialService: item.type });
                }}
                className={`flex h-full flex-row md:flex-col items-center justify-around p-2 md:min-w-40 special-service hover:bg-primary rounded-lg border border-white group shadow-md ${adParam.specialService == item.type ? 'bg-primary' : 'bg-white'}`}
              >
                <div
                  className={`h-5 w-5 md:h-16 md:w-16 rounded-[4px] content-center flex ${adParam.specialService === item.type ? 'active-icon' : ''}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`flex items-center justify-center text-center align-middle text-xs font-bold leading-none text-[#212529] ml-2 md:ml-0 md:max-w-40 md:text-wrap group-hover:text-white ${adParam.specialService == item.type && 'text-white'}`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </motion.div>
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
                    SpecialServiceData.find(item => item.type == adParam.specialService)?.title,
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
            {adParam.specialService ? (
              <SideCheckSubDirection
                specialService={adParam.specialService}
                closeFnc={() => (visible ? setVisible(false) : undefined)}
              />
            ) : null}
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">
              <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
                <div className={`hidden md:block md:w-1/4 lg:w-[20%]`}>
                  {adParam.specialService ? (
                    <SideCheckSubDirection specialService={adParam.specialService} />
                  ) : null}
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
                        setAdParam({
                          ...adParam,
                          order: e.target.value as OrderType,
                          page: 1,
                          limit: 10,
                        });
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
