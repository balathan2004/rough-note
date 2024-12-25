import React, { useState, useEffect } from "react";
import { useReplyContext } from "@/components/context/reply_context";
import styles from "@/styles/docs.module.css";
import ReadOnlyCard from "@/components/elements/card";
import { docInterface } from "@/components/utils/interfaces";
import { singleDocResponse } from "@/components/utils/interfaces";
import { useRouter } from "next/router";
export default function GetDoc() {
  const router = useRouter();
  const [docData, setDocData] = useState<null | docInterface>(null);
  const { setReply } = useReplyContext();
  const { doc_name } = router.query;

  useEffect(() => {
    // Ensure the query parameters are ready
    if (!router.isReady) return;

    const getDocument = async () => {
      console.log(router.query);
      if (!doc_name) {
        console.log("doc name missing");
        return;
      }

      try {
        const response = await fetch(
          `/api/docs/get_single_doc?doc_name=${doc_name}`,
          {
            method: "GET",
          }
        );

        const res = (await response.json()) as singleDocResponse;
        if (res) {
          setReply(res.message);
          if ((res.status = 200)) {
            setDocData(res.docData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    getDocument();
  }, [doc_name]);

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.single_doc_container}>
          <h1>Your Document</h1>
          {docData ? <ReadOnlyCard data={docData} /> : null}
        </div>
      </div>
    </div>
  );
}
