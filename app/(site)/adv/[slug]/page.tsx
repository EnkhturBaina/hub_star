'use client';
import { animals } from '@/components/Profile/Content/animals';
import { Button, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { PiFlagThin } from 'react-icons/pi';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import AdSkeleton from '@/components/Skeleton/AdSkeleton';
import { format } from 'date-fns';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { Advertisement } from '@/types/advertisement';

const SingleBlogPage = ({ params: { slug } }) => {
  const [loadingAd, setLoadingAd] = useState<boolean>(true);
  const [adData, setAdData] = useState<Advertisement>(null);

  const getAdById = () => {
    AdvertisementService.getById(slug)
      .then(response => {
        if (response.success) {
          setAdData(response.response);
          setLoadingAd(false);
        }
      })
      .catch(error => {
        console.error('Error fetching :', error);
        setLoadingAd(false);
      });
  };
  useEffect(() => {
    getAdById();
  }, []);

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        {loadingAd ? (
          <AdSkeleton />
        ) : (
          <>
            <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
              <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-7.5 py-10 md:flex-row md:py-18 lg:flex-row xl:gap-12.5">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">{adData?.title}</span>
                  <div>
                    <BreadCrumbs />
                  </div>
                </div>
                <div className="flex flex-row">
                  <Button
                    radius="full"
                    className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                  >
                    Үйлчилгээг захиалах
                  </Button>

                  <Button className="ml-4 min-w-unit-12 border-1 bg-white !px-0" radius="sm">
                    <PiFlagThin className="text-2xl" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:px-8 2xl:px-0">
              <div className="lg:w-3/4">
                <div className="animate_top">
                  <div className="mb-10 w-full overflow-hidden ">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={'/images/blog/blog-01.png'}
                        alt="Kobe Steel plant that supplied"
                        fill
                        className="rounded-md object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      />
                    </div>
                  </div>

                  <div className="blog-details">
                    <p>{adData?.desciption}</p>
                  </div>
                </div>
              </div>
              <div className="border-l px-4 md:w-1/4 lg:w-[20%]">
                <div className="flex flex-col gap-y-2">
                  <span className="font-bold">Үнэлгээ</span>
                  <div className="flex flex-row items-center">
                    <FaStar className="text-2xl text-mainColor" />
                    <FaStar className="text-2xl text-mainColor" />
                    <FaStar className="text-2xl text-mainColor" />
                    <FaStar className="text-2xl text-mainColor" />
                    <FaStar className="text-2xl text-mainColor" />
                    <span className="ml-4">8,5/10</span>
                  </div>
                  <span className="font-bold">Үнэ</span>
                  <span className="">{adData?.price} ₮</span>
                  <span className="font-bold">Нийтэлсэн огноо</span>
                  <span className="">{format(new Date(adData.createdAt), 'yyyy-MM-dd hh:m')}</span>
                  <span className="font-bold">Зарын дугаар</span>
                  <span className="">{adData?.id}</span>
                  <span className="font-bold">Утасны дугаар</span>
                  <span className="">{adData?.phone}</span>
                  <span className="font-bold">Зар байршуулсан</span>
                  <span className="">-</span>
                  <span className="font-bold">Веб хуудас</span>
                  <span className="">-</span>
                  <span className="font-bold">Имэйл</span>
                  <span className="">{adData?.email}</span>
                  <span className="font-bold">Байршил</span>
                  <span className="">{adData?.address}</span>
                  <Button
                    radius="full"
                    className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                  >
                    Профайл үзэх
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
              <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-10 lg:flex-row xl:gap-12.5">
                <div className="flex flex-col">
                  <span className="mb-4 font-bold">ТӨРӨЛ</span>
                  <div>
                    {animals.map((el, index) => {
                      return (
                        <Chip
                          key={index}
                          classNames={{
                            base: 'mr-2 mb-2 border-1 bg-white p-4',
                            content: 'font-bold',
                          }}
                        >
                          {el.label}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-4 my-14 max-w-screen-xl md:mx-auto">
              <span className="text-xl font-bold">
                Таны авсан үйлчилгээтэй холбоотой зөвлөмжүүд
              </span>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
                {[...new Array(4)].map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-1 bg-white p-8"
                    >
                      <Image
                        src="/pdf_icon.png"
                        alt={'alt' + i}
                        width={100}
                        height={80}
                        className="h-full w-12"
                      />
                      <span className="mt-2 text-center text-sm leading-none">
                        Ажил гүйцэтгэхэд мөрдөж хөтлөх бичиг баримт
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-100 px-4 md:px-8 2xl:px-0">
              <div className="mx-auto max-w-screen-xl py-10">
                <span className="text-xl font-bold">Онцгой үйлчилгээ</span>
                <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                  {/* TODO {BlogData?.splice(0, 4).map((blog, key) => <SpecialPost blog={blog} key={key} />)} */}
                </div>
                <span className="text-xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
                <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                  {/* TODO {BlogData?.splice(0, 4).map((blog, key) => <RelatedPost blog={blog} key={key} />)} */}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default SingleBlogPage;
