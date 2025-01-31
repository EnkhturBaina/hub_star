import { useAppContext } from '@/app/app-context';
import { withTranslationProps } from '@/app/lib/with-translation';
import AdviceItem from '@/components/Blog/AdviceItem';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideCheckDirection from '@/components/Common/SideCheckDirection';
import PaginationComp from '@/components/Pagination';
import { IAdviceParam } from '@/interfaces/request.interface';
import { ReferenceService } from '@/service/reference/reference.service';
import { Advice, MainDirection, PageMeta } from '@/types/reference';
import { Button, Select, SelectItem } from '@heroui/react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LuSettings2 } from 'react-icons/lu';
import { Sidebar } from 'semantic-ui-react';

/** Зөвлөмжүүд */
const AdvicePage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
  const [visible, setVisible] = useState(false);
  const sideBarRef = useRef(null);

  const getData = useCallback(async () => {
    await ReferenceService.getAdvice(params).then(res => {
      if (res.success) {
        setAdvices(res.response.data);
        setPageMeta(res.response.meta);
      }
    });
  }, [params]);

  const getMainDirection = useCallback(async () => {
    if (router.query.mainDirectionId) {
      setParams(prev => ({ ...prev, mainDirectionId: Number(router.query.mainDirectionId) }));
    }
    await ReferenceService.getMainDirectionById(Number(router.query.mainDirectionId)).then(res => {
      if (res.success) {
        setMainDirection(res.response);
      }
    });
  }, [router.query.mainDirectionId]);

  useEffect(() => {
    getMainDirection();
  }, [getMainDirection]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section className="pt-35 lg:pt-40 xl:pt-42.5">
      <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
        <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 pt-8 pb-5 lg:flex-row xl:gap-12.5 mt-20">
          <div className="flex flex-col">
            <span className="text-xl">
              {t('totalValue')}: <span className="font-bold">{pageMeta.itemCount}</span>
            </span>
            <div>
              <BreadCrumbs
                items={[
                  t('advices'),
                  mainDirection?.name,
                  mainDirection?.directions
                    .filter(item => (params.directionIds || []).includes(item.id))
                    .map(item => item.name)
                    .join(', '),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mx-auto max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
        <Sidebar
          animation="push"
          icon="labeled"
          onHide={() => setVisible(false)}
          visible={visible}
          width="wide"
          className="!bg-white pt-72 pl-4"
          ref={sideBarRef}
        >
          <SideCheckDirection
            mainDirectionId={Number(router.query.mainDirectionId)}
            onDirectionIds={directionIds => setParams(prev => ({ ...prev, directionIds }))}
          />
        </Sidebar>
        <SideCheckDirection
          className="md:block hidden"
          mainDirectionId={Number(router.query.mainDirectionId)}
          onDirectionIds={directionIds => setParams(prev => ({ ...prev, directionIds }))}
        />
        <div className="px-6 pb-6 w-full lg:w-3/4">
          <div className="my-4 flex flex-row justify-between">
            <div
              className="w-fit rounded-xl bg-white p-2 md:hidden block border-[#e4e4e7] border-2"
              onClick={() => {
                setVisible(true);
              }}
            >
              <LuSettings2 className="text-2xl" />
            </div>
            <Select
              label="Эрэмбэлэлт"
              labelPlacement="outside"
              radius="sm"
              size="md"
              variant="bordered"
              classNames={{
                base: 'w-40 !mt-0',
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
            {/* <Button
              radius="full"
              className="w-65 rounded-md bg-mainColor font-bold leading-none text-white"
              startContent={<IoIosAddCircleOutline className="text-xl" />}
            >
              Онцгой үйлчилгээ оруулах
            </Button> */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {advices.map((item, index) => (
              <AdviceItem advice={item} key={index} />
            ))}
          </div>
          <PaginationComp page={pageMeta.page} pageCount={pageMeta.pageCount} />
        </div>
      </div>
    </section>
  );
};
export const getStaticProps: GetStaticProps = withTranslationProps();
export default AdvicePage;
