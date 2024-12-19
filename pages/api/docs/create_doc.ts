// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { docInterface, ResponseConfig } from "@/components/utils/interfaces";
import { firestore } from "@/components/firebase_configs/firebase_client";
import {  arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const { doc_id, doc_name, doc_text, doc_created, uid } =
    req.body as docInterface;

  if (doc_id && doc_name && doc_text && doc_created && uid) {
    const docRef = doc(firestore, "documents",uid);
    const docFetched=await getDoc(docRef)

    const data = {
      doc_id,
      doc_name,
      doc_text,
      doc_created,
      uid,
    };

    if(!docFetched.exists()){
      await setDoc(doc(docRef, uid), { data:[data] });
    }
    await updateDoc(docRef,{data:arrayUnion(data)})



  
    res.json({ message: "John Doe", status: 200 });
  } else {
    res.json({ message: "John Doe", status: 300 });
  }
}
