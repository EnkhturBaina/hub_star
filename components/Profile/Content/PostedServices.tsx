"use client";
import servicesData from "./servicesData";
import { Button } from "@nextui-org/react";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import { useState } from "react";
import GridServices from "./GridServices";
import ListServices from "./ListServices";
import AddService from "./AddService";
import { useAppContext } from "@/utils/context/app-context";

const PostedServices = () => {
  const { advertisements } = useAppContext();
  const [isGrid, setIsGrid] = useState(true);
  const [isAddService, setIsAddService] = useState(false);
  if (!isAddService) {
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
              servicesData={advertisements}
              showAddBtn={true}
              isStars={false}
              setIsAddService={setIsAddService}
              isAddService={isAddService}
            />
          ) : (
            <ListServices
              servicesData={advertisements}
              showAddBtn={true}
              isStars={false}
              setIsAddService={setIsAddService}
              isAddService={isAddService}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-4 w-full overflow-hidden ">
        <div className="flex justify-end">
          <AddService
            setIsAddService={setIsAddService}
            isAddService={isAddService}
          />
        </div>
      </div>
    );
  }
};

export default PostedServices;
