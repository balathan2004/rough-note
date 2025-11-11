// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  docInterface,
  docResponse,
  wholeDoc,
} from "@/components/utils/interfaces";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<docResponse>
) {
  const uid = req.query.uid as string;

  if (uid) {
    const docRef = doc(firestore, "documents", uid);
    const checkDoc = await getDoc(docRef);
    if (!checkDoc.exists()) {
      res.status(300).json({ message: "no doc found", docData: null });
      return;
    }
    const { data, metadata } = checkDoc.data() as wholeDoc;

    if (data && Array.isArray(data)) {
      const sortedItems = data.sort((a, b) => b.doc_created - a.doc_created);
      console.log(sortedItems);
      res
        .status(200)
        .json({ message: "success", docData: { data: sortedItems, metadata } });
    }

    res.status(200).json({ message: "success", docData: { data, metadata } });
  }
}
