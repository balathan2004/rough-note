import React, { useEffect, useState } from "react";
import {
  docInterface,
  ResponseConfig,
  userInterface,
} from "../utils/interfaces";
import ReplyIcon from "@mui/icons-material/Reply";
import { TextField, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import lodash from "lodash";
import { useReplyContext } from "../context/reply_context";
import { useLoadingContext } from "../context/loadingWrapper";
import SendData from "../utils/SendData";
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

  const { setLoading } = useLoadingContext();

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
    setLoading(true);

    const response = await SendData({
      data: data,
      route: "/api/docs/delete_doc",
    });
    setLoading(false);
    if (response) {
      setReply(response.message);
      if (response.status == 200) {
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

  const copyToClipBoard = () => {
    // Ensure the Clipboard API is available
    const url =
      process.env.NODE_ENV == "production"
        ? `${process.env.production_domain}/get_document?doc_name=${mainData.uid}@${mainData.doc_id}`
        : `http://localhost:3000/get_document?doc_name=${mainData.uid}@${mainData.doc_id}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("URL copied to clipboard successfully!");
          setReply("Copied to ClipBoard");
        })
        .catch((err) => {
          console.error("Failed to copy to clipboard: ", err);
        });
    } else {
      console.error("Clipboard API is not supported on this browser.");
    }
  };
  const handleSubmit = async () => {
    const newData: docInterface = {
      ...mainData,
      doc_text: docText ? docText : "untitled",
      doc_name: docTitle,
    };

    console.log(newData);

    if (!lodash.isEqual(mainData, newData) && userData) {
      setLoading(true);

      const response = await SendData({
        data: newData,
        route: "/api/docs/update_doc",
      });

      if (response) {
        setLoading(false);
        setReply(response.message);
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
    } else {
      setReply("no changes made");
    }
  };

  useEffect(() => {
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
