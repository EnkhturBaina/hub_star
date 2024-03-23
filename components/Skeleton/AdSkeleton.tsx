"use client";
import { Divider, Skeleton } from "@nextui-org/react";

const AdSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center gap-3 p-2">
      <div className="w-full bg-gray-100 px-4 md:px-8 2xl:px-0">
        <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-18 lg:flex-row xl:gap-12.5">
          <div className="flex flex-col">
            <Skeleton className="flex h-6 w-[300px] rounded-lg" />
            <Skeleton className="mt-2 flex h-4 w-[200px] rounded-lg" />
          </div>
          <div className="flex flex-row">
            <Skeleton className="flex h-10 w-[300px] rounded-lg" />
            <Skeleton className="ml-2 flex h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-screen-xl gap-4 px-4 py-6 md:px-8 2xl:px-0">
        <div className="lg:w-3/4">
          <div className="animate_top">
            <div className="mb-10 w-full overflow-hidden ">
              <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                <Skeleton className="flex h-full w-full rounded-lg" />
              </div>
            </div>

            <Skeleton className="flex h-[50px] w-2/3 rounded-lg" />
            <Skeleton className="mt-2 flex h-[50px] w-full rounded-lg" />
            <Skeleton className="mt-2 flex h-[200px] w-full rounded-lg" />
          </div>
        </div>
        <div className="border-l px-4 md:w-1/4 lg:w-[20%]">
          <div className="flex w-full flex-col gap-y-2">
            <span className="font-bold">
              <Skeleton className="flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-1/3 rounded-lg" />
              <Skeleton className="mt-2 flex h-4 w-full rounded-lg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSkeleton;
