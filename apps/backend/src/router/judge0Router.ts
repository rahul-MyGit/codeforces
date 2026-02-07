import { Router, Request, Response } from "express";
import { invalidInputs, languageTolanguageId, unauthorized } from "../util/lib";
import prisma from "@repo/database/client";
import { submissionSchema } from "@repo/common/zodTypes";
import axios from "axios";
import { JUDGE0_BASE_URL } from "../util/config";
import { auth } from "../util/auth";
import { fromNodeHeaders } from "better-auth/node";

export const judge0Router: Router = Router();

judge0Router.post("/execute", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return unauthorized(res);

  const parsedData = submissionSchema.safeParse(req.body);
  if (!parsedData.success) return invalidInputs(res);
  const { problemId, code, language, type } = parsedData.data;

  const testCases = await prisma.problems.findFirst({
    where: {
      id: problemId
    },
    select: {
      visibleTestCases: {
        select: {
          input: true,
          output: true,
        }
      },
      hiddenTestCases: {
        select: {
          input: true,
          output: true,
        }
      },
      title: false,
      createdAt: false,
      isDeleted: false,
      description: false,
      cpuTimeLimit: false,
      memoryTimeLimit: false
    }
  });

  let test;
  if (type == "run") {
    test = [
      ...testCases?.visibleTestCases!,
    ];
  } else {
    test = [
      ...testCases?.hiddenTestCases!,
      ...testCases?.visibleTestCases!,
    ];
  }

  const language_id = languageTolanguageId(language);

  let toJudge0 = test.map((x: any) => {
    return {
      language_id,
      source_code: code,
      stdin: x.input,
      expected_output: x.output
    }
  });

  try {
    const judge0Response = await axios.post(`${JUDGE0_BASE_URL}/submissions/batch/?base64_encoded=false`, {
      submissions: toJudge0
    });

    res.json(judge0Response.data);
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong"
    });
  }
});

judge0Router.get("/submission", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return unauthorized(res);

  const tokens = req.query.tokens;
  const type = req.query.type;
  if (!tokens || !type) return invalidInputs(res);

  try {
    const judge0Response = await axios.get(`${JUDGE0_BASE_URL}/submissions/batch?tokens=${tokens}`);

    /*
    if (type == "submit") {
      await prisma.submission.upsert({
        where: {
          userId: session.user.id,
          problemId: "ASdf"
        },
        update: {
code         
language     
status       
resultVerdict
problemId    
userId
        },
        create: {
code         
language     
status       
resultVerdict
problemId    
userId
        }
      });
    }
      
      */

    res.json({
      judge0Response: judge0Response.data
    })
  } catch (err) {
    res.status(500).json({
      msg: "something went wrong"
    });
  }
});
