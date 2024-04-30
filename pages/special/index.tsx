import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckDirection from '@/components/Common/SideCheckDirection';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { MainDirection } from '@/types/reference';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
const SpecialService: NextPage = () => {
  const { mainDirections, adParam, setAdParam, advertisements, adMeta } = useAppContext();
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const router = useRouter();

  useEffect(() => {
    const param: IAdParam = {
      order: 'DESC',
      page: 1,
      limit: 10,
      process: 'CREATED',
    };
    if (router.query.specialServiceType) {
      param.specialService = router.query.specialServiceType;
    }
    setAdParam(param);
  }, [router.query]);

  useEffect(() => {
    // setMainDirection(mainDirections.find(item => adParam.mainDirectionId === item.id));
  }, [mainDirections, adParam.mainDirectionId]);

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
                <BreadCrumbs />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
          <SideCheckSubDirection mainDirection={mainDirection} />
          <div className="px-6 pb-6 lg:w-3/4">
            <div className="my-4 flex flex-row justify-between">
              <Select
                label="Эрэмбэлэлт"
                labelPlacement="outside"
                radius="sm"
                size="md"
                variant="bordered"
                classNames={{
                  base: 'w-50',
                  label: 'font-bold',
                  trigger: 'custom-select-trigger bg-white',
                }}
                value="DESC"
                onChange={e => {
                  if (e.target.value == ('ASC' || 'DESC')) {
                    // setAdParam({
                    //   order: e.target.value,
                    //   page: 1,
                    //   limit: 10,
                    //   categoryId: adParam.categoryId,
                    //   mainDirectionId: adParam.mainDirectionId,
                    //   directionIds: adParam.directionIds,
                    //   subDirectionIds: adParam.subDirectionIds,
                    // });
                  }
                }}
              >
                <SelectItem key="DESC">Огноогоор (Z-A)</SelectItem>
                <SelectItem key="ASC">Огноогоор (A-Z)</SelectItem>
              </Select>
              <Button
                radius="full"
                className="w-65 rounded-md bg-mainColor font-bold leading-none text-white"
                startContent={<IoIosAddCircleOutline className="text-xl" />}
              >
                Онцгой үйлчилгээ оруулах
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {advertisements.map((blog, key) => (
                <BlogItem blog={blog} key={key} />
              ))}
            </div>
            <PaginationComp page={adMeta.page} pageCount={adMeta.pageCount} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialService;
