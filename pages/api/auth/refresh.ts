// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { DataRes, JwtRequest, User } from "@/server/utils/interfaces";
import withCors from "@/server/middlewares/cors";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { AppError } from "@/server/utils/appError";
import {
  generateAccessToken,
  verifyJwtToken,
} from "@/server/middlewares/jwt";

async function handler(req: JwtRequest, res: NextApiResponse<DataRes<User>>) {
  const token = req.cookies.rough_note_token || req.body.rough_note_token || null;

  const user = verifyJwtToken(token, "refresh") as any // jwt extracted so have more keys

  delete user?.exp;
  delete user?.iat;

  if (!user?.uid) {
    throw new AppError("UnAuthorised", 400);
  }
  const data: User = { ...user, accessToken: generateAccessToken(user) };

  res.status(200).json({
    message: "User fetched",
    data,
  });
}

export default withErrorHandler(withCors(handler));
