import { NextApiRequest, NextApiResponse } from "next";

import { ResponseConfig } from "@/server/utils/interfaces";

import withCors from "@/server/middlewares/cors";
import { bodyValidator } from "@/server/middlewares/bodyValidator";
import { loginSchema } from "@/server/schemas/auth.schema";
import { AuthService } from "@/server/services/auth.services";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>,
) {
  if (req.method != "POST") return;

  const { email, password } = bodyValidator(loginSchema, req);

  const data = await AuthService.register(email, password);

  res.status(200).json({ message: "Account Created Login To Use" });
}

export default withCors(withErrorHandler(handler));
