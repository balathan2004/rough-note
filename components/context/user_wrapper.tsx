import React, { useContext, useState, FC, ReactNode, useEffect } from "react";
import { userInterface } from "../utils/interfaces";

type UserCredProps = userInterface | null;

export interface UserContextType {
  userCred: UserCredProps;
  setUserCred: React.Dispatch<React.SetStateAction<UserCredProps|null>>;
}

export const UserContext = React.createContext<UserContextType>({
  userCred: null,
  setUserCred: () => {},
});

interface Props {
  children: ReactNode;
}



const UserContextHolder: FC<Props> = ({ children }) => {
  const [userCred, setUserCred] = useState<UserCredProps |null>(null);

  useEffect(()=>{
    console.log("usercred",userCred)
  },[userCred])


  return (
    <UserContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextHolder;