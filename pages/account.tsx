import React, { Component } from "react";
import { useUserContext } from "@/components/context/user_wrapper";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import { useNavbarContext, NavInit } from "@/components/context/navbar_wrapper";
import { useReplyContext } from "@/components/context/reply_context";
import { ResponseConfig } from "@/components/utils/interfaces";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Account() {
  const { userCred, setUserCred } = useUserContext();
  const { setDirs } = useNavbarContext();
  const { setReply } = useReplyContext();
  const router = useRouter();

  const logOut = async () => {
    const response = await fetch("/api/auth/logout");
    const res = (await response.json()) as ResponseConfig;
    if (res && res.status == 200) {
      setDirs(NavInit);
      setUserCred(null);
      setReply(res.message);
      router.push("/");
    }
  };

  return (
    <div className="container">
      <div className={styles.account}>
        <article>
          <h1>Your Account Info</h1>

          <div className={styles.img_container}>
            <img src={userCred?.profile_url} alt="profile_image" />
            <span>{userCred?.display_name}</span>
          </div>
          <span>{userCred?.email}</span>
          <span>Joined {moment(userCred?.createdAt).fromNow()}</span>
          <Button fullWidth variant="contained" onClick={logOut}>
            Logout
          </Button>
        </article>
      </div>
    </div>
  );
}
