import { AdCard, AdviceCard, Carousel, SpecialCard } from '@components/common/data-display';
import MainLayout from '@components/layouts/main';
import CategoryNav from '@components/navbar/category';
import ReferenceService from '@services/reference';
import { ApiResponse } from '@typeDefs/site';
import { classNames } from '@utils/helpers';
import { withTranslationProps } from '@utils/withTranslationProps';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import React, { Fragment, useEffect, useState } from 'react';

const HomePage: NextPage = () => {
  const { t } = useTranslation();
  const [mainDirections, setMainDirections] = useState([]);

  useEffect(() => {
    ReferenceService.getMainDirection().then((res: ApiResponse) => {
      setMainDirections(res?.response);
    });
  }, []);
  return (
    <MainLayout>
      <CategoryNav />
      <section className="pb-2 lg:pb-2 xl:pb-4 pt-52">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8 2xl:px-0">
          <div className="flex flex-row gap-7.5 xl:gap-12.5 justify-center items-start">
            <div className="hidden md:block md:w-1/4">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white lg:p-6 py-4 px-3 shadow-md">
                {t('services')}
                {mainDirections.map((md, index: number) => {
                  return (
                    <div key={index}>
                      <div
                        className="mb-5 flex flex-row cursor-pointer"
                        onClick={() => {
                          // setOpenParentAccordion(prev =>
                          //   prev.some(pp => pp === md.id)
                          //     ? prev.filter(pp => pp !== md.id)
                          //     : [...prev, md.id]
                          // );
                          // setParentId(md.id);
                        }}
                      >
                        {/* <Image
                          src={process.env.NEXT_PUBLIC_MEDIA_URL + md.logoId}
                          alt="add"
                          className="rounded-md object-contain object-center"
                          width="0"
                          height="0"
                          sizes="100vw"
                          style={{ width: 25, height: 25 }}
                        /> */}
                        <h4
                          className={classNames(
                            '!mt-0 ml-2 self-center text-sm lg:text-lg font-semibold text-black',
                            'text-[#f7941d]'
                          )}
                        >
                          {md?.name}
                        </h4>
                      </div>
                      {/* {!openParentAccordion.includes(md.id) && (
                        <ul>
                          {md.directions.map((d: RefDirection, index: number) => (
                            <li key={index} className="mb-3">
                              <div
                                className="flex flex-row items-center justify-between cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                                onClick={() => toggleAccordion(d.id)}
                              >
                                <span className="lg:text-base text-sm text-[#646669]">
                                  {d.name}
                                </span>
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
                                      <div className="lg:text-sm text-xs transition-all duration-300 ease-out !text-black hover:!text-yellow-400">
                                        {sub.name}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )} */}

                      {/* <Divider className="my-4" /> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full max-w-[920px] md:w-3/4">
              <Fragment>
                <div className="mb-4 w-full overflow-hidden">
                  <div className="custom-slider-container relative w-full rounded-xl">
                    <Carousel />
                  </div>
                </div>
                <SpecialCard />
                <AdviceCard />
                <AdCard />
                {/* <Feature />
                  <GridCategory /> */}
              </Fragment>
              {/* {mainDirections.length == 0 ? <BlogItemSkeleton /> : <Blog />} */}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export const getStaticProps = withTranslationProps();
export default HomePage;
