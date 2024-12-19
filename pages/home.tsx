import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useUserContext } from "@/components/context/user_wrapper";
import { docInterface, docResponse } from "@/components/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import ShortUniqueId from "short-unique-id";
import { Button } from "@mui/material";
const { randomUUID } = new ShortUniqueId({ length: 12 });
interface Props {
  data: docInterface[];
}

const Home: FC<Props> = ({ data }) => {
  const [newData, setNewData] = useState<docInterface[]>(data);
  const { userCred } = useUserContext();
  const [currentDocId, setCurrentDocId] = useState(data[0].doc_id);
  const [currentDoc, setCurrentDoc] = useState(data[0]);
  const [deletedTrigger, setDeletedTrigger] = useState(false);

  useEffect(() => {
    if (currentDocId) {
      const findDoc = newData.filter((item) => item.doc_id === currentDocId);
      setCurrentDoc(findDoc[0]);
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
    setCurrentDocId(createNewNote.doc_id)
  };

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userCred ? (
          <>
            <div className={styles.notes}>
              <div className={styles.doc_container}>
                {newData.map((item) => (
                  <SingleNotePressable
                    changeDoc={setCurrentDocId}
                    key={item.doc_id}
                    data={item}
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

  if (uid) {
    const response = await fetch("http://localhost:3000/api/docs/get_docs", {
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
}
