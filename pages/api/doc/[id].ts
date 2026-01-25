import { bodyValidator } from "@/server/middlewares/bodyValidator";
import withCors from "@/server/middlewares/cors";
import { withJwt } from "@/server/middlewares/jwt";
import { withErrorHandler } from "@/server/middlewares/withErrorHandler";
import { docSchema } from "@/server/schemas/doc.schema";
import { DocService } from "@/server/services/doc.services";
import { AppError } from "@/server/utils/appError";
import { JwtRequest } from "@/server/utils/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: JwtRequest, res: NextApiResponse) => {
  const { uid } = req.user!;

  const id = req.query.id as string;

  console.log("called doc id api");

  if (!uid || !id) {
    throw new AppError("Unauthorised", 404);
  }

  if (req.method === "GET") {
    const docData = await DocService.getDoc(uid, id);

    res.json({ message: "doc fetched", data: docData });
  }

  if (req.method === "DELETE") {
    const response = await DocService.deleteDoc(uid, id);
    res.json({ message: "doc deleted" });
  }

  if (req.method == "PUT") {
    console.log(req.body);

    const data = bodyValidator(docSchema, req);
    const response = await DocService.putDoc(data);
    res.status(200).json({ message: "doc updated" });
  }
};

export default withCors(withErrorHandler(withJwt(handler)));
