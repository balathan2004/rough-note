import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/components/firebase_configs/firebase_client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/utils/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const email = req.query.email as string;
  if (!email) {
    res.status(300).json({ message: "email not found" });
    return;
  }

  await sendPasswordResetEmail(auth, email);

  res.status(200).json({ message: `password reset mail sent to ${email}` });
}
