import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@/styles/docs.module.css";
import ReadOnlyCard from "@/components/elements/card";
import { useLazyGetSingleDocQuery } from "@/components/redux/api/docsApi";
import { useRouter } from "next/router";
import { Doc } from "@/server/utils/interfaces";
export default function GETDOC() {
  const [docName, setDocName] = useState("");
  const router = useRouter();

  const [getDoc, { data }] = useLazyGetSingleDocQuery();

  const [doc, setDoc] = useState<Doc | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDocName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!docName) console.log("doc name missing");
    setDoc(null);
    const extractedDocName = docName.includes("get_document?doc_name=")
      ? docName.split("get_document?doc_name=")[1]
      : docName;

    router.replace({ query: { doc_name: extractedDocName } }, undefined, {
      shallow: true,
    });

    getDoc(extractedDocName)
      .unwrap()
      .then((res) => {
        setDoc(res.data);
      })
      .catch(err=>{
        console.log(err);
      });
  };

  useEffect(() => {
    const name = window.location.search.replace("?doc_name=", "");
    if (name) setDocName(name);
  }, []);

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
              value={docName}
              multiline={false}
              required
            />
            <Button type="submit" fullWidth variant="outlined">
              Fetch
            </Button>
          </form>
          {doc && <ReadOnlyCard data={doc} />}
        </div>
      </div>
    </div>
  );
}
