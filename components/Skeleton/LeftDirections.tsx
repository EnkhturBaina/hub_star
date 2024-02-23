"use client";
import { Divider, Skeleton } from "@nextui-org/react";

const LeftDirections = () => {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex w-full flex-row items-center ">
        <Skeleton className="flex h-10 w-10 rounded-lg" />
        <Skeleton className="ml-4 h-6 w-30 rounded-lg" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
      </div>
      <Divider />
      <div className="flex w-full flex-row items-center ">
        <Skeleton className="flex h-10 w-10 rounded-lg" />
        <Skeleton className="ml-4 h-6 w-30 rounded-lg" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default LeftDirections;
