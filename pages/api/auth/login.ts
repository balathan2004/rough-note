import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { auth } from "@/components/firebase_configs/firebase_client";
import { ResponseConfig } from "@/components/utils/interfaces";
import { FirebaseError } from "firebase/app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {

    const isSecure =process.env.NODE_ENV=="production"

    const { email, password } = req.body;

    const userID = (await signInWithEmailAndPassword(auth, email, password))
      .user.uid;

    setCookie("roughnote_uid", userID, {
      req: req,
      res: res,
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure:isSecure
    });

    res.json({ status: 200, message: "Login Successful" });
  } catch (err) {
    if (err instanceof FirebaseError) {
      res.json({ status: 300, message: err.code });
    } else {
      res.json({ status: 300, message: "Login Failed" });
    }
  }
}
