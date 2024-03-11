"use client";
import RelatedPost from "@/components/Blog/RelatedPost";
import SpecialPost from "@/components/Blog/SpecialPost";
import { animals } from "@/components/Profile/Content/animals";
import { Button, Chip } from "@nextui-org/react";
import { Metadata } from "next";
import Image from "next/image";
import { PiFlagThin } from "react-icons/pi";
import BlogData from "@/components/Blog/blogData";
import BreadCrumbs from "@/components/BreadCrumbs";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Blog Details Page - Solid SaaS Boilerplate",
//   description: "This is Blog details page for Solid Pro",
//   // other metadata
// };

const SingleBlogPage = ({ params: { slug } }) => {
  const router = useRouter();
  console.log("router", router);

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                Барилгын дотор заслын үндсэн ажилтан авна.
              </span>
              <div>
                <BreadCrumbs />
              </div>
            </div>
            <div className="flex flex-row">
              <Button
                radius="full"
                className="mb-2 w-72 rounded-md bg-mainColor font-bold leading-none text-white"
              >
                Үйлчилгээг захиалах
              </Button>

              <Button
                className="ml-4 min-w-unit-12 border-1 bg-white !px-0"
                radius="sm"
              >
                <PiFlagThin className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 py-6 md:px-8 2xl:px-0">
          <div className="lg:w-3/4">
            <div className="animate_top">
              <div className="mb-10 w-full overflow-hidden ">
                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <Image
                    src={"/images/blog/blog-01.png"}
                    alt="Kobe Steel plant that supplied"
                    fill
                    className="rounded-md object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              </div>

              <h2 className="mb-5 mt-11 text-3xl font-semibold text-black 2xl:text-sectiontitle2">
                Kobe Steel plant that supplied
              </h2>

              <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                <li>
                  <span className="text-black ">Author: </span> Jhon Doe
                </li>
                <li>
                  <span className="text-black ">
                    Published On: July 30, 2023
                  </span>{" "}
                </li>
                <li>
                  <span className="text-black ">Category:</span>
                  Events
                </li>
              </ul>

              <div className="blog-details">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  quis nibh lorem. Duis sed odio lorem. In a efficitur leo. Ut
                  venenatis rhoncus quam sed condimentum. Curabitur vel turpis
                  in dolor volutpat imperdiet in ut mi. Integer non volutpat
                  nulla. Nunc elementum elit viverra, tempus quam non, interdum
                  ipsum.
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
              <span className="">100,000,000 ₮</span>
              <span className="font-bold">Нийтэлсэн огноо</span>
              <span className="">2023/05/17 12:52</span>
              <span className="font-bold">Зарын дугаар</span>
              <span className="">0000 0001</span>
              <span className="font-bold">Утасны дугаар</span>
              <span className="">7777 - 7777</span>
              <span className="font-bold">Зар байршуулсан</span>
              <span className="">Прогрэкс Интернэшл компани</span>
              <span className="font-bold">Веб хуудас</span>
              <span className="">www.tavan-ord.mn</span>
              <span className="font-bold">Имэйл</span>
              <span className="">info@tavan-ord.mn</span>
              <span className="font-bold">Байршил</span>
              <span className="">
                Хотын төвд, Төв зам дагуу, Талбайгаас 1км зайд Баян-Бүрдийн
                тойргийн зүүн талд, Автобусны буудалын дэргэд, Компьютер Моллын
                чанх ард, Ногоон байгууламж
              </span>
              <Button
                radius="full"
                className="mb-2 w-72 rounded-md bg-mainColor font-bold leading-none text-white"
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
                        base: "mr-2 mb-2 border-1 bg-white p-4",
                        content: "font-bold",
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
        <div className="mx-auto my-14 max-w-screen-xl">
          <span className="text-xl font-bold">
            Таны авсан үйлчилгээтэй холбоотой зөвлөмжүүд
          </span>
          <div className="grid grid-cols-7 gap-3">
            {[...new Array(4)].map((element, i) => {
              return (
                <div
                  key={i}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-1 bg-white p-8"
                >
                  <Image
                    src="/pdf_icon.png"
                    alt={"alt" + i}
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
              {BlogData?.splice(0, 4).map((blog, key) => (
                <SpecialPost blog={blog} key={key} />
              ))}
            </div>
            <span className="text-xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
            <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
              {BlogData?.splice(0, 4).map((blog, key) => (
                <RelatedPost blog={blog} key={key} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
