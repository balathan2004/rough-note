import React, { FC } from "react";
import { Doc } from "../../server/utils/interfaces";
import moment from "moment";
interface Props {
  data: Doc;
}

const ReadOnlyCard: FC<Props> = ({ data }) => {
  return (
    <article key={data.doc_id}>
      <h1>Document</h1>
      <h2>{data.doc_name}</h2>
      <p>{data.doc_text}</p>
      <span>{moment(data.doc_created).fromNow()}</span>
    </article>
  );
};


export default ReadOnlyCard