/*
import { submissionSchema } from "@repo/common/zodTypes";
import { FIRE_CRACKER_QUEUE } from "@repo/common/consts";
import { Router, Request, Response } from "express";
import { invalidInputs } from "../util/lib";
import { pubSubClient, redisClient } from "../redis/client";
import { v4 as uuidv4 } from 'uuid';

export const firecrackerRouter: Router = Router();

firecrackerRouter.post("/submit/firecracker", (req: Request, res: Response) => {
  const parsedData = submissionSchema.safeParse(req.body);
  if (!parsedData.success) return invalidInputs(res);

  const id = uuidv4();

  pubSubClient.subscribe(id, (message) => {
    res.json({
      msg: "asdf"
    })
  });

  redisClient.lPush(FIRE_CRACKER_QUEUE, JSON.stringify(parsedData.data));
});
*/
