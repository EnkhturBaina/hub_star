import React from 'react';
import BreadCrumbs from '@components/atoms/BreadCrumbs';
import SideCheckSubDirection from '@components/atoms/SideCheckSubDirection';
import PaginationComp from '@components/molecules/Pagination';
import ReferenceService from '@services/reference';
import { Address, MachineryType, PageMeta } from '@typeDefs/reference';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import AdvertisementService from '@services/advertisement';
import { useMainState } from '@context/main';
import AdvertisementCard from '@components/atoms/advertisement';
import SelectField from '@components/atoms/selectField';

const AdvertisementPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { addQuery } = useMainState();
  const [materials, setMaterials] = useState<MachineryType[]>([]);
  const [machineryTypes, setMachineryTypes] = useState<MachineryType[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);
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
    const getProvince = async () => {
      try {
        ReferenceService.getAddress({ type: 'PROVINCE' }).then(response => {
          if (response.success) {
            setProvinces(response.response);
          }
        });
      } catch (error) {
        console.log('province is noop', error);
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    const loadMachinery = async () => {
      if (router.query?.userType == 'SUPPLIER') {
        ReferenceService.getMachinery({ type: 'MATERIAL' }).then(response => {
          if (response.success) {
            setMaterials(response.response);
          }
        });
      } else if (
        router.query?.userType == 'TRANSPORTATION' ||
        router.query?.userType == 'MACHINERY'
      ) {
        ReferenceService.getMachinery({ type: 'MACHINERY_TYPE' }).then(response => {
          if (response.success) {
            setMachineryTypes(response.response);
          }
        });
      }
    };
    const loadDistrict = async () => {
      try {
        if (router.query?.provinceId) {
          ReferenceService.getAddress({
            type: 'DISTRICT',
            parentId: router.query?.provinceId,
          }).then(response => {
            if (response.success) {
              setDistricts(response.response);
            }
          });
        }
      } catch (error) {
        console.log('district is noop:', error);
      }
    };
    const loadKhoroo = async () => {
      try {
        if (router.query?.districtId) {
          ReferenceService.getAddress({ type: 'KHOROO', parentId: router.query?.districtId }).then(
            response => {
              if (response.success) {
                setKhoroos(response.response);
              }
            }
          );
        }
      } catch (error) {
        console.log('khoroo is noop', error);
      }
    };
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
    loadMachinery();
    loadDistrict();
    loadKhoroo();
    loadAdvertisement();
  }, [router.query]);

  return (
    <>
      <section className="xl:pt-48 pt-46">
        <div className="mb-1 bg-gray-100 py-2 mt-4 flex justify-center">
          <div className="2xl:max-w-screen-2xl w-[90%] sm:px-6 sm:pt-0 pt-1">
            <BreadCrumbs items={[t(router.query?.userType)]} />
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex 2xl:max-w-screen-2xl w-[90%] flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6  lg:flex-row"
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
            <SideCheckSubDirection />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!w-full !rounded-xl !border-0">
              <div className=" flex w-full gap-8 justify-between">
                <div className={`hidden md:block w-fit lg:min-w-[340px] max-w-[340px]`}>
                  <SideCheckSubDirection />
                </div>
                <div className="pb-6 md:w-3/4">
                  {/* <div className="my-4 grid grid-cols-3 gap-2"></div> */}
                  <div className="w-full flex flex-col">
                    <div className="w-full flex gap-2 justify-between items-center">
                      <span className="lg:text-xl text-nowrap">
                        {t('services')}
                        <span className="!font-semibold">
                          {pageMeta.itemCount + ' ' + t('service').toLowerCase()}
                        </span>
                      </span>
                      <SelectField
                        label="Эрэмбэлэх"
                        value={router.query?.order}
                        onChange={value => addQuery({ order: value })}
                        options={[
                          { label: 'Хуучин нь эхэндээ', value: 'DESC' },
                          { label: 'Шинэ нь эхэндээ', value: 'ASC' },
                        ]}
                        className="block w-fit outline-none"
                      />
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
                    </div>
                    <div className="w-full my-4 grid md:grid-cols-3 grid-cols-2 gap-3 justify-between">
                      {(router.query?.userType == 'MACHINERY' ||
                        router.query?.userType == 'TRANSPORTATION') && (
                        <SelectField
                          label="Төрөл"
                          value={router.query.machineryTypeId}
                          options={machineryTypes.map(item => ({
                            value: item.id.toString(),
                            label: item.name,
                          }))}
                          className="w-full !outline-none"
                          onChange={value => addQuery({ machineryTypeId: value })}
                        />
                      )}

                      {router.query?.userType == 'SUPPLIER' && (
                        <SelectField
                          label={'Бараа материалын төрөл'}
                          value={router.query?.materialId}
                          onChange={value => addQuery({ materialId: Number(value) })}
                          options={materials.map(item => ({
                            value: item.id.toString(),
                            label: item.name,
                          }))}
                        />
                      )}
                      <SelectField
                        label={'Аймаг, хот'}
                        value={router.query?.provinceId}
                        onChange={value => {
                          addQuery({ provinceId: value });
                        }}
                        options={provinces.map(item => ({
                          label: item.name,
                          value: item.id.toString(),
                        }))}
                        className="w-full"
                      />
                      <SelectField
                        label={'Сум, дүүрэг'}
                        value={router.query?.districtId}
                        onChange={value => addQuery({ districtId: value })}
                        options={districts.map(item => ({
                          label: item.name,
                          value: item.id.toString(),
                        }))}
                      />
                      <SelectField
                        label={'Баг, хороо'}
                        value={router.query?.khorooId}
                        onChange={value => addQuery({ khorooId: value })}
                        options={khoroos.map(item => ({
                          label: item.name,
                          value: item.id.toString(),
                        }))}
                      />
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-3 grid-cols-2 gap-6 mt-4">
                    {advertisements.map(item => (
                      <AdvertisementCard advertisement={item} key={item.id} />
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
export default AdvertisementPage;
