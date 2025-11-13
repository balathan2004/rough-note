import React, { useEffect, useState } from "react";
import { docInterface, userInterface, wholeDoc } from "../utils/interfaces";
import ReplyIcon from "@mui/icons-material/Reply";
import { TextField, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import lodash from "lodash";
import { useReplyContext } from "../context/reply_context";
import { useAddDocMutation, useDeleteDocMutation } from "../redux/api/docsApi";

interface Props {
  docData: docInterface;
  userData: userInterface;
}

export default function Editor({
  docData,
  userData,
}: Props) {
  const [mainData, setMainData] = useState(docData);
  const [docTitle, setDocTitle] = useState(docData.doc_name);
  const [docText, setDocText] = useState(docData.doc_text);
  const titleLimit = 100
  const contentLimit = 10000
  const { setReply } = useReplyContext();
  const [deleteDocMutation] = useDeleteDocMutation()

  const [addDoc] = useAddDocMutation()


  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "doc_text") {
      setDocText(value.slice(0, contentLimit));
    } else if (name === "doc_title") {
      setDocTitle(value.slice(0, titleLimit)); 
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


    const response = await deleteDocMutation(
      data,

    ).unwrap().then(res => {

      console.log({ res })

    }).catch(err => {
      console.log({ err });
    })


  };

  const copyToClipBoard = async () => {
    const url =
      process.env.NODE_ENV == "production"
        ? `${process.env.NEXT_PUBLIC_API_URL}/get_document?doc_name=${mainData.uid}@${mainData.doc_id}`
        : `http://localhost:3000/get_document?doc_name=${mainData.uid}@${mainData.doc_id}`;
    try {
      await navigator.clipboard.writeText(url);
      setReply("Copied to Clipboard");
    } catch (err) {
      setReply("Failed to copy");
    }
  };

  const handleSubmit = async () => {
    if (
      docTitle === mainData.doc_name &&
      docText === mainData.doc_text &&
      userData
    ) {
      setReply("No changes made");
      return;
    }

    const newData = { ...mainData, doc_text: docText, doc_name: docTitle };
    const lastUpdated = new Date().getTime();
    addDoc(
      { ...newData, lastUpdated }
    ).unwrap().then(res => {
      setMainData(newData);

    }).catch(err => console.log({ err }))


  };

  useEffect(() => {
    if (!lodash.isEqual(mainData, docData)) {
      setMainData(docData);
      setDocTitle(docData.doc_name);
      setDocText(docData.doc_text);
    }
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
        placeholder="title"
        slotProps={{
          input: {
            style: {
              paddingBottom: "10px", // Adds space between the text and bottom border
            },
          },
        }}
        value={docTitle}
      ></TextField>
      <span className={styles.char_limit_span}>
        {docTitle.length}/{titleLimit} characters
      </span>
      <TextField
        placeholder="content"
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
      <span className={styles.char_limit_span}>
        {docText.length}/{contentLimit} characters
      </span>
      <span>
        {docData.doc_created != 0
          ? `created ${moment(docData.doc_created).fromNow()}`
          : ""}
      </span>
      <ReplyIcon
        className={styles.share_icon}
        onClick={copyToClipBoard}
        fontSize="large"
        sx={{ transform: "scaleX(-1)" }}
      />
      <div className={styles.btn_container}>
        <Button
          className={styles.button}
          onClick={handleSubmit}
          variant="contained"
          disabled={
            docTitle.trim().length === 0 ||
            docText.trim().length === 0 ||
            (docTitle.trim() === mainData.doc_name &&
              docText.trim() === mainData.doc_text)
          }
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
