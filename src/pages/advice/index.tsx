import React, { useEffect, useRef, useState } from 'react';
import AdviceItem from '@components/molecules/Advertisement/AdviceItem';
import BreadCrumbs from '@components/atoms/BreadCrumbs';
import SideCheckDirection from '@components/atoms/SideCheckDirection';
import PaginationComp from '@components/molecules/Pagination';
import ReferenceService from '@services/reference';
import { Advice, PageMeta } from '@typeDefs/reference';
import { Select, SelectItem } from '@heroui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LuSettings2 } from 'react-icons/lu';
import { Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react';
import { useTranslations } from 'next-intl';
import IApiResponse from '@typeDefs/response';
import { useMainState } from '@context/main';
import Head from 'next/head';

/** Зөвлөмжүүд */
const AdvicePage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { addQuery } = useMainState();
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    pageCount: 1,
  });
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const result: IApiResponse = await ReferenceService.getAdvice(router.query);
      if (result.success) {
        setAdvices(result.response?.data);
        setPageMeta(result.response?.meta);
      }
    };
    loadData();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{t('advices')} | Hub Star</title>
      </Head>
      <section className="w-full pt-35 mx-auto">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 pt-8 pb-5 lg:flex-row xl:gap-12.5 mt-20">
            <div className="flex flex-col">
              <span className="text-xl">
                {t('totalValue')}: <span className="font-bold">{pageMeta.itemCount}</span>
              </span>
              <div>
                <BreadCrumbs items={[t('advices')]} />
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-2xl flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 lg:w-full lg:flex-row"
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
            <SideCheckDirection />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="w-full !rounded-xl !border-0">
              <div className="w-full mx-auto flex gap-4 px-4 md:px-8 2xl:px-0">
                <div className="hidden md:block md:w-1/4 lg:w-[20%]">
                  <SideCheckDirection />
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
                      labelPlacement="outside"
                      radius="sm"
                      size="md"
                      variant="bordered"
                      classNames={{
                        base: 'w-40 !mt-0',
                        label: 'font-bold',
                        trigger: 'custom-select-trigger bg-white',
                      }}
                      value="DESC"
                      onChange={e => addQuery(e.target.value)}
                    >
                      <SelectItem key="DESC">Огноогоор (Z-A)</SelectItem>
                      <SelectItem key="ASC">Огноогоор (A-Z)</SelectItem>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {advices.map((item, index) => (
                      <AdviceItem advice={item} key={index} />
                    ))}
                  </div>
                  <PaginationComp page={pageMeta.page} pageCount={pageMeta.pageCount} />
                </div>
              </div>
            </Segment>
          </SidebarPusher>
        </SidebarPushable>
      </section>
    </>
  );
};
export default AdvicePage;
