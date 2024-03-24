"use client";
import MainContext from "@/app/context/MainContext";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import BreadCrumbs from "@/components/BreadCrumbs";
import PaginationComp from "@/components/Pagination";
import LeftFilter from "@/components/Skeleton/LeftFilter";
import { AdvertisementService } from "@/service/advertisement/advertisement.service";
import { Advertisement } from "@/types/advertisement";
import { Direction, MainDirection, PageMeta } from "@/types/reference";
import { useAppContext } from "@/utils/context/app-context";
import { useTypedSelector } from "@/utils/redux/reducer";
import { setAdParam } from "@/utils/redux/slice/ad-param";
import { AppDispatch } from "@/utils/redux/store";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuChevronLeft, LuSettings2 } from "react-icons/lu";
import { useDispatch } from "react-redux";

const BlogPage = () => {
  const { mainDirections } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const { adParam } = useTypedSelector((state) => state);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [meta, setMeta] = useState<PageMeta>();
  const onChangeFilter = (selectedDirectionIds: string[]) => {
    dispatch(
      setAdParam({
        order: "DESC",
        page: 1,
        limit: 10,
        categoryIds: adParam.categoryIds,
        mainDirectionIds: adParam.mainDirectionIds,
        directionIds: selectedDirectionIds.map((item) => Number(item)),
        subDirectionIds: adParam.subDirectionIds,
      }),
    );
  };
  useEffect(() => {
    AdvertisementService.get(adParam).then((response) => {
      if (response.success) {
        setAdvertisements(response.response.data);
        setMeta(response.response.meta);
      }
    });
  }, [adParam]);
  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
          <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
            <div className="flex flex-col">
              <span className="text-xl">
                Нийт утга: <span className="font-bold">{meta?.itemCount}</span>
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
            {mainDirections.length == 0 ? (
              <LeftFilter />
            ) : (
              mainDirections &&
              mainDirections.map((md: MainDirection, index: number) => {
                return (
                  <CheckboxGroup
                    label={md.name}
                    color="warning"
                    key={index}
                    value={adParam.directionIds?.map((item) => item.toString())}
                    classNames={{
                      base: "my-4",
                      label: "font-bold text-black text-base",
                    }}
                    onChange={(e) => onChangeFilter(e)}
                  >
                    {md.directions.map((d: Direction, index: number) => {
                      return (
                        <Checkbox
                          value={String(d.id)}
                          classNames={{
                            base: "w-full max-w-full",
                            label: "w-full",
                            wrapper: "custom-checkbox w-6 h-6",
                          }}
                          key={index}
                        >
                          <div className="flex w-full flex-row items-center justify-between">
                            <span className="text-sm leading-none">
                              {d.name}
                            </span>
                            <span className="text-sm">
                              {md.directions.length}
                            </span>
                          </div>
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                );
              })
            )}
          </div>
          <div className="px-6 pb-6 lg:w-3/4">
            <div className="my-4 flex flex-row justify-between">
              <Select
                label="Эрэмбэлэлт"
                labelPlacement="outside"
                radius="sm"
                size="md"
                variant="bordered"
                classNames={{
                  base: "w-50",
                  label: "font-bold",
                  trigger: "custom-select-trigger bg-white",
                }}
                value="DESC"
              >
                <SelectItem value="DESC" key="desc">
                  Огноогоор (Z-A)
                </SelectItem>
                <SelectItem value="ASC" key="asc">
                  Огноогоор (A-Z)
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
              {advertisements.map((blog, key) => (
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
