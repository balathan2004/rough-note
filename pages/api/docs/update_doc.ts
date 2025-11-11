// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, ResponseConfig } from "@/components/utils/interfaces";
import { updateDoc, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { uid, doc_name, doc_text, doc_id, lastUpdated } = req.body;
    const docData = {
      uid: uid,
      doc_name: doc_name,
      doc_text: doc_text,
      doc_id: doc_id,
    };

    if (!(uid || doc_name || doc_id || doc_text || lastUpdated)) {
      res.status(300).json({ message: "error" });
      return;
    }

    const docRef = doc(firestore, "documents", uid);

    const docFetched = await getDoc(docRef);

    if (!docFetched.exists()) {
      await setDoc(docRef, {
        metadata: { lastUpdated: lastUpdated },
        data: [{ ...docData, doc_created: lastUpdated }],
      });

      res.status(200).json({ message: "Document Updated" });
      return;
    }

    const fetchedData = docFetched.data().data as docInterface[];

    const filterObj = fetchedData.filter((item) => item.doc_id == doc_id);

    if (filterObj.length > 0) {
      const updatedData = fetchedData.map((doc) =>
        doc.doc_id == doc_id ? { ...doc, ...docData } : doc
      );
      await updateDoc(docRef, {
        data: updatedData,
        metadata: { lastUpdated: lastUpdated },
      });
    } else {
      await updateDoc(docRef, {
        data: arrayUnion({ ...docData, doc_created: lastUpdated }),
        metadata: { lastUpdated: lastUpdated },
      });
    }

    res.status(200).json({ message: "Document Updated" });
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: "error" });
  }
}
