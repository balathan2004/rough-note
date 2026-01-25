import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/server/utils/interfaces";
import withCors from "@/server/middlewares/cors";
import { AuthService } from "@/server/services/auth.services";
import { bodyValidator } from "@/server/middlewares/bodyValidator";
import { forgetPasswordSchema } from "@/server/schemas/auth.schema";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const { email } = bodyValidator(forgetPasswordSchema, req);

  const data = await AuthService.reset_password(email);

  res.status(200).json({ message: `password reset mail sent to ${email}` });
}

export default withCors(withErrorHandler(handler));
