// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserCredResponse, userInterface } from "@/components/utils/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredResponse>
) {
  const uid = req.cookies.roughnote_uid || false;
  try {
    if (!uid) {
      res.json({ status: 300, message: "not authorised", credentials: null });
      return;
    }

    const docRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      res.json({ status: 300, message: "not authorised", credentials: null });
      return;
    }

    const userData = userDoc.data() as userInterface;

    res.json({
      status: 200,
      message: "details fetched",
      credentials: userData,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: 300, message: "not authorised", credentials: null });
  }
}
