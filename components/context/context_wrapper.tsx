import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_wrapper";
import { UserCredResponse } from "../utils/interfaces";
import { useNavbarContext, NavUsers } from "./navbar_wrapper";
import ReplyPopUp from "../elements/replyPopup";
import DrawerAppBar from "../elements/navbar";
import LoadingProgress from "../elements/loading";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { setDirs } = useNavbarContext();
  const { setUserCred } = useUserContext();

  useEffect(() => {
    async function getCred() {
      const response = await fetch(`/api/auth/login_cred`, {
        method: "GET",
        credentials: "include",
      });

      const res = (await response.json()) as UserCredResponse;
      if (res && res.status == 200) {
        setDirs(NavUsers);
        setUserCred(res.credentials);
      }
    }
    getCred();
  }, []);

  return (
    <>
      <ReplyPopUp />
      <DrawerAppBar />
      <LoadingProgress />
      {children}
    </>
  );
};

export default ContextWrapper;
