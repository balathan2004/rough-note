import React, { useEffect, useState } from "react";
import {
  docInterface,
  ResponseConfig,
  userInterface,
} from "../utils/interfaces";
import { TextField, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import lodash from "lodash";
import { useReplyContext } from "../context/reply_context";

interface Props {
  docData: docInterface;
  userData: userInterface;
  updateData: React.Dispatch<React.SetStateAction<docInterface[]>>;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Editor({
  docData,
  userData,
  setTrigger,
  updateData,
}: Props) {
  const [mainData, setMainData] = useState(docData);
  const [docTitle, setDocTitle] = useState(docData.doc_name);
  const [docText, setDocText] = useState(docData.doc_text);
  const { setReply } = useReplyContext();

  console.log("triiggerr", setTrigger);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name == "doc_text") {
      setDocText(value);
    } else {
      setDocTitle(value);
    }
  };

  const restoreText = () => {
    if (mainData.doc_name != docTitle || mainData.doc_text != docText) {
      setDocTitle(mainData.doc_name);
      setDocText(mainData.doc_text);
    } else {
      setReply("no changes made");
    }
  };

  const deleteDoc = async () => {
    const data = { uid: userData.uid, doc_id: mainData.doc_id };
    const response = await fetch("/api/docs/delete_doc", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = (await response.json()) as ResponseConfig;

    if (res) {
      setReply(res.message);
      if (res.status == 200) {
        updateData((prev) => {
          const filtered = prev.filter(
            (item) => item.doc_id !== mainData.doc_id
          );
          return filtered;
        });
        setTrigger(true);
      }
    }
  };

  const handleSubmit = async () => {
    const newData: docInterface = {
      ...mainData,
      doc_text: docText ? docText : "untitled",
      doc_name: docTitle,
    };

    if (lodash.isEqual(mainData, newData)) {
      setReply("no changes made");
    } else {
      const response = await fetch("/api/docs/update_doc", {
        body: JSON.stringify(newData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = (await response.json()) as ResponseConfig;

      if (res) {
        setReply(res.message);
        setMainData(newData);
        updateData((prev) => {
          const filtered = prev.filter(
            (item) => item.doc_id !== mainData.doc_id
          );

          return [
            ...filtered,
            { ...mainData, doc_name: docTitle, doc_text: docText },
          ];
        });
      }
    }
  };

  useEffect(() => {
    console.log("value changed to", docData);
    setMainData(docData);
    setDocTitle(docData.doc_name);
    setDocText(docData.doc_text);
  }, [docData]);

  return (
    <main>
      <h1>Editor</h1>
      <TextField
        name="doc_title"
        fullWidth
        variant="standard"
        className={styles.input_title}
        multiline
        onChange={handleInput}
        slotProps={{
          input: {
            style: {
              paddingBottom: "10px", // Adds space between the text and bottom border
            },
          },
        }}
        value={docTitle}
      ></TextField>{" "}
      <TextField
        name="doc_text"
        fullWidth
        variant="standard"
        className={styles.input}
        multiline
        onChange={handleInput}
        value={docText}
        slotProps={{
          input: {
            style: {
              paddingBottom: "20px",
            },
          },
        }}
      ></TextField>
      <span>
        {docData.doc_created != 0
          ? `created ${moment(docData.doc_created).fromNow()}`
          : ""}
      </span>
      <div className={styles.btn_container}>
        <Button
          className={styles.button}
          onClick={handleSubmit}
          variant="contained"
        >
          Save
        </Button>
        <Button
          className={styles.button}
          onClick={restoreText}
          variant="contained"
        >
          Discard
        </Button>
        <Button
          className={styles.button}
          onClick={deleteDoc}
          variant="contained"
        >
          Delete
        </Button>
      </div>
    </main>
  );
}
