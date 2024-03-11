"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const BreadCrumbs = () => {
  const router = usePathname();
  const searchParams = useSearchParams();
  const direction = searchParams.get("direction");
  const directionName = searchParams.get("directionName");
  const directionName2 = searchParams.get("directionName2");
  // console.log("BreadCrumbs direction", direction);
  // console.log("BreadCrumbs directionName", directionName);
  const value = router
    .toLowerCase()
    .split("/")
    .filter((item) => item);
  const path = value.map(
    (value) => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
  );
  return (
    <div className="mt-2 flex flex-row">
      <span className="font-bold">{directionName ? directionName : null}</span>
      <span className="font-bold">
        {" / " + directionName2 ? directionName2 : null}
      </span>
    </div>
    // <Breadcrumbs
    //   separator="/"
    //   itemClasses={{
    //     separator: "px-2",
    //   }}
    // >
    //   {path?.map((el, index) => {
    //     return <BreadcrumbItem key={index}>{el}</BreadcrumbItem>;
    //   })}
    // </Breadcrumbs>
  );
};

export default BreadCrumbs;
