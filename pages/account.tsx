import React from "react";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import { useReplyContext } from "@/components/context/reply_context";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/components/redux/api/authSlice";
import { useLazyLogoutQuery } from "@/components/redux/api/authApi";

export default function Account() {
  const { userData } = useAuth()
  const { setReply } = useReplyContext();
  const router = useRouter();
  const [logout] = useLazyLogoutQuery()


  const handleLogout = async () => {
    logout().unwrap().then(res => {
      console.log({ res })
      router.push("/");
    }

    ).catch(err => console.log({ err }))

  };

  return (
    <div className="container">
      <div className={styles.account}>
        <article>
          <h1>Your Account Info</h1>

          <div className={styles.img_container}>
            <img src={userData?.profile_url} alt="profile_image" />
            <span>{userData?.display_name}</span>
          </div>
          <span>{userData?.email}</span>
          <span>Joined {moment(userData?.createdAt).fromNow()}</span>
          <Button fullWidth variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </article>
      </div>
    </div>
  );
}
