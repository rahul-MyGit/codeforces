import * as z from "zod"
import { CompleteVisibleTestCases, RelatedVisibleTestCasesModel, CompleteHiddenTestCases, RelatedHiddenTestCasesModel } from "./index"

export const ProblemsModel = z.object({
  title: z.string(),
  createdAt: z.date(),
  isDeleted: z.boolean(),
  description: z.string(),
  cpuTimeLimit: z.number().int(),
  memoryTimeLimit: z.number().int(),
});

const ProblemsModelOptional = ProblemsModel.partial();


export interface CompleteProblems extends z.infer<typeof ProblemsModel> {
  visibleTestCases: CompleteVisibleTestCases[]
  hiddenTestCases: CompleteHiddenTestCases[]
}

export interface CompleteProblemsOptional extends z.infer<typeof ProblemsModelOptional> {
  visibleTestCases: CompleteVisibleTestCases[]
  hiddenTestCases: CompleteHiddenTestCases[]
}

/**
 * RelatedProblemsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProblemsModel: z.ZodSchema<CompleteProblems> = z.lazy(() => ProblemsModel.extend({
  visibleTestCases: RelatedVisibleTestCasesModel.array(),
  hiddenTestCases: RelatedHiddenTestCasesModel.array(),
}));

export const RelatedProblemsModelOptional: z.ZodSchema<CompleteProblemsOptional> = z.lazy(() => ProblemsModelOptional.extend({
  visibleTestCases: RelatedVisibleTestCasesModel.array(),
  hiddenTestCases: RelatedHiddenTestCasesModel.array(),
}))





