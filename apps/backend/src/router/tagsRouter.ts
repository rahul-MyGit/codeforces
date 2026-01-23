import { tagsSchema } from "@repo/common/zodTypes";
import prisma from "@repo/database/client";
import { Router, Request, Response } from "express";
import { invalidInputs } from "../util/lib";

export const tagsRouter: Router = Router();


tagsRouter.get("/getAll", async (req: Request, res: Response) => {
  const allTags = await prisma.problemTag.findMany();
  res.json({
    allTags
  });
});


tagsRouter.post("/createTag", async (req: Request, res: Response) => {
  const parsedData = tagsSchema.safeParse(req.body);
  if (!parsedData) return invalidInputs(res);

  await prisma.problemTag.create({
    data: {
      title: parsedData.data?.tag!,
      fixed: false
    }
  });
  res.json({
    success: true,
    message: "created a new Tag",
  });
});

tagsRouter.put("/updateTag/:id", async (req: Request, res: Response) => {
  const parsedData = tagsSchema.safeParse(req.body);
  const tagId = req.params.id as string;
  if (!tagId || !parsedData.success) return invalidInputs(res);

  await prisma.problemTag.update({
    data: {
      title: parsedData.data.tag,
      fixed: false
    },
    where: {
      id: tagId
    }
  });

  res.json({
    success: true,
    message: "updated a new Tag",
  });
});


tagsRouter.delete("/deleteTag/:id", async (req: Request, res: Response) => {
  const tagId = req.params.id as string;
  if (!tagId) return invalidInputs(res);

  await prisma.problemTag.delete({
    where: {
      id: tagId
    }
  });

  res.json({
    success: true,
    message: "deleted",
  });
});
