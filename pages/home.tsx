import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { docInterface } from "@/components/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import ShortUniqueId from "short-unique-id";
import { Button } from "@mui/material";
import { useAuth } from "@/components/redux/api/authSlice";
import { useGetMyDocsQuery } from "@/components/redux/api/docsApi";
const { randomUUID } = new ShortUniqueId({ length: 12 });

const Home = () => {
  const { userData } = useAuth();
  const [currentDocId, setCurrentDocId] = useState("");
  const { data: { docData: docs } = {} } = useGetMyDocsQuery();
  const [currentDoc, setCurrentDoc] = useState<docInterface | null>(null);
  const [deletedTrigger, setDeletedTrigger] = useState(false);

  const [localDocs, setLocalDocs] = useState<docInterface[]>([]);

  const allDocs = React.useMemo(() => {
    const serverDocs = docs || [];
    const localOnly = localDocs.filter(
      (l) => !serverDocs.some((d) => d.doc_id === l.doc_id)
    );
    return [...localOnly, ...serverDocs];
  }, [docs, localDocs]);

  useEffect(() => {
    if (currentDocId) {
      const findDoc = docs?.find((item) => item.doc_id === currentDocId);
      if (findDoc) {
        setCurrentDoc(findDoc);
      }
    }
  }, [currentDocId, docs]);

  useEffect(() => {
    if (docs && docs.length > 0) {
      setCurrentDocId(docs[0]?.doc_id);
      setCurrentDoc(docs[0]);
      setLocalDocs(docs || []);
    }
  }, [docs]);

  useEffect(() => {
    console.log({localDocs});
    if (deletedTrigger && localDocs) {
      console.log({ localDocs });
      setCurrentDoc(localDocs[0] || null);
      setCurrentDocId(localDocs[0].doc_id)
      console.log("setted first docs as selected");
      setDeletedTrigger(false);
    }
  }, [deletedTrigger]);

  const addDoc = () => {
    const lenOfEmptyDocs =
      allDocs?.filter(
        (item) => item.doc_name === "Untitled" && item.doc_text === ""
      ).length || 0;

    if (lenOfEmptyDocs < 3) {
      const creationTime = new Date().getTime();

      const createNewNote: docInterface = {
        doc_id: randomUUID(),
        doc_name: "Untitled",
        doc_text: "",
        doc_created: creationTime,
        uid: userData?.uid || "",
        lastUpdated: creationTime,
        clientOnlyDoc: true,
      };
      setCurrentDoc(createNewNote);
      setCurrentDocId(createNewNote.doc_id);
      setLocalDocs((prev) => [createNewNote, ...prev]);
    } else alert("You Can't add more than three empty docs");
  };

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userData && currentDoc ? (
          <div className={styles.wrapper}>
            <div className={styles.notes}>
              <h1 className={styles.title}>Your Notes</h1>
              <div className={styles.doc_container}>
                <Button
                  className="button"
                  onClick={addDoc}
                  size="large"
                  fullWidth
                  variant="contained"
                >
                  Create New Note
                </Button>

                {allDocs?.map((item: docInterface) => (
                  <SingleNotePressable
                    changeDoc={setCurrentDocId}
                    key={item.doc_id}
                    data={item}
                    isSelected={item.doc_id == currentDocId}
                  />
                ))}
              </div>
            </div>
            <div className={styles.editor}>
              <Editor
                userData={userData}
                docData={currentDoc}
                setDocsData={setLocalDocs}
                setDeleteTrigger={setDeletedTrigger}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
