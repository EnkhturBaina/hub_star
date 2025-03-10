import React, { useRef, useState } from 'react';
import { useAppContext } from '@context/app-context';
import BlogItem from '@components/Blog/BlogItem';
import BreadCrumbs from '@components/Common/BreadCrumbs';
import PaginationComp from '@components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { OrderType } from '@typeDefs/reference';
import { Select, SelectItem } from '@heroui/react';
import { GetStaticProps, NextPage } from 'next';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import SpecialServiceData from '@datas/SpecialServiceData';
import { useTypedSelector } from '@lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@lib/features/adv-param';
import SideCheckSpecialDirection from '@components/Common/SideCheckSpecialDirection';
import { useTranslation } from 'next-i18next';
import { withTranslationProps } from '@lib/with-translation';

const SpecialService: NextPage = () => {
  const { t } = useTranslation();
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
      <section className="w-full pt-30 lg:pt-30 xl:pt-30.5 mx-auto">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0">
          <div className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-7.5 px-6 pt-20 pb-6 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                {t('totalValue')}: <span className="font-bold">{adMeta.itemCount}</span>
              </span>
              <div>
                <BreadCrumbs
                  items={[
                    t('specialService'),
                    t(SpecialServiceData.find(item => item.type == advParam.specialService)?.title),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className=" custom-sidebar-base mx-auto mt-2 flex max-w-screen-2xl flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 lg:w-full lg:flex-row"
        >
          <Sidebar
            animation="push"
            icon={'labeled'}
            onHide={() => setVisible(false)}
            visible={visible}
            width="wide"
            className="!bg-white"
            ref={sideBarRef}
          >
            <SideCheckSpecialDirection closeFnc={() => (visible ? setVisible(false) : undefined)} />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="w-full !rounded-xl !border-0">
              <div className="w-full mx-auto flex gap-4 px-4 md:px-8 2xl:px-0">
                <div className={`hidden md:block md:w-1/4 lg:w-[20%]`}>
                  <SideCheckSpecialDirection />
                </div>
                <div className="pb-6 lg:w-3/4 w-full ml-6">
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
                  {advertisements.length > 0 ? (
                    <div className="grid grid-cols-2 2xl:grid-cols-3 gap-6">
                      {advertisements.map(blog => (
                        <BlogItem blog={blog} key={blog.id} />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center text-xl font-bold text-gray-600">
                      Хайлт олдсонгүй
                    </div>
                  )}
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
export const getStaticProps: GetStaticProps = withTranslationProps();
export default SpecialService;
