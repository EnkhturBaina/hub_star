import React from 'react';
import BlogItem from '@components/molecules/Blog/BlogItem';
import BreadCrumbs from '@components/atoms/BreadCrumbs';
import SideCheckSubDirection from '@components/atoms/SideCheckSubDirection';
import CustomSelect from '@components/molecules/Inputs/Select';
import PaginationComp from '@components/molecules/Pagination';
import { ReferenceService } from '@services/reference/reference.service';
import {
  Address,
  MachineryType,
  MainDirection,
  OrderType,
  RefDirection,
} from '@typeDefs/reference';
import { GetStaticProps, NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import { useTypedSelector } from '@lib/reducer';
import UserTabData from '@datas/UserTabData';
import { withTranslationProps } from '@lib/with-translation';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const AdvertisementPage: NextPage = () => {
  const { t } = useTranslation();
  const advParam = useTypedSelector(state => state.advParam);
  const router = useRouter();
  const [materials, setMaterials] = useState<MachineryType[]>([]);
  const [machineryTypes, setMachineryTypes] = useState<MachineryType[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);
  const [userTypeName, setUserTypeName] = useState<string>('');
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [directions, setDirections] = useState<RefDirection[]>([]);
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);
  const advertisements = [];

  const getUserTypeName = useCallback(() => {
    const currentIndex = UserTabData.findIndex(item => item.type == advParam.userType);
    if (currentIndex > -1) {
      setUserTypeName(UserTabData[currentIndex].title);
    } else {
      setUserTypeName('');
    }
  }, [advParam.userType]);
  useEffect(() => getUserTypeName(), [getUserTypeName]);

  const getMainDirection = useCallback(() => {
    if (advParam.mainDirectionIds && advParam.mainDirectionIds.length > 0) {
      ReferenceService.getMainDirection({ ids: advParam.mainDirectionIds }).then(response => {
        if (response.success) {
          setMainDirections(response.response);
        }
      });
    }
  }, [advParam.mainDirectionIds]);
  useEffect(() => getMainDirection(), [getMainDirection]);

  const getDirection = useCallback(() => {
    if (advParam.directionIds && advParam.directionIds.length > 0) {
      ReferenceService.getDirection({ ids: advParam.directionIds }).then(response => {
        if (response.success) {
          setDirections(response.response);
        }
      });
    }
  }, [advParam.directionIds]);
  useEffect(() => getDirection(), [getDirection]);

  const getMachinery = useCallback(() => {
    if (advParam.userType == 'SUPPLIER') {
      ReferenceService.getMachinery({ type: 'MATERIAL' }).then(response => {
        if (response.success) {
          setMaterials(response.response);
        }
      });
    } else if (advParam.userType == 'TRANSPORTATION' || advParam.userType == 'MACHINERY') {
      ReferenceService.getMachinery({ type: 'MACHINERY_TYPE' }).then(response => {
        if (response.success) {
          setMachineryTypes(response.response);
        }
      });
    }
  }, [advParam.userType]);

  useEffect(() => {
    getMachinery();
  }, [getMachinery]);

  const getProvince = useCallback(() => {
    ReferenceService.getAddress({ type: 'PROVINCE' }).then(response => {
      if (response.success) {
        setProvinces(response.response);
      }
    });
  }, []);

  useEffect(() => {
    getProvince();
  }, [getProvince]);

  const getDistrict = useCallback(() => {
    ReferenceService.getAddress({ type: 'DISTRICT', parentId: advParam.provinceId }).then(
      response => {
        if (response.success) {
          setDistricts(response.response);
        }
      }
    );
  }, [advParam.provinceId]);

  useEffect(() => {
    getDistrict();
  }, [getDistrict]);

  const getKhoroo = useCallback(() => {
    ReferenceService.getAddress({ type: 'KHOROO', parentId: advParam.districtId }).then(
      response => {
        if (response.success) {
          setKhoroos(response.response);
        }
      }
    );
  }, [advParam.districtId]);

  useEffect(() => {
    getKhoroo();
  }, [getKhoroo]);

  const onAdvParam = (param: any) => {
    router.push({ query: param });
  };

  return (
    <>
      <section className="xl:pt-48 pt-46">
        <div className="mb-1 bg-gray-100 py-2 mt-4 flex justify-center">
          <div className="2xl:max-w-screen-2xl w-[90%] sm:px-6 sm:pt-0 pt-1">
            <BreadCrumbs
              items={[
                t(userTypeName),
                mainDirections.map(item => item.name).join(', '),
                directions.map(item => item.name).join(', '),
              ]}
            />
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
            <SideCheckSubDirection closeFnc={() => (visible ? setVisible(false) : undefined)} />
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
                        {t('services')} |{' '}
                        <span className="!font-semibold">
                          {10 + ' ' + t('service').toLowerCase()}
                        </span>
                      </span>
                      <CustomSelect
                        value={advParam?.order}
                        onSelectionChange={value => {
                          onAdvParam({
                            ...advParam,
                            order: value as OrderType,
                            page: 1,
                            limit: 10,
                          });
                        }}
                        options={[
                          { label: 'Хуучин нь эхэндээ', value: 'DESC' },
                          { label: 'Шинэ нь эхэндээ', value: 'ASC' },
                        ]}
                        className="md:block hidden !w-fit !outline-none"
                        size="sm"
                      />{' '}
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
                      {/* TODO  */}
                      {(advParam.userType == 'MACHINERY' ||
                        advParam.userType == 'TRANSPORTATION') && (
                        <CustomSelect
                          label="Төрөл"
                          value={advParam.machineryTypeId}
                          options={machineryTypes.map(item => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          className="w-full !outline-none"
                          size="sm"
                          onSelectionChange={value => {
                            onAdvParam({ ...advParam, machineryTypeId: Number(value) });
                          }}
                        />
                      )}
                      <CustomSelect
                        label="Эрэмбэлэх"
                        value={advParam?.order}
                        onSelectionChange={value => {
                          onAdvParam({
                            ...advParam,
                            order: value as OrderType,
                            page: 1,
                            limit: 10,
                          });
                        }}
                        options={[
                          { label: 'Хуучин нь эхэндээ', value: 'DESC' },
                          { label: 'Шинэ нь эхэндээ', value: 'ASC' },
                        ]}
                        className="md:hidden block w-full !outline-none"
                        size="sm"
                      />{' '}
                      {advParam.userType == 'SUPPLIER' && (
                        <CustomSelect
                          label={'Бараа материалын төрөл'}
                          value={advParam.materialId}
                          onSelectionChange={value => {
                            onAdvParam({ ...advParam, materialId: Number(value) });
                          }}
                          options={materials.map(item => ({
                            label: item.name,
                            value: item.id,
                          }))}
                          className="w-full"
                          size="sm"
                        />
                      )}
                      <CustomSelect
                        label={'Аймаг, хот'}
                        value={advParam.provinceId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, provinceId: Number(value) });
                        }}
                        options={provinces.map(item => ({ label: item.name, value: item.id }))}
                        className="w-full"
                        size="sm"
                      />
                      <CustomSelect
                        label={'Сум, дүүрэг'}
                        value={advParam.districtId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, districtId: Number(value) });
                        }}
                        options={districts.map(item => ({ label: item.name, value: item.id }))}
                        className="w-full"
                        size="sm"
                      />
                      <CustomSelect
                        label={'Баг, хороо'}
                        value={advParam.khorooId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, khorooId: Number(value) });
                        }}
                        options={khoroos.map(item => ({ label: item.name, value: item.id }))}
                        className="w-full"
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-3 grid-cols-2 gap-6 mt-4">
                    {advertisements.map(blog => (
                      <BlogItem blog={blog} key={blog.id} />
                    ))}
                  </div>
                  <PaginationComp page={router.query?.page} pageCount={router.query.pageCount} />
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
export default AdvertisementPage;
