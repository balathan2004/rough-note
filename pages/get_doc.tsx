import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useReplyContext } from "@/components/context/reply_context";
import styles from "@/styles/docs.module.css";
import ReadOnlyCard from "@/components/elements/card";
import { docInterface } from "@/components/utils/interfaces";
import { singleDocResponse } from "@/components/utils/interfaces";
export default function GETDOC() {
  const [docName, setDocName] = useState("");
  const [docData, setDocData] = useState<null | docInterface>(null);
  const { setReply } = useReplyContext();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDocName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!docName) console.log("doc name missing");
    const extractedDocName = docName.includes("get_document?doc_name=")
      ? docName.split("get_document?doc_name=")[1]
      : docName;
    const response = await fetch(
      `/api/docs/get_single_doc?doc_name=${extractedDocName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const res = (await response.json()) as singleDocResponse;
    if (res) {
      setReply(res.message);
      if ((res.status = 200)) {
        setDocData(res.docData);
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <form onSubmit={handleSubmit}>
            <h1>Get Document</h1>
            <label>Enter Document Name</label>
            <TextField
              className={styles.input}
              fullWidth
              placeholder="Enter Doc Name"
              onChange={handleInput}
              multiline={false}
              required
            />
            <Button type="submit" fullWidth variant="outlined">
              Fetch
            </Button>
          </form>
          {docData ? <ReadOnlyCard data={docData} /> : null}
        </div>
      </div>
    </div>
  );
}
