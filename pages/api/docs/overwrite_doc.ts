// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  docInterface,
  ResponseConfig,
  wholeDoc,
} from "@/components/utils/interfaces";
import { updateDoc, doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { docData }: { docData: wholeDoc } = req.body;
    const uid = docData.data[0].uid;

    console.log("overwrite req from", uid);

    if (!docData || !uid) {
      res.status(300).json({ message: "error" });
      return;
    }

    const docRef = doc(firestore, "documents", uid);

    const docFetched = await getDoc(docRef);

    if (!docFetched.exists()) {
      res.status(300).json({ message: "error" });
      return;
    }

    await setDoc(docRef, docData);

    res.status(200).json({ message: "Document Updated" });
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: "error" });
  }
}
