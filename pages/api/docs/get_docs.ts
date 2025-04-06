// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, docResponse, wholeDoc } from "@/components/utils/interfaces";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<docResponse>
) {
  const { uid } = req.body;

  if (uid) {
    const docRef = doc(firestore, "documents", uid);
    const checkDoc = await getDoc(docRef);
    if (!checkDoc.exists()) {
      res.json({ message: "John Doe", status: 200, docData:null});
      return;
    }
    const docData = checkDoc.data() as wholeDoc;

    res.json({ message: "John Doe", status: 200, docData: docData });
  }
}
