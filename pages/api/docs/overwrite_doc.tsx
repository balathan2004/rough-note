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

    if (!docData) {
      res.json({ message: "error", status: 300 });
      return;
    }

    const docRef = doc(firestore, "documents", uid);

    const docFetched = await getDoc(docRef);

    if (!docFetched.exists()) {
      res.json({ message: "error", status: 300 });
      return;
    }

    await setDoc(docRef, docData);

    res.json({ message: "Document Updated", status: 200 });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", status: 300 });
  }
}
