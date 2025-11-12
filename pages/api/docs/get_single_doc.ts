import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";
import { docInterface, singleDocResponse } from "@/components/utils/interfaces";
import withCors from "@/libs/cors";
async function handler(
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

  const docRef = doc(firestore, "documents", uid, "userDocs", doc_id);

  const docFetched = await getDoc(docRef);

  if (!docFetched.exists()) {
    res.status(300).json({ message: "Document doesnt exist", docData: null });
    return;
  }

  const docData = docFetched.data() as docInterface;

  if (!docData) {
    res.status(300).json({ message: "Document doesnt exist", docData: null });
    return;
  }

  res.status(200).json({ message: "doc found", docData: docData });
}

export default withCors(handler as any);
