import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";
import { docInterface, singleDocResponse } from "@/components/utils/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<singleDocResponse>
) {
  const doc_name: string = req.query.doc_name as string;

  if (!doc_name) {
    res.status(300).json({ message: "Doc id missing", docData: null });
    return;
  }

  const [uid, doc_id] = doc_name.split("@");
  console.log(uid, doc_id);

  if (!uid || !doc_id) {
    res.status(300).json({ message: "error", docData: null });
    return;
  }

  const docRef = await getDoc(doc(firestore, "documents", uid));

  if (!docRef.exists()) {
    res.status(300).json({ message: "Document doesnt exist", docData: null });
    return;
  }

  const docData = (docRef.data().data as docInterface[]) || null;

  if (docData.length < 0) {
    res.status(300).json({ message: "Document doesnt exist", docData: null });
    return;
  }
  const findDoc = docData.find((item) => item.doc_id == doc_id) || null;

  if (!findDoc) {
    res.status(300).json({ message: "Document not found", docData: null });
    return;
  }

  res.status(200).json({ message: "doc found", docData: findDoc });
}
