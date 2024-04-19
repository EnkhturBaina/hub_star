import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckDirection from '@/components/Common/SideCheckDirection';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { api } from '@/service/api.service';
import { ReferenceService } from '@/service/reference/reference.service';
import { Advice, MainDirection, PageMeta } from '@/types/reference';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

/** Зөвлөмжүүд */
const AdvicePage: NextPage = () => {
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    pageCount: 1,
  });
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const router = useRouter();
  const getData = useCallback(async () => {
    await ReferenceService.getAdvice({
      mainDirectionId: Number(router.query.mainDirectionId),
      order: 'DESC',
      page: 1,
      limit: 10,
    }).then(res => {
      if (res.success) {
        setAdvices(res.response.data);
        setPageMeta(res.response.meta);
      }
    });
    await ReferenceService.getMainDirectionById(Number(router.query.mainDirectionId)).then((res) => {
      if (res.success) {
        setMainDirection(res.response);
      }
    });
  }, [router.query.mainDirectionId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">{}</span>
              </span>
              <div>
                <BreadCrumbs />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
          <SideCheckDirection mainDirection={mainDirection} />
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
              {advices.map((item, index) => (
                <BlogItem blog={item} key={index} />
              ))}
            </div>
            <PaginationComp page={pageMeta.page} pageCount={pageMeta.pageCount} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvicePage;
