import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_wrapper";
import { UserCredResponse } from "../utils/interfaces";
import { useNavbarContext, NavInit, NavUsers } from "./navbar_wrapper";
import ReplyPopUp from "../elements/replyPopup";
import DrawerAppBar from "../elements/navbar";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { setDirs } = useNavbarContext();
  const { setUserCred } = useUserContext();

  useEffect(() => {
    async function getCred() {
      console.log("started");
      const response = await fetch(`api/auth/login_cred`, {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json() as UserCredResponse;
      console.log(res);
      if (res && res.status == 200) {
        console.log("setting");
        setDirs(NavUsers);
        console.log("setted nav");
        setUserCred(res.credentials);
      }
    }
    getCred()
  }, []);

  return (
    <>
      <ReplyPopUp />
      <DrawerAppBar />

      {children}
    </>
  );
};

export default ContextWrapper;
