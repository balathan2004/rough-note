import { createUserWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { auth } from "@/components/firebase_configs/firebase_client";
import { ResponseConfig } from "@/components/utils/interfaces";
import { FirebaseError } from "firebase/app";
import { userInterface } from "@/components/utils/interfaces";
import { generateUsername } from "unique-username-generator";
import { firestore } from "@/components/firebase_configs/firebase_client";
import { setDoc, doc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const isSecure = process.env.NODE_ENV == "production";

    const userData = (
      await createUserWithEmailAndPassword(auth, email, password)
    ).user;

    const emailSplit: string = email.split("@")[0].slice(0, 6);

    const userDoc: userInterface = {
      email: userData.email || "",
      display_name: userData.displayName
        ? userData.displayName
        : generateUsername(emailSplit, 3, 20, "user-"),
      profile_url: userData.photoURL
        ? userData.photoURL
        : `https://ui-avatars.com/api/?name=${emailSplit}`,
      uid: userData.uid,
      createdAt: new Date().getTime(),
    };

    await setDoc(doc(firestore, "users", userDoc.uid), userDoc);

    // setCookie("roughnote_uid", userDoc.uid, {
    //   req: req,
    //   res: res,
    //   maxAge: 9000000,
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: isSecure,
    // });

    res.json({ status: 200, message: "Account Created Login To Use" });
  } catch (err) {
    if (err instanceof FirebaseError) {
      res.json({ status: 300, message: err.code });
    } else {
      res.json({ status: 300, message: "Failed to create account" });
    }
  }
}
