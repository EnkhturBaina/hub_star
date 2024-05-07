import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import CustomSelect from '@/components/Inputs/Select';
import PaginationComp from '@/components/Pagination';
import { IAdParam, IMachineryParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Address, MachineryType, MainDirection, OrderType } from '@/types/reference';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { SidebarPusher, SidebarPushable, Segment, Sidebar } from 'semantic-ui-react';
import { LuSettings2 } from 'react-icons/lu';

const BlogPage: NextPage = () => {
  const { adParam, setAdParam, advertisements, adMeta } = useAppContext();
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const [materials, setMaterials] = useState<MachineryType[]>([]);
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [khoroos, setKhoroos] = useState<Address[]>([]);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  const getParam = useCallback(async () => {
    const param: IAdParam = {
      order: 'DESC',
      page: 1,
      limit: 10,
      userType: adParam.userType,
      process: 'CREATED',
    };
    if (
      isNaN(Number(router.query.mainDirectionId)) ||
      isNaN(Number(router.query.directionId)) ||
      isNaN(Number(router.query.subDirectionId))
    ) {
      router.push('/');
    }
    if (router.query.mainDirectionId) {
      param.mainDirectionId = Number(router.query.mainDirectionId);
    }
    if (router.query.directionId) {
      param.directionIds = [Number(router.query.directionId)];
    }
    if (router.query.subDirectionId) {
      param.subDirectionIds = [Number(router.query.subDirectionId)];
    }
    setAdParam(param);
    await ReferenceService.getMainDirectionById(param.mainDirectionId).then(res => {
      if (res.success) {
        setMainDirection(res.response);
      }
    });
  }, [router.query.mainDirectionId, router.query.directionId, router.query.subDirectionId]);

  useEffect(() => {
    getParam();
  }, [getParam]);

  const getMachinery = useCallback(() => {
    if (adParam.userType == 'SUPPLIER') {
      ReferenceService.getMachinery({ type: 'MATERIAL' }).then(response => {
        if (response.success) {
          setMaterials(response.response);
        }
      });
    }
  }, [adParam.userType]);

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
    ReferenceService.getAddress({ type: 'DISTRICT', parentId: adParam.provinceId }).then(
      response => {
        if (response.success) {
          setDistricts(response.response);
        }
      }
    );
  }, [adParam.provinceId]);

  useEffect(() => {
    getDistrict();
  }, [getDistrict]);

  const getKhoroo = useCallback(() => {
    ReferenceService.getAddress({ type: 'KHOROO', parentId: adParam.districtId }).then(response => {
      if (response.success) {
        setKhoroos(response.response);
      }
    });
  }, [adParam.districtId]);

  useEffect(() => {
    getKhoroo();
  }, [getKhoroo]);

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
                      .filter(item => adParam.directionIds.includes(item.id))
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
            <SideCheckSubDirection
              specialService={adParam.specialService}
              closeFnc={() => (visible ? setVisible(false) : undefined)}
            />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">
              <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0 justify-between">
                <div className={`hidden md:block md:w-1/4 lg:w-[20%]`}>
                  <SideCheckSubDirection mainDirectionId={adParam.mainDirectionId} />
                </div>
                <div className="pb-6 md:w-3/4">
                  <div className="my-4 flex flex-row justify-between">
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
                    {/* <Button
                      radius="full"
                      className="w-65 rounded-md bg-mainColor font-bold leading-none text-white"
                      startContent={<IoIosAddCircleOutline className="text-xl" />}
                    >
                      Онцгой үйлчилгээ оруулах
                    </Button> */}
                  </div>
                  <div className="my-4 grid grid-cols-3 gap-2">
                    {adParam.userType == 'SUPPLIER' && (
                      <CustomSelect
                        label={'Материалын нэрс орох'}
                        value={adParam.materialId}
                        onSelectionChange={value => {
                          setAdParam({ ...adParam, materialId: Number(value) });
                        }}
                        options={materials.map(item => ({ label: item.name, value: item.id }))}
                      />
                    )}
                    <CustomSelect
                      label={'Аймаг, хот'}
                      value={adParam.provinceId}
                      onSelectionChange={value => {
                        setAdParam({ ...adParam, provinceId: Number(value) });
                      }}
                      options={provinces.map(item => ({ label: item.name, value: item.id }))}
                    />
                    <CustomSelect
                      label={'Сум, дүүрэг'}
                      value={adParam.districtId}
                      onSelectionChange={value => {
                        setAdParam({ ...adParam, districtId: Number(value) });
                      }}
                      options={districts.map(item => ({ label: item.name, value: item.id }))}
                    />
                    <CustomSelect
                      label={'Баг, хороо'}
                      value={adParam.khorooId}
                      onSelectionChange={value => {
                        setAdParam({ ...adParam, khorooId: Number(value) });
                      }}
                      options={khoroos.map(item => ({ label: item.name, value: item.id }))}
                    />
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

export default BlogPage;
