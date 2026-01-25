import withCors from "@/server/middlewares/cors";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { DocService } from "@/server/services/doc.services";
import { AppError } from "@/server/utils/appError";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const docName = req.query.id as string;

  const [uid, id] = docName.split("@");

  if (!uid || !id) {
    throw new AppError("Unauthorised", 404);
  }

  if (req.method === "GET") {
    const data = await DocService.getDoc(uid, id);

    res.json({ message: "doc fetched", data });
  }
};

export default withCors(withErrorHandler(handler));
