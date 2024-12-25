import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { auth, firestore } from "@/components/firebase_configs/firebase_client";
import { UserCredResponse, userInterface } from "@/components/utils/interfaces";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredResponse>
) {
  try {
    const isSecure = process.env.NODE_ENV == "production";

    const { email, password } = req.body;

    const userID = (await signInWithEmailAndPassword(auth, email, password))
      .user.uid;

    const userDoc = await getDoc(doc(firestore, "users", userID));

    if (!userDoc.exists()) {
      res.json({ status: 300, message: "Login Failed", credentials: null });
      return;
    }

    const userData = userDoc.data() as userInterface;

    setCookie("roughnote_uid", userID, {
      req: req,
      res: res,
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure: isSecure,
    });

    res.json({
      status: 200,
      message: "Login Successful",
      credentials: userData,
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      res.json({ status: 300, message: err.code, credentials: null });
    } else {
      res.json({ status: 300, message: "Login Failed", credentials: null });
    }
  }
}
