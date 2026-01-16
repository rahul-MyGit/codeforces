import prisma from "@repo/database/client";
import { Router, Request, Response } from "express";
import { noProblemId } from "../util/lib";

export const userRouter: Router = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  let problems;

  (page == 1) ?
    problems = await prisma.problems.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc"
      }
    }) : problems = await prisma.problems.findMany({
      take: 10,
      skip: (page * 10) - 10,
      orderBy: {
        createdAt: "desc"
      }
    })

  res.json({
    problems,
    role: "user"
  });


});


userRouter.get("/:problemId", async (req: Request, res: Response) => {
  const problemId = req.params.problemId as string;
  if (!problemId) return noProblemId(res);

  const problem = await prisma.problems.findFirst({
    where: {
      id: problemId
    },
    select: {
      visibleTestCases: true,
      hiddenTestCases: false
    }
  });

  res.json({
    problem
  });
});
