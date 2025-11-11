import { GetServerSidePropsContext } from "next";
import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import {
  docInterface,
  docResponse,
  wholeDoc,
} from "@/components/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import ShortUniqueId from "short-unique-id";
import { Alert, Button } from "@mui/material";
import { useAuth } from "@/components/redux/api/authSlice";

const { randomUUID } = new ShortUniqueId({ length: 12 });

interface Props {
  data: wholeDoc | null;
}

const Home: FC<Props> = ({ data }) => {
  const [newData, setNewData] = useState<wholeDoc | null>(data);
  const [docs, setDocs] = useState<docInterface[]>([]);
  const { userData } = useAuth()
  const [currentDocId, setCurrentDocId] = useState("");
  const [currentDoc, setCurrentDoc] = useState<docInterface | null>(null);
  const [deletedTrigger, setDeletedTrigger] = useState(false);

  useEffect(() => {
    if (currentDocId) {
      const findDoc = docs.find((item) => item.doc_id === currentDocId);
      if (findDoc) {
        setCurrentDoc(findDoc);
      }
    }
  }, [currentDocId, docs]);

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

  useEffect(() => {
    if (data?.data?.length === 0) {
      addDoc();
    } else if (data?.data) {
      setDocs(data.data);
      setNewData(data);
    }
  }, [data]);

  const addDoc = () => {
    const lenOfEmptyDocs = docs?.filter(
      (item) => item.doc_name === "Untitled" && item.doc_text === ""
    ).length;

    if (lenOfEmptyDocs < 3) {
      const createNewNote: docInterface = {
        doc_id: randomUUID(),
        doc_name: "Untitled",
        doc_text: "",
        doc_created: new Date().getTime(),
        uid: userData?.uid || "",
      };
      setDocs([createNewNote, ...docs]);
      setCurrentDocId(createNewNote.doc_id);

    } else
      alert("You Can't add more than three empty docs")
  };

  if (!newData) {
    return null;
  }

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userData && currentDoc && newData ? (
          <div className={styles.wrapper}>
            <div className={styles.notes}>
              <h1 className={styles.your_notes}>Your Notes</h1>
              <div className={styles.doc_container}>
                <Button
                  onClick={addDoc}
                  size="large"
                  fullWidth
                  variant="contained"
                >
                  Create New Note
                </Button>

                {docs.map((item) => (
                  <SingleNotePressable
                    changeDoc={setCurrentDocId}
                    key={item.doc_id}
                    data={item}
                    selectedDocId={currentDocId}
                  />
                ))}
              </div>
            </div>
            <div className={styles.editor}>
              {newData ? (
                <Editor
                  userData={userData}
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

  const response = await fetch(`${url}/api/docs/get_docs?uid=${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson: docResponse = await response.json();

  return {
    props: {
      data: responseJson.docData,
    },
  };
}
