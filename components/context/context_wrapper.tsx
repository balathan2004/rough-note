import { FC, ReactNode, useEffect } from "react";
import ReplyPopUp from "../elements/replyPopup";
import DrawerAppBar from "../elements/navbar";
import LoadingProgress from "../elements/loading";
import { useLazyGetLoginCredQuery } from "../redux/api/authApi";
import { useAuth } from "../redux/api/authSlice";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [getLoginCred] = useLazyGetLoginCredQuery();
  const { changeAccessToken } = useAuth();

  function getToken() {
    const token = localStorage.getItem("accessToken");

    if (token) changeAccessToken(token);
    getLoginCred().unwrap();
  }

  useEffect(() => {
    getToken();
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
