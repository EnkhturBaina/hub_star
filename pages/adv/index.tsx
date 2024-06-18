import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import CustomSelect from '@/components/Inputs/Select';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Address, MachineryType, MainDirection, OrderType, RefDirection } from '@/types/reference';
import { GetStaticProps, NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import UserTabData from '@/app/data/UserTabData';
import { withTranslationProps } from '@/app/lib/with-translation';
import { useTranslation } from 'react-i18next';

const BlogPage: NextPage = () => {
  const { t } = useTranslation();
  const { advertisements, adMeta } = useAppContext();
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState<MachineryType[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);
  const [userTypeName, setUserTypeName] = useState<string>('');
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [directions, setDirections] = useState<RefDirection[]>([]);
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

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

  const onAdvParam = (param: IAdParam) => {
    dispatch(setAdvParam(param));
  };

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-46">
        <div className="mb-1 bg-gray-100 py-2 flex justify-center">
          <div className="max-w-screen-xl w-full">
            <BreadCrumbs
              items={[
                userTypeName,
                mainDirections.map(item => item.name).join(', '),
                directions.map(item => item.name).join(', '),
              ]}
            />
          </div>
        </div>
        {/* <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-6 lg:flex-row xl:gap-12.5">
            <div className="w-full flex flex-col">
              <span className="text-xl">
                {t('totalValue')}: <span className="font-bold">{adMeta.itemCount}</span>
              </span>
              <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <CustomSelect
                  label={'Эрэмбэлэх'}
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
                  className="max-w-[240px]"
                />
                {advParam.userType == 'SUPPLIER' && (
                  <CustomSelect
                    label={'Бараа материалын төрөл'}
                    value={advParam.materialId}
                    onSelectionChange={value => {
                      onAdvParam({ ...advParam, materialId: Number(value) });
                    }}
                    options={materials.map(item => ({ label: item.name, value: item.id }))}
                    className="max-w-[240px]"
                  />
                )}
                <CustomSelect
                  label={'Аймаг, хот'}
                  value={advParam.provinceId}
                  onSelectionChange={value => {
                    onAdvParam({ ...advParam, provinceId: Number(value) });
                  }}
                  options={provinces.map(item => ({ label: item.name, value: item.id }))}
                  className="max-w-[240px]"
                />
                <CustomSelect
                  label={'Сум, дүүрэг'}
                  value={advParam.districtId}
                  onSelectionChange={value => {
                    onAdvParam({ ...advParam, districtId: Number(value) });
                  }}
                  options={districts.map(item => ({ label: item.name, value: item.id }))}
                  className="max-w-[240px]"
                />
                <CustomSelect
                  label={'Баг, хороо'}
                  value={advParam.khorooId}
                  onSelectionChange={value => {
                    onAdvParam({ ...advParam, khorooId: Number(value) });
                  }}
                  options={khoroos.map(item => ({ label: item.name, value: item.id }))}
                  className="max-w-[240px]"
                />
              </div>
            </div>
          </div>
        </div> */}
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-2xl w-[80%] flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6  lg:flex-row"
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
                <div className={`hidden md:block w-fit min-w-[340px] max-w-[340px]`}>
                  <SideCheckSubDirection />
                </div>
                <div className="pb-6 md:w-3/4">
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
                  {/* <div className="my-4 grid grid-cols-3 gap-2"></div> */}
                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-xl">
                        {t('services')} |{' '}
                        <span className="!font-semibold">
                          {adMeta.itemCount + ' ' + t('service').toLowerCase()}
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
                        className="max-w-[240px] !outline-none"
                        size="sm"
                      />
                    </div>
                    <div className="w-full my-4 flex gap-4 justify-between">
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
                          className="max-w-[240px]"
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
                        className="max-w-[240px]"
                        size="sm"
                      />
                      <CustomSelect
                        label={'Сум, дүүрэг'}
                        value={advParam.districtId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, districtId: Number(value) });
                        }}
                        options={districts.map(item => ({ label: item.name, value: item.id }))}
                        className="max-w-[240px]"
                        size="sm"
                      />
                      <CustomSelect
                        label={'Баг, хороо'}
                        value={advParam.khorooId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, khorooId: Number(value) });
                        }}
                        options={khoroos.map(item => ({ label: item.name, value: item.id }))}
                        className="max-w-[240px]"
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mt-4">
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
export const getStaticProps: GetStaticProps = withTranslationProps();
export default BlogPage;
