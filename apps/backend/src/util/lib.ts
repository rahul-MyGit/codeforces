import prisma from "@repo/database/client";
import { Response } from "express";
import { TestCase, TestCaseVerdict } from "./type";

export function invalidInputs(res: Response) {
  return res.status(400).json({
    message: "invali inputs"
  });
}


export function unauthorized(res: Response) {
  return res.status(403).json({
    message: "unauthorized"
  });
}


export function notAdmin(res: Response) {
  return res.status(403).json({
    message: "not an admin"
  });
}

export function noProblemId(res: Response) {
  return res.status(404).json({
    message: "no problem id provided"
  });
}

export async function getProblemsUnauthenticated(cursor: string | undefined) {
  let problems;
  (cursor) ?
    problems = await prisma.problems.findMany({
      skip: 1,
      take: 15,
      orderBy: {
        createdAt: "desc"
      },
      cursor: {
        id: cursor
      },
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        title: true,
        problemType: true,
        tags: true,
        description: false,
        createdAt: false,
        isDeleted: false,
        cpuTimeLimit: false,
        memoryTimeLimit: false,
        visibleTestCases: false,
        hiddenTestCases: false,
        userId: false,
        submission: false,
      }
    }) : problems = await prisma.problems.findMany({
      take: 15,
      skip: 0,
      orderBy: {
        createdAt: "desc"
      },
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        title: true,
        problemType: true,
        tags: true,
        description: false,
        createdAt: false,
        isDeleted: false,
        cpuTimeLimit: false,
        memoryTimeLimit: false,
        visibleTestCases: false,
        hiddenTestCases: false,
        userId: false,
        submission: false,
      }
    });

  return problems;
}

export async function getProblemsAuthenticated(cursor: string | undefined, userId: string) {
  let problems;
  (cursor) ?
    problems = await prisma.problems.findMany({
      skip: 1,
      take: 15,
      orderBy: {
        createdAt: "desc"
      },
      cursor: {
        id: cursor
      },
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        title: true,
        problemType: true,
        tags: true,
        description: false,
        createdAt: false,
        isDeleted: false,
        cpuTimeLimit: false,
        memoryTimeLimit: false,
        visibleTestCases: false,
        hiddenTestCases: false,
        userId: false,
        submission: {
          where: { userId },
          select: {
            status: true
          }
        }
      }
    }) : problems = await prisma.problems.findMany({
      take: 15,
      skip: 0,
      orderBy: {
        createdAt: "desc"
      },
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        title: true,
        problemType: true,
        tags: true,
        description: false,
        createdAt: false,
        isDeleted: false,
        cpuTimeLimit: false,
        memoryTimeLimit: false,
        visibleTestCases: false,
        hiddenTestCases: false,
        userId: false,
        submission: {
          where: { userId },
          select: {
            status: true
          }
        }
      }
    });

  return problems;
}

export function languageTolanguageId(language: string) {
  switch (language) {
    case "CPP":
      return 54;

    case "JAVASCRIPT":
      return 63;

    case "TYPESCRIPT":
      return 74;

    case "RUST":
      return 73;

    case "GO":
      return 60;

    case "PYTHON":
      return 71;

    case "JAVA":
      return 62;

    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}



function statusIdToVerdict(id: number): TestCaseVerdict {
  if (id === 3) return "accepted"
  if (id === 4) return "wrong_answer"
  if (id === 5) return "tle"
  if (id === 6) return "compilation_error"
  if (id >= 7 && id <= 12) return "runtime_error"
  return "internal_error"
}

export function processJudge0Response(
  submissions: any[],
  currentTestCases: TestCase[]
): TestCase[] {
  return currentTestCases.map((tc, i) => {
    const sub = submissions[i]
    if (!sub) return tc

    const verdict = statusIdToVerdict(sub.status.id)

    return {
      ...tc,
      verdict,
      status: verdict === "accepted" ? "passed" as const : "failed" as const,
      actualOutput: sub.stdout ?? undefined,
      stderr: sub.stderr ?? undefined,
      compileOutput: sub.compile_output ?? undefined,
      time: sub.time ?? undefined,
      memory: sub.memory ?? undefined,
    }
  })
}
