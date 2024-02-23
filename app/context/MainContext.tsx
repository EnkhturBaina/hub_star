import React, { useState } from "react";
import { CurrentContextType } from "./contextType";

export const MainContext = React.createContext<CurrentContextType | null>(null);

export const MainContextComp = (props: any) => {
  const [username, setUsername] = useState<any>("xxx");
  return (
    <MainContext.Provider
      value={{
        username,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
