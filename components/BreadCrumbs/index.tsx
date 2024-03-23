"use client";
import MainContext from "@/app/context/MainContext";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const BreadCrumbs = (props: any) => {
  const state = useContext(MainContext);

  const [mainDirName, setMainDirName] = useState<string>(null);
  const [dirName, setDirName] = useState<string>(null);
  const [subDirName, setSubDirName] = useState<string>(null);

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

  const getMainDirName = () => {
    state?.mainDirection?.map((el: any, index: any) => {
      if (el?.id == props.mainDir) {
        setMainDirName(el?.name);
        getDirName();
      }
    });
  };
  const getDirName = () => {
    state?.direction?.map((el: any, index: any) => {
      if (el?.id == props.dir) {
        setDirName(el?.name);
        getSubDirName();
      }
    });
  };
  const getSubDirName = () => {
    state?.subDirection?.map((el: any, index: any) => {
      if (el?.id == props.subDir) {
        setSubDirName(el?.name);
      }
    });
  };
  useEffect(() => {
    getMainDirName();
  }, []);

  return (
    <div className="mt-2">
      {/* <span className="font-bold">{directionName ? directionName : null}</span>
      <span className="font-bold">
        {" / " + directionName2 ? directionName2 : null}
      </span> */}
      <span className="font-bold">{props.mainDir ? mainDirName : null}</span>
      <span className="font-bold">{props.dir ? " / " + dirName : null}</span>
      <span className="font-bold">
        {props.subDir ? " / " + subDirName : null}
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
