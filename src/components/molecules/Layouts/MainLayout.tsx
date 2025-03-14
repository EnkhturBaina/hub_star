import React, { useEffect, useState } from 'react';
import LanguageSwitcher from '@components/atoms/LanguageSwitcher';
import LoadingProvider from '@components/atoms/Loading';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import Title from '@components/atoms/Title';
import Image from 'next/image';
import classNames from '@utils/classNames';
import ReferenceService from '@services/reference';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import LeftDirections from '../Skeleton/LeftDirections';
import { MainDirection, RefDirection, SubDirection } from '@typeDefs/reference';
import Link from 'next/link';
import { Divider } from '@heroui/react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const t = useTranslations();
  const [branches, setBranches] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [mainDirections, setMainDirections] = useState([]);
  const [openParentAccordion, setOpenParentAccordion] = useState<any[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number>(undefined);
  const [choosedBranchId, setChoosedBranchId] = useState(0);

  useEffect(() => {
    const loadBranch = async () => {
      try {
        const result = await ReferenceService.getAllBranch();
        if (result.success) {
          setBranches(result.response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const loadMainDirection = async () => {
      try {
        const result = await ReferenceService.getMainDirection({
          lang: router.locale,
        });
        if (result.success) {
          setMainDirections(result.response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadBranch();
    loadMainDirection();
  }, []);

  useEffect(() => {
    const loadPartnership = async () => {
      const result = await ReferenceService.getAllPartnership(choosedBranchId);
      if (result.success) {
        setPartnerships(result.response);
      }
    };
    loadPartnership();
  }, [choosedBranchId]);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  return (
    <>
      <Header />
      <section className="pb-2 lg:pb-2 xl:pb-4 pt-52">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8 2xl:px-0">
          <div className="flex flex-row gap-7.5 xl:gap-12.5 justify-center items-start">
            <div className="hidden md:block md:w-1/4">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white lg:p-6 py-4 px-3 shadow-md">
                <Title label={t('services')} />
                <div className="mb-5 flex flex-row cursor-pointer">
                  <Image
                    src="/images/icon/branch.svg"
                    alt="add"
                    className="rounded-md object-contain object-center"
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: 30, height: 30 }}
                  />
                  <h4
                    className={classNames(
                      '!mt-0 ml-2 self-center text-sm lg:text-lg font-semibold text-black'
                    )}
                  >
                    Салбарын байгууллагууд
                  </h4>
                </div>
                <ul>
                  {branches.map((branch: any, index: number) => (
                    <li key={index} className="mb-3">
                      <div
                        className="flex flex-row items-center justify-between cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor"
                        onClick={() =>
                          branch.id == choosedBranchId
                            ? setChoosedBranchId(0)
                            : setChoosedBranchId(branch?.id)
                        }
                      >
                        <span className="lg:text-base text-sm text-[#646669]">{branch.name}</span>
                        {choosedBranchId === branch.id ? <BiMinus /> : <BsPlus />}
                      </div>
                      {choosedBranchId === branch.id && (
                        <ul className="w-full items-start py-4">
                          {partnerships.map((partnership: any, j: number) => (
                            <li
                              key={j}
                              className="flex gap-2 items-start text-justify text-sm mb-3 cursor-pointer !text-black transition-all duration-300 last:mb-0 hover:text-mainColor"
                              onClick={() => {
                                router.push({
                                  pathname: '/partnership',
                                  query: {
                                    choosedId: partnership?.id,
                                  },
                                });
                              }}
                            >
                              <span className="text-red-500">*</span>
                              <div className="lg:text-sm text-xs transition-all duration-300 ease-out !text-black hover:!text-yellow-400">
                                {partnership?.name}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
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
                            className={`!mt-0 ml-2 self-center text-sm lg:text-lg font-semibold text-black ${!openParentAccordion.includes(md.id) && 'text-[#f7941d]'}`}
                          >
                            {md?.name}
                          </h4>
                        </div>
                        {!openParentAccordion.includes(md.id) && (
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
                                      <li key={subIndex} className="">
                                        <Link
                                          className="flex gap-2 items-start text-justify text-sm mb-3 cursor-pointer !text-black transition-all duration-300 last:mb-0 hover:text-mainColor"
                                          href={{
                                            query: {
                                              mainDirectionIds: [md.id],
                                              directionIds: [d.id],
                                              subDirectionIds: [sub.id],
                                            },
                                          }}
                                        >
                                          <span className="text-red-500">*</span>
                                          <div className="lg:text-sm text-xs transition-all duration-300 ease-out !text-black hover:!text-yellow-400">
                                            {sub.name}
                                          </div>
                                        </Link>
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

            <div className="w-full max-w-[920px] md:w-3/4">{children}</div>
          </div>
        </div>
      </section>
      <LanguageSwitcher />
      <Footer />
      <ScrollToTop />
    </>
  );
};
export default MainLayout;
