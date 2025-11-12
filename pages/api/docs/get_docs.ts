// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  docInterface,
  docResponse,
  wholeDoc,
} from "@/components/utils/interfaces";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";
import withCors from "@/libs/cors";
async function handler(req: NextApiRequest, res: NextApiResponse<docResponse>) {
  const uid = req.query.uid as string;

  if (uid) {
    const collectionRef = collection(firestore, "documents", uid, "userDocs");
    const allDocs = await getDocs(collectionRef);

    if (allDocs.empty) {
      res.status(300).json({ message: "no doc found", docData: [] });
      return;
    }

    const allData = allDocs.docs.map((item) => item.data() as docInterface);

    if (allData && Array.isArray(allData)) {
      const sortedItems = allData.sort((a, b) => b.doc_created - a.doc_created);

      res.status(200).json({ message: "success", docData: sortedItems });
    }

    res.status(200).json({ message: "success", docData: allData });
  }
}

export default withCors(handler as any);
