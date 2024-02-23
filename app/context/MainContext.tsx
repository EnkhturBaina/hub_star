import React, { useEffect, useState } from "react";
import { CurrentContextType } from "./contextType";
import axiosClient from "@/services/axiosInstance";

export const MainContext = React.createContext<CurrentContextType | null>(null);

export const MainContextComp = (props: any) => {
  const client = axiosClient();
  const [username, setUsername] = useState<any>("xxx");
  const [mainDirection, setMainDirection] = useState<[]>([]);
  const [direction, setDirection] = useState<[]>([]);
  const [subDirection, setSubDirection] = useState<[]>([]);
  useEffect(() => {
    getSubDirection();
    getDirection();
    getMainDirection();
  }, []);

  const getMainDirection = () => {
    client
      .get("reference/main-direction")
      .then((response) => {
        // console.log("response", response);

        setMainDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getDirection = () => {
    client
      .get("reference/main-direction/direction")
      .then((response) => {
        // console.log("response", response);

        setDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getSubDirection = () => {
    client
      .get("reference/main-direction/direction/sub-direction")
      .then((response) => {
        // console.log("response", response);

        setSubDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  return (
    <MainContext.Provider
      value={{
        username,
        mainDirection,
        direction,
        subDirection,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
