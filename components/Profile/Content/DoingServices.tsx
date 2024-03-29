"use client";
import servicesData from "./servicesData";
import { Button } from "@nextui-org/react";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import { useState } from "react";
import GridServices from "./GridServices";
import ListServices from "./ListServices";

const DoingServices = () => {
  const [isGrid, setIsGrid] = useState(true);
  return (
    <div className="mb-4 w-full overflow-hidden ">
      <div className="flex justify-end">
        <Button
          className="min-w-unit-12 !px-0"
          radius="sm"
          onClick={() => {
            setIsGrid(!isGrid);
          }}
        >
          {isGrid ? (
            <CiGrid2H className="text-4xl" />
          ) : (
            <CiGrid41 className="text-4xl" />
          )}
        </Button>
      </div>
      <div className="mx-auto mt-4 max-w-c-1280">
        {isGrid ? (
          <GridServices
            servicesData={servicesData}
            showAddBtn={false}
            isStars={false}
          />
        ) : (
          <ListServices
            servicesData={servicesData}
            showAddBtn={false}
            isStars={false}
          />
        )}
      </div>
    </div>
  );
};

export default DoingServices;
