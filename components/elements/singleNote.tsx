import React, { Component } from "react";
import { docInterface } from "../utils/interfaces";
import moment from "moment";
import styles from "@/styles/Home.module.css"
interface Props {
  data: docInterface;
  changeDoc: React.Dispatch<React.SetStateAction<string>>;
  selectedDocId:string;
}

export default function SingleNotePressable({ data, changeDoc,selectedDocId }: Props) {
  const handleChange = () => {
    changeDoc(data.doc_id);
  };

  return (
    <article className={selectedDocId==data.doc_id?`${styles.articlePressable_active}`:`${styles.articlePressable}`} onClick={handleChange}>
      <h1>{data.doc_name}</h1>
      <p>{data.doc_text.substring(0, 100) + "..."}</p>
      <span>
        {data.doc_created != 0
          ? `created ${moment(data.doc_created).fromNow()}`
          : ""}
      </span>
    </article>
  );
}
