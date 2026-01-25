import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/server/utils/interfaces";

import withCors from "@/server/middlewares/cors";
import reponseWithCookie from "@/server/utils/responseWithCookie";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { AppError } from "@/server/utils/appError";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {

  const isSecure = process.env.NODE_ENV == "production";
  const uid = req.cookies.rough_note_token || false;

  if (!uid) {
    throw new AppError( "Logout Failed",400);
  }

  const response =
    reponseWithCookie(req, res, "", {
      message: "Logged Out"
    });

}


export default withCors(withErrorHandler(handler));