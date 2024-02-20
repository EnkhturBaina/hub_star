"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BreadCrumbs = () => {
  const router = usePathname();
  const value = router
    .toLowerCase()
    .split("/")
    .filter((item) => item);
  const path = value.map(
    (value) => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
  );
  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: "px-2",
      }}
    >
      {path?.map((el, index) => {
        return <BreadcrumbItem key={index}>{el}</BreadcrumbItem>;
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
