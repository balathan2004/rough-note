import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useUserContext } from "@/components/context/user_wrapper";
import { docInterface, docResponse } from "@/components/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import ShortUniqueId from "short-unique-id";
import { Button } from "@mui/material";
import { add } from "lodash";
const { randomUUID } = new ShortUniqueId({ length: 12 });
interface Props {
  data: docInterface[];
}

const Home: FC<Props> = ({ data }) => {
  const [newData, setNewData] = useState<docInterface[]>(data);
  const { userCred } = useUserContext();
  const [currentDocId, setCurrentDocId] = useState(data?.[0]?.doc_id || "");
  const [currentDoc, setCurrentDoc] = useState(data?.[0] || null);
  const [deletedTrigger, setDeletedTrigger] = useState(false);

  useEffect(() => {
    if (currentDocId) {
      const findDoc = newData.find((item) => item.doc_id === currentDocId);
      if (findDoc) {
        setCurrentDoc(findDoc);
      }
    }
  }, [currentDocId]);

  useEffect(() => {
    if (deletedTrigger) {
      setCurrentDoc(newData[0]);
      setDeletedTrigger(false);
    }
  }, [deletedTrigger]);

  const addDoc = () => {
    const createNewNote: docInterface = {
      doc_id: randomUUID(),
      doc_name: "Untitled",
      doc_text: "",
      doc_created: 0,
      uid: userCred?.uid || "",
    };
    setNewData([...newData, createNewNote]);
    setCurrentDocId(createNewNote.doc_id);
  };

  useEffect(() => {
    if (data.length == 0) {
      addDoc();
    }
  }, [data]);

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userCred && currentDoc && newData ? (
          <>
            <div className={styles.notes}>
              <h1 className={styles.your_notes}>Your Notes</h1>
              <div className={styles.doc_container}>
                {newData.map((item) => (
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
              <Editor
                userData={userCred}
                docData={currentDoc}
                updateData={setNewData}
                setTrigger={setDeletedTrigger}
              />
            </div>
          </>
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
      ? `${process.env.production_domain}`
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
      data: responseJson.docData || [],
    },
  };
}
