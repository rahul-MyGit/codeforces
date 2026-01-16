import { Router, Request, Response } from "express";
import { auth } from "../util/auth";
import { fromNodeHeaders } from "better-auth/node";
import { invalidInputs, unauthorized } from "../util/lib";
import prisma from "@repo/database/client";
import { submissionSchema } from "@repo/common/zodTypes";
import axios from "axios";
import { JUDGE0_BASE_URL } from "../util/config";

export const submissionRouter: Router = Router();

submissionRouter.post("/submit/judge0", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return unauthorized(res);
  let allTestCases: any[] = [];

  const parsedData = submissionSchema.safeParse(req.body);
  if (!parsedData.success) return invalidInputs(res);
  const { problemId, code, language } = parsedData.data;

  const testCases = await prisma.problems.findFirst({
    where: {
      id: problemId
    },
    select: {
      visibleTestCases: true,
      hiddenTestCases: true,
      title: false,
      createdAt: false,
      isDeleted: false,
      description: false,
      cpuTimeLimit: false,
      memoryTimeLimit: false
    }
  });

  testCases?.hiddenTestCases.forEach(x => {
    allTestCases.push(x);
  })

  testCases?.visibleTestCases.forEach(x => {
    allTestCases.push(x);
  });

  const judge0Response = await axios.post(`${JUDGE0_BASE_URL}/submissions/batch/?base64_encoded=false`, {
    "submissions": [
      {
        "language_id": 46,
        "source_code": "echo hello from Bash"
      },
      {
        "language_id": 71,
        "source_code": "print(\"hello from Python\")"
      },
      {
        "language_id": 72,
        "source_code": "puts(\"hello from Ruby\")"
      }
    ]
  });


});


submissionRouter.post("/submit/e2b", (req: Request, res: Response) => {

});


submissionRouter.post("/submit/firecracker", (req: Request, res: Response) => {

});
