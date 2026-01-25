import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { createEmptyDoc, Doc } from "@/server/utils/interfaces";
import SingleNotePressable from "@/components/elements/singleNote";
import Editor from "@/components/elements/editor";
import { Button } from "@mui/material";
import { useAuth } from "@/components/redux/api/authSlice";
import { useGetAllDocsQuery } from "@/components/redux/api/docsApi";
import Dropdown, { ElementValue } from "@/components/elements/Dropdown";

const Home = () => {
  const { userData } = useAuth();
  const [params, setParams] = useState<ElementValue>({
    order: "desc",
    sort: "lastUpdated",
  });
  const [currentDocId, setCurrentDocId] = useState("");
  const { data: { data: docs } = {} } = useGetAllDocsQuery(params);
  const [currentDoc, setCurrentDoc] = useState<Doc | null>(null);

  const [localDocs, setLocalDocs] = useState<Doc[]>([]);

  const allDocs = React.useMemo(() => {
    const serverDocs = docs || [];
    const localOnly = localDocs.filter(
      (l) => !serverDocs.some((d) => d.doc_id === l.doc_id),
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

  const addDoc = () => {
    const lenOfEmptyDocs =
      allDocs?.filter(
        (item) => item.doc_name === "Untitled" && item.doc_text === "",
      ).length || 0;

    if (lenOfEmptyDocs < 3) {
      const createNewNote: Doc = createEmptyDoc(userData.uid);
      setCurrentDoc(createNewNote);
      setCurrentDocId(createNewNote.doc_id);
      setLocalDocs((prev) => [createNewNote, ...prev]);
    } else alert("You can't add more than three empty docs");
  };

  return (
    <div className="container">
      <div className={styles.home_container}>
        {userData && currentDoc ? (
          <div className={styles.wrapper}>
            <div className={styles.notes}>
              <Dropdown onChange={(value) => setParams(value)} />

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

                {allDocs?.map((item: Doc) => (
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
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
