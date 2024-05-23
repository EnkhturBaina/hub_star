import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import CustomSelect from '@/components/Inputs/Select';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Address, MachineryType, MainDirection, OrderType } from '@/types/reference';
import { NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';

const BlogPage: NextPage = () => {
  const { advertisements, adMeta } = useAppContext();
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch();
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const [materials, setMaterials] = useState<MachineryType[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  const getMainDirection = useCallback(() => {
    if (advParam.mainDirectionId) {
      ReferenceService.getMainDirectionById(advParam.mainDirectionId).then(response => {
        if (response.success) {
          setMainDirection(response.response);
        }
      });
    }
  }, [advParam.mainDirectionId]);

  useEffect(() => getMainDirection(), [getMainDirection]);
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
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">{adMeta.itemCount}</span>
              </span>
              <div>
                <BreadCrumbs
                  items={[
                    mainDirection?.name,
                    mainDirection?.directions
                      .filter(item => advParam.directionIds?.includes(item.id))
                      .map(item => item.name)
                      .join(', '),
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
            <SideCheckSubDirection closeFnc={() => (visible ? setVisible(false) : undefined)} />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">
              <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0 justify-between">
                <div className={`hidden md:block md:w-1/4 lg:w-[20%]`}>
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
                  <div className="my-4 justify-between grid grid-cols-2 md:grid-cols-4 gap-4">
                    <CustomSelect
                      label={'Эрэмбэлэлт'}
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
                        { label: 'Огноогоор (Z-A)', value: 'DESC' },
                        { label: 'Огноогоор (A-Z)', value: 'ASC' },
                      ]}
                    />
                    {advParam.userType == 'SUPPLIER' && (
                      <CustomSelect
                        label={'Материалын нэрс орох'}
                        value={advParam.materialId}
                        onSelectionChange={value => {
                          onAdvParam({ ...advParam, materialId: Number(value) });
                        }}
                        options={materials.map(item => ({ label: item.name, value: item.id }))}
                      />
                    )}
                    <CustomSelect
                      label={'Аймаг, хот'}
                      value={advParam.provinceId}
                      onSelectionChange={value => {
                        onAdvParam({ ...advParam, provinceId: Number(value) });
                      }}
                      options={provinces.map(item => ({ label: item.name, value: item.id }))}
                    />
                    <CustomSelect
                      label={'Сум, дүүрэг'}
                      value={advParam.districtId}
                      onSelectionChange={value => {
                        onAdvParam({ ...advParam, districtId: Number(value) });
                      }}
                      options={districts.map(item => ({ label: item.name, value: item.id }))}
                    />
                    <CustomSelect
                      label={'Баг, хороо'}
                      value={advParam.khorooId}
                      onSelectionChange={value => {
                        onAdvParam({ ...advParam, khorooId: Number(value) });
                      }}
                      options={khoroos.map(item => ({ label: item.name, value: item.id }))}
                    />
                    {/* <Button
                      radius="full"
                      className="w-65 rounded-md bg-mainColor font-bold leading-none text-white"
                      startContent={<IoIosAddCircleOutline className="text-xl" />}
                    >
                      Онцгой үйлчилгээ оруулах
                    </Button> */}
                  </div>
                  <div className="my-4 grid grid-cols-3 gap-2"></div>
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

export default BlogPage;
