// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, ResponseConfig } from "@/components/utils/interfaces";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { uid, doc_id } = req.body;
    console.log(req.body);

    if (!(uid && doc_id)) {
      res.status(300).json({ message: "error" });
      return;
    }

    const docRef = doc(firestore, "documents", uid);

    const docFetched = await getDoc(docRef);

    if (!docFetched.exists()) {
      res.status(300).json({ message: "error" });
      return;
    }

    const fetchedData = docFetched.data().data as docInterface[];

    const filterObj = fetchedData.filter((item) => item.doc_id !== doc_id);

    if (filterObj.length > 0) {
      const updatedData = fetchedData.filter((doc) => doc.doc_id !== doc_id);
      await updateDoc(docRef, { data: updatedData });
    } else {
      await updateDoc(docRef, { data: [] });
    }

    res.status(200).json({ message: "Document Updated" });
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: "error" });
  }
}
