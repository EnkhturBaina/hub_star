"use client";
import { Divider, Skeleton } from "@nextui-org/react";

const AccountFields = () => {
  return (
    <div className="flex w-full flex-col items-start gap-3 p-2">
      <Skeleton className="h-5 w-30 rounded-lg" />
      <Skeleton className="mr-4 h-9 w-full rounded-lg" />
      <Skeleton className="h-5 w-30 rounded-lg" />
      <Skeleton className="mr-4 h-9 w-full rounded-lg" />
      <Skeleton className="h-5 w-30 rounded-lg" />
      <Skeleton className="mr-4 h-9 w-full rounded-lg" />
    </div>
  );
};

export default AccountFields;
