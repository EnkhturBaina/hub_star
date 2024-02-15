"use client";
import Image from "next/image";
import { useState } from "react";
import SharePost from "../Blog/SharePost";
import { Button } from "@nextui-org/react";
import menuData from "./menuData";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { BsChevronRight } from "react-icons/bs";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";

const Hero = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  const properties = {
    prevArrow: <CiCircleChevLeft className="m-4 text-4xl text-white" />,
    nextArrow: <CiCircleChevRight className="m-4 text-4xl text-white" />,
  };
  const indicators = (index) => <div className="custom-home-indicator"></div>;
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-56">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/4 lg:w-[20%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <Button
                  radius="full"
                  className="mb-6 w-full bg-gradient-to-tr from-yellow-500 to-pink-500 font-bold uppercase tracking-widest text-white"
                >
                  Үйлчилгээнүүд
                </Button>
                <div className="mb-7.5 flex flex-row ">
                  <Image
                    src={"/checkmark.png"}
                    alt="add"
                    height={30}
                    width={30}
                    className="rounded-md object-contain object-center"
                  />
                  <h4 className="ml-2 text-2xl font-semibold text-black dark:text-white">
                    Categories
                  </h4>
                </div>
                <ul>
                  {menuData.map((el, index) => {
                    return (
                      <Popover placement="right" className="w-full" key={index}>
                        <PopoverTrigger>
                          <li className="mb-3 cursor-pointer transition-all duration-300 last:mb-0 hover:text-mainColor">
                            {/* hover:(bg-green-600 text-gray-50) */}
                            <div className="flex flex-row items-center justify-between">
                              <span>{el.title}</span>
                              {el.submenu ? <BsChevronRight /> : null}
                            </div>
                          </li>
                        </PopoverTrigger>

                        {el.submenu ? (
                          <PopoverContent className="w-40 min-w-max items-start p-4">
                            <ul>
                              {el.submenu?.map((sub, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="mb-3 cursor-pointer transition-all duration-300 last:mb-0 hover:text-mainColor"
                                  >
                                    {sub.title}
                                  </li>
                                );
                              })}
                            </ul>
                          </PopoverContent>
                        ) : null}
                      </Popover>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="w-full overflow-hidden">
                <div className="custom-slider-container relative aspect-[97/60] w-full rounded-xl sm:aspect-[97/44]">
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
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  Kobe Steel plant that supplied
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    Jhon Doe
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Published On: July 30, 2023
                    </span>{" "}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Category:
                    </span>
                    Events
                  </li>
                </ul>

                <div className="blog-details">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis nibh lorem. Duis sed odio lorem. In a efficitur
                    leo. Ut venenatis rhoncus quam sed condimentum. Curabitur
                    vel turpis in dolor volutpat imperdiet in ut mi. Integer non
                    volutpat nulla. Nunc elementum elit viverra, tempus quam
                    non, interdum ipsum.
                  </p>

                  <p>
                    Aenean augue ex, condimentum vel metus vitae, aliquam porta
                    elit. Quisque non metus ac orci mollis posuere. Mauris vel
                    ipsum a diam interdum ultricies sed vitae neque. Nulla
                    porttitor quam vitae pulvinar placerat. Nulla fringilla elit
                    sit amet justo feugiat sodales. Morbi eleifend, enim non
                    eleifend laoreet, odio libero lobortis lectus, non porttitor
                    sem urna sit amet metus. In sollicitudin quam est,
                    pellentesque consectetur felis fermentum vitae.
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <Image
                      src={"/images/blog/blog-01.png"}
                      width={350}
                      height={200}
                      alt="image"
                    />
                    <Image
                      src={"/images/blog/blog-02.png"}
                      width={350}
                      height={200}
                      alt="image"
                    />
                  </div>

                  <h3 className="pt-8">
                    Nunc elementum elit viverra, tempus quam non
                  </h3>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc quis nibh lorem. Duis sed odio lorem. In a efficitur
                    leo. Ut venenatis rhoncus quam sed condimentum. Curabitur
                    vel turpis in dolor volutpat imperdiet in ut mi. Integer non
                    volutpat nulla. Nunc elementum elit viverra, tempus quam
                    non, interdum ipsum.
                  </p>
                </div>

                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
