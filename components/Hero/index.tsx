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
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/context/MainContext";
import LeftDirections from "../Skeleton/LeftDirections";
import axiosClient from "@/services/axiosInstance";
import BlogItemSkeleton from "../Skeleton/BlogItemSkeleton";

const Hero = () => {
  const client = axiosClient();
  const state = useContext(MainContext);

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

  useEffect(() => {
    state?.getAds();
  }, []);

  return (
    <>
      <section className="pb-2 pt-35 lg:pb-2 lg:pt-45 xl:pb-4 xl:pt-56">
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
                {state?.directionLoading ? (
                  <LeftDirections />
                ) : (
                  state?.mainDirection &&
                  state?.mainDirection?.map((md: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className="mb-5 flex flex-row">
                          <Image
                            src={process.env.IMG_PATH + md?.logo?.path}
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
                          {md?.children?.map((d: any, index: number) => {
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
                                      {d.sub_children?.length !== 0 ? (
                                        <BsChevronRight />
                                      ) : null}
                                    </div>
                                  </li>
                                </PopoverTrigger>
                                {d.sub_children?.length !== 0 ? (
                                  <PopoverContent className="w-40 min-w-max items-start p-4">
                                    <ul>
                                      {d.sub_children?.map(
                                        (sub: any, index: number) => {
                                          return (
                                            <li
                                              key={index}
                                              className="mb-3 cursor-pointer transition-all duration-300 last:mb-0 hover:text-mainColor"
                                            >
                                              {sub.name}
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </PopoverContent>
                                ) : null}
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

            <div className="w-3/4">
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
                  radius="full"
                  className="h-8 w-50 bg-gradient-to-r from-blue-500 to-blue-900 font-bold uppercase leading-none tracking-wide text-white"
                >
                  Онцгой үйлчилгээ
                </Button>
              </div>
              <Feature />
              <GridCategory />
              {state?.directionLoading ? <BlogItemSkeleton /> : <Blog />}
              {/* <Blog /> */}
              <PaginationComp />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
