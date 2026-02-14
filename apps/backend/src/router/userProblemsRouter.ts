import prisma from "@repo/database/client";
import { ProblemStats } from "@repo/common/types";
import { Router, Request, Response } from "express";
import { getProblemsAuthenticated, getProblemsUnauthenticated, invalidInputs, noProblemId } from "../util/lib";
import { auth } from "../util/auth";
import { fromNodeHeaders } from "better-auth/node";

export const userProblemRouter: Router = Router();

userProblemRouter.get("/", async (req: Request, res: Response) => {
  let problems;
  const cursor = req.query.cursor as string | undefined;

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    const fromDbPorblems = await getProblemsUnauthenticated(cursor);
    problems = fromDbPorblems.map(x => {
      return {
        ...x,
        submission: []
      }
    })
  } else {
    problems = await getProblemsAuthenticated(cursor, session.user.id);
  }
  res.json({
    problems,
    role: "user"
  });

});

userProblemRouter.get("/problemsList/:id", async (req: Request, res: Response) => {
  const middleProblemId = req.params.id as string;
  if (!middleProblemId) return invalidInputs(res);

  const problemsAfter = await prisma.problems.findMany({
    orderBy: {
      createdAt: "desc"
    },
    cursor: {
      id: middleProblemId
    },
    where: {
      isDeleted: false
    },
    skip: 0,
    take: 20,
    select: {
      id: true,
      title: false,
      problemType: false,
      tags: false,
      description: false,
      createdAt: false,
      isDeleted: false,
      cpuTimeLimit: false,
      memoryTimeLimit: false,
      visibleTestCases: false,
      hiddenTestCases: false,
      userId: false
    }
  });

  const problemsBefore = await prisma.problems.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      isDeleted: false
    },
    select: {
      id: true,
      title: false,
      problemType: false,
      tags: false,
      description: false,
      createdAt: false,
      isDeleted: false,
      cpuTimeLimit: false,
      memoryTimeLimit: false,
      visibleTestCases: false,
      hiddenTestCases: false,
      userId: false
    },
    cursor: {
      id: middleProblemId
    },
    skip: 1,
    take: -20
  });
  const newProblems = problemsAfter.map(x => {
    return x.id
  });

  const newProblemsBefore = problemsBefore.map(x => {
    return x.id
  });
  const finalArr = [...newProblemsBefore, ...newProblems];
  const index = finalArr.findIndex(x => x == middleProblemId);
  res.json({
    problems: finalArr,
    index
  })
});


userProblemRouter.get("/progress-widget", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  let data: ProblemStats;

  const [totalEasy, totalMedium, totalHard] = await prisma.$transaction([
    prisma.problems.count({
      where: {
        problemType: "EASY"
      }
    }),
    prisma.problems.count({
      where: {
        problemType: "MEDIUM"
      }
    }),
    prisma.problems.count({
      where: {
        problemType: "HARD"
      }
    }),
  ]);

  if (!session) {
    data = {
      easy: {
        total: totalEasy,
        solved: 0,
      },

      medium: {
        total: totalMedium,
        solved: 0,
      },

      hard: {
        total: totalHard,
        solved: 0,
      }
    }
  } else {
    const [totalEasySolved, totalMediumSolved, totalHardSolved] = await prisma.$transaction([
      prisma.problems.count({
        where: {
          problemType: "EASY",
          submission: {
            some: {
              userId: session.user.id,
              status: "SOLVED",
            },
          },
        },
      }),
      prisma.problems.count({
        where: {
          problemType: "MEDIUM",
          submission: {
            some: {
              userId: session.user.id,
              status: "SOLVED",
            },
          },
        },
      }),
      prisma.problems.count({
        where: {
          problemType: "HARD",
          submission: {
            some: {
              userId: session.user.id,
              status: "SOLVED",
            },
          },
        },
      }),
    ]);

    data = {
      easy: {
        total: totalEasy,
        solved: totalEasySolved,
      },

      medium: {
        total: totalMedium,
        solved: totalMediumSolved,
      },

      hard: {
        total: totalHard,
        solved: totalHardSolved,
      }
    }
  }
  res.json({
    data
  });
});


userProblemRouter.get("/:problemId", async (req: Request, res: Response) => {
  const problemId = req.params.problemId as string;
  if (!problemId) return noProblemId(res);

  const problem = await prisma.problems.findFirst({
    where: {
      id: problemId,
      isDeleted: false
    },
    select: {
      id: true,
      title: true,
      description: true,
      isDeleted: false,
      constraints: true,
      problemType: true,
      tags: true,
      cpuTimeLimit: true,
      memoryTimeLimit: true,
      visibleTestCases: true,
      hiddenTestCases: false,
      submission: false
    }
  });

  let starterCodeObj: any = {};
  const starterCode = await prisma.starterCode.findMany();

  starterCode.forEach(x => {
    starterCodeObj[x.language] = x.code;
  })

  if (problem && starterCode) {
    res.json({
      problem,
      starterCodeObj
    });
  } else {
    res.status(404).json({
      message: 404
    })
  }
});

