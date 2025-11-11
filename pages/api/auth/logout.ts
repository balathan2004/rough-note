import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { ResponseConfig } from "@/components/utils/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const isSecure = process.env.NODE_ENV == "production";
    const uid = req.cookies.roughnote_uid || false;

    if (!uid) {
      res.status(300).json({ message: "Logout Failed" });
      return;
    }

    setCookie("roughnote_uid", "", {
      req: req,
      res: res,
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: isSecure,
    });

    res.status(200).json({
      message: "Logged Out",
    });
  } catch (err) {
    res.status(300).json({ message: "Logout Failed" });
  }
}
