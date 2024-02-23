import React, { useEffect, useState } from "react";
import { CurrentContextType } from "./contextType";
import axiosClient from "@/services/axiosInstance";

export const MainContext = React.createContext<CurrentContextType | null>(null);

export const MainContextComp = (props: any) => {
  const client = axiosClient();
  const [username, setUsername] = useState<any>("xxx");
  const [direction, setDirection] = useState<[]>([]);
  useEffect(() => {
    getCatData();
  }, []);

  const getCatData = () => {
    client
      .get("reference/main-direction")
      .then((response) => {
        console.log("response", response);

        setDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
      });
  };

  return (
    <MainContext.Provider
      value={{
        username,
        direction,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
