// 'use client';
import Image from 'next/image';
import { Button, Divider, Skeleton } from '@nextui-org/react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { BsChevronRight, BsPlus } from 'react-icons/bs';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { CiCircleChevRight, CiCircleChevLeft } from 'react-icons/ci';
import Feature from '../Features';
import Blog from '../Blog';
import GridCategory from '../GridCategory';
import PaginationComp from '../Pagination';
import LeftDirections from '../Skeleton/LeftDirections';
import BlogItemSkeleton from '../Skeleton/BlogItemSkeleton';
import { useAppContext } from '@/app/app-context';
import { RefDirection, MainDirection, RefNews, SubDirection } from '@/types/reference';
import { Popup } from 'semantic-ui-react';
import { Fragment, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';
import { useRouter } from 'next/router';
import Title from '../Common/Title';
import { setAdvParam } from '@/app/lib/features/adv-param';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/lib/store';
import { useTypedSelector } from '@/app/lib/reducer';
import { useTranslation } from 'react-i18next';
import { BiMinus } from 'react-icons/bi';

const Hero = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { mainDirections } = useAppContext();
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch<AppDispatch>();
  const [news, setNews] = useState<RefNews[]>([]);

  const [openParentAccordion, setOpenParentAccordion] = useState<any[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number>(undefined);
  const [parentId, setParentId] = useState<number>(undefined);

  const getNews = () => {
    ReferenceService.getNews().then(res => {
      if (res.success) {
        setNews(res.response);
      }
    });
  };

  const properties = {
    prevArrow: <CiCircleChevLeft className="m-4 text-6xl text-mainColor" />,
    nextArrow: <CiCircleChevRight className="m-4 text-6xl text-mainColor" />,
  };

  const indicators = index => <div className="custom-home-indicator"></div>;

  useEffect(() => {
    getNews();
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      <section className="pb-2 pt-45 md:pt-30 lg:pb-2 lg:pt-35 xl:pb-4 xl:pt-52">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-0">
          <div className="flex flex-row gap-7.5 xl:gap-12.5">
            <div className="hidden md:block md:w-1/4">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-6 shadow-md">
                <Title label={t('services')} />
                {mainDirections.length == 0 ? (
                  <LeftDirections />
                ) : (
                  mainDirections.map((md: MainDirection, index: number) => {
                    return (
                      <div key={index}>
                        <div
                          className="mb-5 flex flex-row cursor-pointer"
                          onClick={() => {
                            setOpenParentAccordion(prev =>
                              prev.some(pp => pp === md.id)
                                ? prev.filter(pp => pp !== md.id)
                                : [...prev, md.id]
                            );
                            setParentId(md.id);
                          }}
                        >
                          <Image
                            src={process.env.NEXT_PUBLIC_MEDIA_URL + md.logoId}
                            alt="add"
                            className="rounded-md object-contain object-center"
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: 25, height: 25 }}
                          />
                          <h4
                            className={`!mt-0 ml-2 self-center text-lg font-semibold text-black ${!openParentAccordion.includes(md.id) && 'text-[#f7941d]'}`}
                          >
                            {md?.name}
                          </h4>
                        </div>
                        {/* <ul>
                          {md.directions.map((d: RefDirection, index: number) => {
                            return (
                              <Popup
                                key={index}
                                on={'click'}
                                disabled={d.subDirections.length <= 0}
                                content={
                                  d.subDirections.length !== 0 && (
                                    <div className="w-40 min-w-max items-start p-4">
                                      <ul>
                                        {d.subDirections?.map(
                                          (sub: SubDirection, index: number) => {
                                            return (
                                              <li
                                                key={index}
                                                className="mb-3 cursor-pointer !text-black transition-all duration-300 last:mb-0 hover:text-mainColor max-w-96"
                                              >
                                                <div
                                                  onClick={() => {
                                                    dispatch(
                                                      setAdvParam({
                                                        mainDirectionIds: [md.id],
                                                        directionIds: [d.id],
                                                        subDirectionIds: [sub.id],
                                                        order: 'DESC',
                                                        page: 1,
                                                        limit: 10,
                                                      })
                                                    );
                                                    router.push('/adv');
                                                  }}
                                                  className="!text-black"
                                                >
                                                  {sub.name}
                                                </div>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )
                                }
                                onOpen={() => {
                                  setOpenPopover({
                                    ...openPopover,
                                    [d.id]: true,
                                  });
                                }}
                                onClose={() => {
                                  setOpenPopover({
                                    ...openPopover,
                                    [d.id]: false,
                                  });
                                }}
                                open={openPopover[d.id]}
                                position="right center"
                                trigger={
                                  <li className="mb-3 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor">
                                    <div className="flex flex-row items-center justify-between">
                                      <span className="text-sm font-medium text-[#646669]">
                                        {d.name}
                                      </span>
                                      {d.subDirections.length > 0 && <BsChevronRight />}
                                    </div>
                                  </li>
                                }
                              />
                            );
                          })}
                        </ul> */}
                        {!openParentAccordion.includes(md.id) && (
                          <ul>
                            {md.directions.map((d: RefDirection, index: number) => (
                              <li key={index} className="mb-3">
                                <div
                                  className="flex flex-row items-center justify-between cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                                  onClick={() => toggleAccordion(d.id)}
                                >
                                  <span className="text-base text-[#646669]">{d.name}</span>
                                  {d.subDirections.length > 0 && openAccordion === d.id ? (
                                    <BiMinus />
                                  ) : (
                                    <BsPlus />
                                  )}
                                </div>
                                {openAccordion === d.id && (
                                  <ul className="w-full items-start py-4">
                                    {d.subDirections.map((sub: SubDirection, subIndex: number) => (
                                      <li
                                        key={subIndex}
                                        className="flex gap-2 items-start text-justify text-sm mb-3 cursor-pointer !text-black transition-all duration-300 last:mb-0 hover:text-mainColor"
                                        onClick={() => {
                                          dispatch(
                                            setAdvParam({
                                              mainDirectionIds: [md.id],
                                              directionIds: [d.id],
                                              subDirectionIds: [sub.id],
                                              order: 'DESC',
                                              page: 1,
                                              limit: 10,
                                            })
                                          );
                                          router.push('/adv');
                                        }}
                                      >
                                        <span className="text-red-500">*</span>
                                        <div className="transition-all duration-300 ease-out !text-black hover:!text-yellow-400">
                                          {sub.name}
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}

                        <Divider className="my-4" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="w-full max-w-[920px] md:w-3/4">
              {!advParam.userType && (
                <Fragment>
                  <div className="mb-4 w-full overflow-hidden">
                    <div className="custom-slider-container relative w-full rounded-xl">
                      {news ? (
                        <Fade
                          {...properties}
                          transitionDuration={500}
                          easing="ease"
                          indicators={indicators}
                          autoplay={true}
                        >
                          {news?.map((el: RefNews, index: number) => {
                            return (
                              <div
                                className="each-slide-effect rounded-xl cursor-pointer"
                                key={index}
                                onClick={() => {
                                  router.push({
                                    pathname: '/news/' + el.id,
                                  });
                                }}
                              >
                                <div
                                  style={{
                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA_URL + el.imageId})`,
                                    backgroundSize: '100% 100%',
                                  }}
                                ></div>
                              </div>
                            );
                          })}
                        </Fade>
                      ) : null}
                    </div>
                  </div>
                  <Feature />
                  <GridCategory />
                </Fragment>
              )}
              {mainDirections.length == 0 ? <BlogItemSkeleton /> : <Blog />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
