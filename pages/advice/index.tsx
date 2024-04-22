import { useAppContext } from '@/app/app-context';
import AdviceItem from '@/components/Blog/AdviceItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckDirection from '@/components/Common/SideCheckDirection';
import PaginationComp from '@/components/Pagination';
import { IAdParam, IAdviceParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Advice, MainDirection, PageMeta } from '@/types/reference';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

/** Зөвлөмжүүд */
const AdvicePage: NextPage = () => {
  const router = useRouter();
  const { mainDirections } = useAppContext();
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [params, setParams] = useState<IAdviceParam>({ page: 1, limit: 10, order: 'DESC' });
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    pageCount: 1,
  });
  const [mainDirection, setMainDirection] = useState<MainDirection>();

  const getData = useCallback(async () => {
    await ReferenceService.getAdvice(params).then(res => {
      if (res.success) {
        setAdvices(res.response.data);
        setPageMeta(res.response.meta);
      }
    });
  }, [params]);

  useEffect(() => {
    if (router.query.mainDirectionId) {
      setParams(prev => ({ ...prev, mainDirectionId: Number(router.query.mainDirectionId) }));
      setMainDirection(
        mainDirections.find(item => Number(router.query.mainDirectionId) === item.id)
      );
    }
  }, [router.query]);

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
          <SideCheckDirection
            mainDirection={mainDirection}
            onDirectionIds={directionIds => setParams(prev => ({ ...prev, directionIds }))}
          />
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
                  setParams(prev => ({
                    ...prev,
                    order: e.target.value == 'ASC' ? 'ASC' : 'DESC',
                  }));
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
            <div className="grid grid-cols-4 gap-6">
              {advices.map((item, index) => (
                <AdviceItem advice={item} key={index} />
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
