// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, ResponseConfig } from "@/components/utils/interfaces";
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";
import withCors from "@/libs/cors";

async function handler(
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

    const docRef = doc(firestore, "documents", uid, "userDocs", doc_id);

    const docFetched = await getDoc(docRef);

    if (!docFetched.exists()) {
      res.status(300).json({ message: "error" });
      return;
    }

    await deleteDoc(docRef);

    res.status(200).json({ message: "Document Updated" });
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: "error" });
  }
}

export default withCors(handler as any);
