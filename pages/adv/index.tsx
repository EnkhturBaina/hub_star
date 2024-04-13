import { useAppContext } from '@/app/app-context';
import BlogItem from '@/components/Blog/BlogItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import PaginationComp from '@/components/Pagination';
import LeftFilter from '@/components/Skeleton/LeftFilter';
import { IAdParam } from '@/interfaces/request.interface';
import { Direction, MainDirection, SubDirection } from '@/types/reference';
import { Button, Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
const BlogPage: NextPage = () => {
  const { mainDirections, adParam, setAdParam, advertisements, adMeta } = useAppContext();
  const [mainDirection, setMainDirection] = useState<MainDirection>();
  const router = useRouter();
  const onChangeValue = (value: string[]) => {
    const directions = mainDirection.directions.filter(item => {
      return item.subDirections.some(subdir => value.includes(String(subdir.id)));
    });
    setAdParam(prevState => ({
      ...prevState,
      page: 1,
      limit: 10,
      directionIds: directions.map(item => item.id),
      subDirectionIds: value.map(item => Number(item)),
    }));
  };
  useEffect(() => {
    const param: IAdParam = { order: 'DESC', page: 1, limit: 10, categoryId: adParam.categoryId };
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
  }, [router.query]);
  useEffect(() => {
    setMainDirection(mainDirections.find(item => adParam.mainDirectionId === item.id));
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
          <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-row items-center justify-center">
                <LuSettings2 className="text-xl" />
                <span className="ml-3 font-bold">Шүүлтүүр</span>
              </div>
              <LuChevronLeft className="text-2xl" />
            </div>
            {!mainDirection ? (
              <LeftFilter />
            ) : (
              mainDirection.directions.map((direction: Direction, index: number) => {
                return (
                  <CheckboxGroup
                    label={direction.name}
                    color="warning"
                    key={index}
                    // value={adParam.subDirectionIds?.map(item => item.toString())}
                    classNames={{
                      base: 'my-4',
                      label: 'font-bold text-black text-base',
                    }}
                    onValueChange={onChangeValue}
                  >
                    {direction.subDirections.map((subDir: SubDirection, index: number) => {
                      return (
                        <Checkbox
                          value={String(subDir.id)}
                          classNames={{
                            base: 'w-full max-w-full',
                            label: 'w-full',
                            wrapper: 'custom-checkbox w-6 h-6',
                          }}
                          key={index}
                        >
                          <div className="flex w-full flex-row items-center justify-between">
                            <span className="text-sm leading-none">{subDir.name}</span>
                            {/* TODO adv count <span className="text-sm">{subDir.}</span> */}
                          </div>
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                );
              })
            )}
          </div>
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

export default BlogPage;
