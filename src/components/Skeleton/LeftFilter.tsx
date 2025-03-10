'use client';
import React from 'react';
import { Divider, Skeleton } from '@heroui/react';

const LeftFilter = () => {
  return (
    <div className="flex w-full flex-col items-center gap-3 p-2">
      <div className="flex w-full flex-row items-center ">
        <Skeleton className="h-5 w-30 rounded-lg" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
      </div>
      <Divider />
      <div className="flex w-full flex-row items-center ">
        <Skeleton className="h-5 w-30 rounded-lg" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
        <div className="flex flex-row items-center">
          <Skeleton className="flex h-6 w-6 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LeftFilter;
