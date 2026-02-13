import { fromNodeHeaders } from "better-auth/node";
import { Router, Request, Response } from "express";
import { auth } from "../util/auth";
import { invalidInputs, unauthorized } from "../util/lib";
import prisma from "@repo/database/client";

export const submissionRouter: Router = Router();

submissionRouter.get("/", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return unauthorized(res);
  const problemId = req.query.problemId as string;
  if (!problemId) return invalidInputs(res);

  const submissions = await prisma.submission.findMany({
    where: {
      userId: session.user.id,
      problemId
    }
  });
  return res.json({
    submissions
  });
});
