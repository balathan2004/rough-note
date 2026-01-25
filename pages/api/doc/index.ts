// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { JwtRequest, SortField, sortOrder } from "@/server/utils/interfaces";
import withCors from "@/server/middlewares/cors";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { bodyValidator } from "@/server/middlewares/bodyValidator";
import { docSchema } from "@/server/schemas/doc.schema";
import { DocService } from "@/server/services/doc.services";
import { AppError } from "@/server/utils/appError";
import { withJwt } from "@/server/middlewares/jwt";

async function handler(req: JwtRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const data = bodyValidator(docSchema, req);
    const response = await DocService.postDoc(data);
    res.status(200).json({ message: "doc added" });
  } else if (req.method == "GET") {
    const sort = (req.query.sort as SortField) || ("lastUpdated" as SortField);
    const order = (req.query.order as sortOrder) || ("asc" as sortOrder);

    const { uid } = req.user ?? { uid: null };

    if (!uid) {
      throw new AppError("Unauthorised", 404);
    }

    const data = await DocService.getDocsQuery(uid, sort, order);
    res.status(200).json({ message: "docs fetched", data });
  }
}

export default withCors(withErrorHandler(withJwt(handler)));
