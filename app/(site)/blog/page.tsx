"use client";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import BreadCrumbs from "@/components/BreadCrumbs";
import PaginationComp from "@/components/Pagination";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuChevronLeft, LuSettings2 } from "react-icons/lu";

const BlogPage = () => {
  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">7,284</span>
              </span>
              <div>
                <BreadCrumbs />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-xl gap-4 px-4 md:px-8 2xl:px-0">
          <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-row items-center justify-center">
                <LuSettings2 className="text-xl" />
                <span className="ml-3 font-bold">Шүүлтүүр</span>
              </div>
              <LuChevronLeft className="text-2xl" />
            </div>
            <CheckboxGroup
              label="Үндсэн бүтээц"
              defaultValue={["buenos-aires", "london"]}
              color="warning"
              className="my-4"
            >
              <Checkbox
                value="buenos-aires"
                classNames={{
                  base: "w-full",
                  label: "w-full",
                  wrapper: "custom-checkbox w-6 h-6",
                }}
              >
                <div className="flex flex-row items-center justify-between">
                  <span>Buenos Aires</span>
                  <span>350</span>
                </div>
              </Checkbox>
              <Checkbox
                value="sydney"
                classNames={{
                  base: "w-full",
                  label: "w-full",
                  wrapper: "custom-checkbox w-6 h-6",
                }}
              >
                Sydney
              </Checkbox>
              <Checkbox
                value="san-francisco"
                classNames={{
                  base: "w-full",
                  label: "w-full",
                  wrapper: "custom-checkbox w-6 h-6",
                }}
              >
                San Francisco
              </Checkbox>
              <Checkbox
                value="london"
                classNames={{
                  base: "w-full",
                  label: "w-full",
                  wrapper: "custom-checkbox w-6 h-6",
                }}
              >
                London
              </Checkbox>
              <Checkbox
                value="tokyo"
                classNames={{
                  base: "w-full",
                  label: "w-full",
                  wrapper: "custom-checkbox w-6 h-6",
                }}
              >
                Tokyo
              </Checkbox>
            </CheckboxGroup>
          </div>
          <div className="px-6 pb-6 lg:w-3/4">
            <div className="my-4 flex flex-row justify-between">
              <Select
                label=""
                labelPlacement="outside"
                placeholder="Эрэмбэлэлт"
                radius="sm"
                size="md"
                variant="bordered"
                classNames={{
                  base: "w-50",
                  label: "font-bold",
                  trigger: "custom-select-trigger bg-white",
                }}
              >
                <SelectItem value="date" key="date">
                  Огноогоор
                </SelectItem>
              </Select>
              <Button
                radius="full"
                className="w-65 rounded-md bg-mainColor font-bold leading-none text-white"
                startContent={<IoIosAddCircleOutline className="text-xl" />}
              >
                Онцгой үйлчилгээ оруулах
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {BlogData.map((blog, key) => (
                <BlogItem blog={blog} key={key} />
              ))}
            </div>
            <PaginationComp />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
