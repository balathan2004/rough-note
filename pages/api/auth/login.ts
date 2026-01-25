import { NextApiRequest, NextApiResponse } from "next";
import { DataRes, User } from "@/server/utils/interfaces";
import withCors from "@/server/middlewares/cors";
import { bodyValidator } from "@/server/middlewares/bodyValidator";
import { loginSchema } from "@/server/schemas/auth.schema";
import { AuthService } from "@/server/services/auth.services";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { AppError } from "@/server/utils/appError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/server/middlewares/jwt";
import reponseWithCookie from "@/server/utils/responseWithCookie";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRes<User>>,
) {
  if (req.method != "POST") throw new AppError("Forbidden Request", 403);

  const { email, password } = bodyValidator(loginSchema, req);

  const data = await AuthService.login(email, password);

  const tokens = {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data),
  };
  reponseWithCookie(req, res, tokens.refreshToken, {
    data: { ...data, ...tokens },
    message: "Login Successful",
  });
}

export default withCors(withErrorHandler(handler));
