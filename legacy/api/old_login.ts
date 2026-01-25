import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { auth, firestore } from "@/components/firebase_configs/firebase_client";
import { AuthResponseConfig, User } from "@/server/utils/interfaces";
import { doc, getDoc } from "firebase/firestore";
import withCors from "@/server/middlewares/cors";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseConfig>
) {
  if (req.method != "POST") return;

  const isDev = process.env.NODE_ENV == "production";

  const { email, password } = req.body;

  console.log("Login Request from ", email);

  const userID = (await signInWithEmailAndPassword(auth, email, password)).user
    .uid;

  const userDoc = await getDoc(doc(firestore, "users", userID));

  if (!userDoc.exists()) {
    res.status(300).json({ message: "Login Failed", credentials: null });
    return;
  }

  const userData = userDoc.data() as User;

  setCookie("roughnote_uid", userID, {
    req: req,
    res: res,
    maxAge: 2592000000,
    httpOnly: true,
    sameSite: isDev ? "none" : "lax",
    secure: isDev,
  });

  res.status(200).json({
    message: "Login Successful",
    credentials: userData,
  });
}

export default withCors(handler as any);
