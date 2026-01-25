import React from "react";
import { Doc } from "../../server/utils/interfaces";
import moment from "moment";
import styles from "@/styles/Home.module.css";
interface Props {
  data: Doc;
  changeDoc: React.Dispatch<React.SetStateAction<string>>;
  isSelected: boolean;
}

//helos

export default function SingleNotePressable({
  data,
  changeDoc,
  isSelected,
}: Props) {
  const handleChange = () => {
    changeDoc(data.doc_id);
  };

  return (
    <article
      className={
        isSelected
          ? `${styles.articlePressable_active}`
          : `${styles.articlePressable}`
      }
      onClick={handleChange}
    >
      <h1>{data.doc_name}</h1>
      <p>{data.doc_text.substring(0, 100) + "..."}</p>
      <div className={styles.article_time_div}>
      <span>
        {data.doc_created != 0
          ? `created ${moment(data.doc_created).fromNow()}`
          : ""}
      </span>
      <span>
        {data.lastUpdated != 0
          ? `editted ${moment(data.lastUpdated).fromNow()}`
          : ""}
      </span>
      </div>
    </article>
  );
}
