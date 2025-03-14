import React, { useEffect, useRef, useState } from 'react';
import BreadCrumbs from '@components/atoms/BreadCrumbs';
import PaginationComp from '@components/molecules/Pagination';
import { Select, SelectItem } from '@heroui/react';
import { NextPage } from 'next';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import SpecialServiceData from '@datas/SpecialServiceData';
import SideCheckSpecialDirection from '@components/atoms/SideCheckSpecialDirection';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { PageMeta } from '@typeDefs/reference';
import AdvertisementService from '@services/advertisement';
import AdvertisementCard from '@components/atoms/advertisement';

const SpecialService: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    page: 1,
    pageCount: 0,
    itemCount: 0,
    limit: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const result = await AdvertisementService.getAd(router.query);
        if (result.success) {
          setAdvertisements(result.response.data);
          setPageMeta(result.response?.meta);
        }
      } catch (error) {
        console.log('noop advertisement', error);
      }
    };
    loadAdvertisement();
  }, [router.query]);

  const onAdvParam = (param: any) => {
    router.push({ query: param });
  };

  return (
    <section className="w-full pt-30 lg:pt-30 xl:pt-30.5 mx-auto">
      <div className="bg-gray-100 px-4 md:px-8 2xl:px-0">
        <div className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-7.5 px-6 pt-20 pb-6 lg:flex-row xl:gap-12.5">
          <div className="flex flex-col">
            <span className="text-xl">
              {t('totalValue')}: <span className="font-bold">{pageMeta.itemCount}</span>
            </span>
            <div>
              <BreadCrumbs
                items={[
                  t('specialService'),
                  t(
                    SpecialServiceData.find(item => item.type == router.query.specialService)?.title
                  ),
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
              <div className="hidden md:block md:w-1/4 lg:w-[20%]">
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
                      onAdvParam({ order: e.target.value });
                    }}
                  >
                    <SelectItem key="DESC">Огноогоор (Z-A)</SelectItem>
                    <SelectItem key="ASC">Огноогоор (A-Z)</SelectItem>
                  </Select>
                </div>
                {advertisements.length > 0 ? (
                  <div className="grid grid-cols-2 2xl:grid-cols-3 gap-6">
                    {advertisements.map(item => (
                      <AdvertisementCard advertisement={item} key={item.id} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center text-xl font-bold text-gray-600">
                    Хайлт олдсонгүй
                  </div>
                )}
                <PaginationComp page={pageMeta.page} pageCount={pageMeta.page} />
              </div>
            </div>
          </Segment>
        </SidebarPusher>
      </SidebarPushable>
    </section>
  );
};
export default SpecialService;
