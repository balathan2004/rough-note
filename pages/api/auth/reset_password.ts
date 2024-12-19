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
    res.json({ status: 300, message: "email not found" });
    return;
  }

  await sendPasswordResetEmail(auth, email);

  res.json({ status: 200, message: `password reset mail sent to ${email}` });
}
