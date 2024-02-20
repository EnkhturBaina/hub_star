import RelatedPost from "@/components/Blog/RelatedPost";
import SpecialPost from "@/components/Blog/SpecialPost";
import SharePost from "@/components/Blog/SharePost";
import { animals } from "@/components/Profile/Content/animals";
import { BreadcrumbItem, Breadcrumbs, Button, Chip } from "@nextui-org/react";
import { Metadata } from "next";
import Image from "next/image";
import { PiFlagThin } from "react-icons/pi";
import BlogData from "@/components/Blog/blogData";

export const metadata: Metadata = {
  title: "Blog Details Page - Solid SaaS Boilerplate",
  description: "This is Blog details page for Solid Pro",
  // other metadata
};

const SingleBlogPage = () => {
  return (
    <>
      <section className="pb-10 pt-35 lg:pb-14 lg:pt-40 xl:pb-16 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-c-1390 flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="font-bold">
                Барилгын дотор заслын үндсэн ажилтан авна.
              </span>
              <div>
                <Breadcrumbs
                  separator="/"
                  itemClasses={{
                    separator: "px-2",
                  }}
                >
                  <BreadcrumbItem>Үндсэн бүтээц</BreadcrumbItem>
                  <BreadcrumbItem>Газар шороо, суурийн ажил</BreadcrumbItem>
                  <BreadcrumbItem>Буцаан дүүргэлт</BreadcrumbItem>
                  <BreadcrumbItem>Progrex MN</BreadcrumbItem>
                </Breadcrumbs>
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
        <div className="mx-auto max-w-c-1390 px-4 py-6 md:px-8 2xl:px-0">
          <div className="w-full">
            <div className="animate_top">
              <div className="mb-10 w-full overflow-hidden ">
                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <Image
                    src={"/images/blog/blog-01.png"}
                    alt="Kobe Steel plant that supplied"
                    fill
                    className="rounded-md object-cover object-center"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  quis nibh lorem. Duis sed odio lorem. In a efficitur leo. Ut
                  venenatis rhoncus quam sed condimentum. Curabitur vel turpis
                  in dolor volutpat imperdiet in ut mi. Integer non volutpat
                  nulla. Nunc elementum elit viverra, tempus quam non, interdum
                  ipsum.
                </p>
              </div>

              <SharePost />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-c-1390 flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="font-bold">ТӨРӨЛ</span>
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
        <div className="mx-auto mt-14 max-w-c-1390">
          <span className="text-2xl font-bold">Онцгой үйлчилгээ</span>
          <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
            {BlogData?.splice(0, 4).map((blog, key) => (
              <SpecialPost blog={blog} key={key} />
            ))}
          </div>
          <span className="text-2xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
          <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
            {BlogData?.splice(0, 4).map((blog, key) => (
              <RelatedPost blog={blog} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
