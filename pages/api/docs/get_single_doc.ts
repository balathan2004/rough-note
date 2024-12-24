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
    res.json({ status: 300, message: "error", docData: null });
    return;
  }

  const [uid, doc_id] = doc_name.split("@");
  console.log(uid,doc_id)

  if (!uid && !doc_id) {
    res.json({ status: 300, message: "error", docData: null });
    return;
  }

  const docRef = await getDoc(doc(firestore, "documents", uid));

  if (!docRef.exists()) {
    res.json({ status: 300, message: "error", docData: null });
    return;
  }

  const docData = (docRef.data().data as  docInterface[]) || null;

  if (docData.length<0) {
    res.json({ status: 300, message: "error", docData: null });
    return;
  }
  const findDoc=docData.find(item=>item.doc_id==doc_id) ||null

  if (!findDoc) {
    res.json({ status: 300, message: "error", docData: null });
    return;
  }

  res.json({ status: 200, message: "doc found", docData: findDoc });
}
