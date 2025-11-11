import { FC, ReactNode, useEffect } from "react";
import ReplyPopUp from "../elements/replyPopup";
import DrawerAppBar from "../elements/navbar";
import LoadingProgress from "../elements/loading";
import { useLazyGetLoginCredQuery } from "../redux/api/authApi";


const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {

  const [getLoginCred] = useLazyGetLoginCredQuery()


  useEffect(() => {
    getLoginCred();
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
