"use client";
import Image from "next/image";
import { Button, Divider, Skeleton } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { BsChevronRight } from "react-icons/bs";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import Feature from "../Features";
import Blog from "../Blog";
import GridCategory from "../GridCategory";
import PaginationComp from "../Pagination";
import LeftDirections from "../Skeleton/LeftDirections";
import BlogItemSkeleton from "../Skeleton/BlogItemSkeleton";
import { useAppContext } from "@/utils/context/app-context";
import { Direction, MainDirection, SubDirection } from "@/types/reference";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { setAdParam } from "@/utils/redux/slice/ad-param";
import { useRouter } from "next/navigation";
import { useTypedSelector } from "@/utils/redux/reducer";

const Hero = () => {
  const { mainDirections } = useAppContext();
  const { adParam } = useTypedSelector((state) => state);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  const properties = {
    prevArrow: <CiCircleChevLeft className="m-4 text-6xl text-white" />,
    nextArrow: <CiCircleChevRight className="m-4 text-6xl text-white" />,
  };
  const indicators = (index) => <div className="custom-home-indicator"></div>;
  const getAds = (
    mainDirectionId: number,
    directionId: number,
    subDirectionId: number,
  ) => {
    dispatch(
      setAdParam({
        categoryId: adParam.categoryId,
        mainDirectionId: mainDirectionId,
        directionIds: [directionId],
        subDirectionIds: [subDirectionId],
        order: "DESC",
        page: 1,
        limit: 10,
      }),
    );
    router.push("/adv");
  };

  return (
    <>
      <section className="pb-2 pt-45 md:pt-30 lg:pb-2 lg:pt-35 xl:pb-4 xl:pt-45">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0">
          <div className="flex flex-row gap-7.5 xl:gap-12.5">
            <div className="hidden md:block md:w-1/4">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-6 shadow-md">
                <Button
                  radius="full"
                  className="mb-6 h-8 w-full bg-gradient-to-tr from-yellow-500 to-pink-500 font-bold uppercase leading-none tracking-widest text-white !opacity-100"
                  isDisabled
                >
                  Үйлчилгээнүүд
                </Button>
                {mainDirections.length == 0 ? (
                  <LeftDirections />
                ) : (
                  mainDirections.map((md: MainDirection, index: number) => {
                    return (
                      <div key={index}>
                        <div className="mb-5 flex flex-row">
                          <Image
                            src={process.env.IMG_PATH + md.logo}
                            alt="add"
                            height={25}
                            width={25}
                            className="rounded-md object-contain object-center"
                          />
                          <h4 className="!mt-0 ml-2 self-center text-lg font-semibold text-black">
                            {md?.name}
                          </h4>
                        </div>
                        <ul>
                          {md.directions.map((d: Direction, index: number) => {
                            return (
                              <Popover
                                placement="right"
                                className="w-full"
                                key={index}
                              >
                                <PopoverTrigger>
                                  <li className="mb-3 !scale-100 cursor-pointer !opacity-100 transition-all duration-300 last:mb-0 hover:text-mainColor">
                                    <div className="flex flex-row items-center justify-between">
                                      <span className="text-sm">{d.name}</span>
                                      {d.subDirections.length > 0 && (
                                        <BsChevronRight />
                                      )}
                                    </div>
                                  </li>
                                </PopoverTrigger>
                                {d.subDirections.length !== 0 && (
                                  <PopoverContent className="w-40 min-w-max items-start p-4">
                                    <ul>
                                      {d.subDirections?.map(
                                        (sub: SubDirection, index: number) => {
                                          return (
                                            <li
                                              key={index}
                                              className="mb-3 cursor-pointer text-black transition-all duration-300 last:mb-0 hover:text-mainColor"
                                              onClick={() =>
                                                getAds(md.id, d.id, sub.id)
                                              }
                                            >
                                              {sub.name}
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </PopoverContent>
                                )}
                              </Popover>
                            );
                          })}
                        </ul>
                        <Divider className="my-4" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="mb-4 w-full overflow-hidden">
                <div className="custom-slider-container relative w-full rounded-xl">
                  <Fade
                    {...properties}
                    transitionDuration={500}
                    easing="ease"
                    indicators={indicators}
                    autoplay={false}
                  >
                    <div className="each-slide-effect rounded-xl">
                      <div
                        style={{
                          backgroundImage: `url(${images[0]})`,
                          backgroundSize: "100% 100%",
                        }}
                      ></div>
                    </div>
                    <div className="each-slide-effect rounded-xl">
                      <div
                        style={{
                          backgroundImage: `url(${images[1]})`,
                          backgroundSize: "100% 100%",
                        }}
                      ></div>
                    </div>
                    <div className="each-slide-effect rounded-xl">
                      <div
                        style={{
                          backgroundImage: `url(${images[2]})`,
                          backgroundSize: "100% 100%",
                        }}
                      ></div>
                    </div>
                  </Fade>
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <Button
                  isDisabled
                  radius="full"
                  className="h-8 w-50 bg-gradient-to-r from-blue-500 to-blue-900 font-bold uppercase leading-none tracking-wide text-white !opacity-100"
                >
                  Онцгой үйлчилгээ
                </Button>
              </div>
              <Feature />
              <GridCategory />
              {mainDirections.length == 0 ? <BlogItemSkeleton /> : <Blog />}
              {/* <Blog /> */}
              <PaginationComp page={0} pageCount={0} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
