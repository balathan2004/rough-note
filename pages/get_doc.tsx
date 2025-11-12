import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@/styles/docs.module.css";
import ReadOnlyCard from "@/components/elements/card";
import { useLazyGetSingleDocQuery } from "@/components/redux/api/docsApi";
export default function GETDOC() {
  const [docName, setDocName] = useState("");

  const [getDoc, { data }] = useLazyGetSingleDocQuery()

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

    getDoc(extractedDocName)


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
          {data && data.docData && <ReadOnlyCard data={data.docData} />}
        </div>
      </div>
    </div>
  );
}
