import React, { Component, FC } from "react";
import { docInterface } from "../utils/interfaces";
import moment from "moment";
interface Props {
  data: docInterface;
}

const ReadOnlyCard: FC<Props> = ({ data }) => {
  return (
    <article key={data.doc_id}>
      <h2>{data.doc_name}</h2>
      <p>{data.doc_text}</p>
      <span>{moment(data.doc_created).fromNow()}</span>
    </article>
  );
};


export default ReadOnlyCard