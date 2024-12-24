import React, { Component } from "react";
import { useUserContext } from "@/components/context/user_wrapper";
import styles from "@/styles/Home.module.css";
import moment from "moment";

export default function Account() {
  const { userCred } = useUserContext();

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
       
        </article>
      </div>
    </div>
  );
}
