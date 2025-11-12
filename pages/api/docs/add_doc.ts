// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, ResponseConfig } from "@/components/utils/interfaces";
import { firestore } from "@/components/firebase_configs/firebase_client";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import withCors from "@/libs/cors";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const { doc_id, doc_name, doc_text, doc_created, uid, lastUpdated } =
    req.body as docInterface;

  console.log(req.body);

  if (doc_id && doc_name && doc_text && doc_created && uid && lastUpdated) {
    const docRef = doc(firestore, "documents", uid, "userDocs", doc_id);

    const docSnap = await getDoc(docRef);
    const data: docInterface = {
      doc_id,
      doc_name,
      doc_text,
      doc_created,
      uid,
      lastUpdated,
    };

    if (!docSnap.exists()) {
      await setDoc(docRef, data);
    } else {
      await updateDoc(docRef, { ...data });
    }

    res.status(200).json({ message: "doc added" });
  } else {
    res.status(300).json({ message: "fileds missign" });
  }
}

export default withCors(handler as any);
