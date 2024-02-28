import React, { useEffect, useState } from "react";
import { CurrentContextType } from "./contextType";
import axiosClient from "@/services/axiosInstance";
import { CustomerType } from "@/types/customerType";

export const MainContext = React.createContext<CurrentContextType | null>(null);

export const MainContextComp = (props: any) => {
  const client = axiosClient();
  const [username, setUsername] = useState<any>("xxx");
  const [directionLoading, setDirectionLoading] = useState<boolean>(true);

  const [mainDirection, setMainDirection] = useState<[]>([]);
  const [direction, setDirection] = useState<[]>([]);
  const [subDirection, setSubDirection] = useState<[]>([]);

  const [custTypeData, setCustTypeData] = useState<[] | null>([]);

  const [adsData, setAdsData] = useState<[]>([]);
  const [adsLoading, setAdsLoading] = useState<boolean>(true);

  const getMainDirection = () => {
    client
      .get("reference/main-direction")
      .then((response) => {
        // console.log("getMain Direction response", response);
        const result = response.data?.response?.map((item: any) => {
          return {
            ...item,
            children: direction.filter(
              (el: any) => el.mainDirectionId === item.id,
            ),
          };
        });

        setMainDirection(result);
      })
      .then(() => {
        setDirectionLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getDirection = () => {
    client
      .get("reference/main-direction/direction")
      .then((response) => {
        // console.log("get Direction response", response);
        const result = response.data?.response?.map((item: any) => {
          return {
            ...item,
            sub_children: subDirection.filter(
              (el: any) => el.directionId === item.id,
            ),
          };
        });

        // console.log("get Direction result ===>", result);
        setDirection(result);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getSubDirection = () => {
    client
      .get("reference/main-direction/direction/sub-direction")
      .then((response) => {
        // console.log("getSubDirection response", response);
        setSubDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getCatData = () => {
    client
      .get("reference/category")
      .then((response) => {
        // console.log("response", response);

        setCustTypeData(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
      });
  };

  const getAds = () => {
    client
      .get("advertisement", {
        params: {
          page: 1,
          limit: 10,
        },
      })
      .then((response) => {
        setAdsData(response.data.response.data);
        setAdsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
      });
  };

  useEffect(() => {
    getCatData();
    getSubDirection();
  }, []);

  useEffect(() => {
    getDirection();
  }, [subDirection]);

  useEffect(() => {
    getMainDirection();
  }, [direction]);

  return (
    <MainContext.Provider
      value={{
        username,
        mainDirection,
        direction,
        subDirection,
        directionLoading,
        custTypeData,
        getAds,
        adsData,
        adsLoading,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
