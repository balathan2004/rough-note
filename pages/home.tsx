import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useUserContext } from "@/components/context/user_wrapper";
import {
  docInterface,
  docResponse,
  wholeDoc,
} from "@/components/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import ShortUniqueId from "short-unique-id";
import { Button } from "@mui/material";
const { randomUUID } = new ShortUniqueId({ length: 12 });

interface Props {
  data: wholeDoc | null;
}

const Home: FC<Props> = ({ data }) => {
  console.log(data);
  const [newData, setNewData] = useState<wholeDoc | null>(data);
  const [docs, setDocs] = useState<docInterface[]>([]);
  const { userCred } = useUserContext();
  const [currentDocId, setCurrentDocId] = useState("");
  const [currentDoc, setCurrentDoc] = useState<docInterface | null>(null);
  const [deletedTrigger, setDeletedTrigger] = useState(false);

  useEffect(() => {
    if (currentDocId) {
      const findDoc = newData?.data.find(
        (item) => item.doc_id === currentDocId
      );
      if (findDoc) {
        setCurrentDoc(findDoc);
      }
    }
  }, [currentDocId]);

  useEffect(() => {
    if (docs.length > 0) {
      setCurrentDocId(docs[0].doc_id);
      setCurrentDoc(docs[0]);
    }
  }, [docs]);

  useEffect(() => {
    if (deletedTrigger) {
      setCurrentDoc(docs[0] || null);
      setDeletedTrigger(false);
    }
  }, [deletedTrigger]);

  const addDoc = () => {
    const createNewNote: docInterface = {
      doc_id: randomUUID(),
      doc_name: "Untitled",
      doc_text: "",
      doc_created: new Date().getTime(),
      uid: userCred?.uid || "",
    };
    setDocs([...docs, createNewNote]);
    setCurrentDocId(createNewNote.doc_id);
  };

  useEffect(() => {
    if (data && data.data) {
      if (data.data && data.data.length === 0) {
        addDoc();
      } else {
        setDocs(data.data);
        setNewData(data);
      }
    }
  }, [data]);

  if (!newData) {
    return null;
  }

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userCred && currentDoc && newData ? (
          <div className={styles.wrapper}>
            <div className={styles.notes}>
              <h1 className={styles.your_notes}>Your Notes</h1>
              <div className={styles.doc_container}>
                {docs.map((item) => (
                  <SingleNotePressable
                    changeDoc={setCurrentDocId}
                    key={item.doc_id}
                    data={item}
                    selectedDocId={currentDocId}
                  />
                ))}
                <Button onClick={addDoc} fullWidth variant="contained">
                  Create New Note
                </Button>
              </div>
            </div>
            <div className={styles.editor}>
              {newData ? (
                <Editor
                  userData={userCred}
                  docData={currentDoc}
                  updateData={setNewData}
                  setTrigger={setDeletedTrigger}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;

  const uid = req.cookies.roughnote_uid || false;

  if (!uid) {
    // Redirect to a login page or some other fallback page
    return {
      redirect: {
        destination: "/", // Replace '/login' with your desired route
        permanent: false, // Indicates that this is not a permanent redirect
      },
    };
  }

  const url =
    process.env.NODE_ENV == "production"
      ? `${process.env.NEXT_PUBLIC_API_URL}`
      : "http://localhost:3000";

  const response = await fetch(`${url}/api/docs/get_docs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  });
  const responseJson: docResponse = await response.json();

  return {
    props: {
      data: responseJson.docData,
    },
  };
}
