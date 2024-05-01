import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckSubDirection from '@/components/Common/SideCheckSubDirection';
import PaginationComp from '@/components/Pagination';
import { IAdParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { MainDirection, OrderType } from '@/types/reference';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
const BlogPage: NextPage = () => {
  const { adParam, setAdParam, advertisements, adMeta } = useAppContext();
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const router = useRouter();

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
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
          <SideCheckSubDirection mainDirectionId={adParam.mainDirectionId} />
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

export default BlogPage;
