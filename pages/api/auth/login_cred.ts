// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  AuthResponseConfig,
  userInterface,
} from "@/components/utils/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_configs/firebase_client";
import withCors from "@/libs/cors";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  let uid = "";

  if (req.method == "GET") {
    uid = req.cookies.roughnote_uid || "";
  }
  if (req.method == "POST") {
    uid = req.body.roughnote_uid || "";
  }

  try {
    if (!uid) {
      res.status(300).json({ message: "Not authorised", credentials: null });
      return;
    }

    const docRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      res.status(300).json({ message: "Not authorised", credentials: null });
      return;
    }

    const userData = userDoc.data() as userInterface;

    res.status(200).json({
      message: "Details fetched",
      credentials: userData,
    });
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: "Not authorised", credentials: null });
  }
}

export default withCors(handler as any);
