import * as z from "zod"
import { CompleteProblems, RelatedProblemsModel } from "./index"

export const HiddenTestCasesModel = z.object({
  id: z.string(),
  input: z.string(),
  output: z.string(),
  problemId: z.string(),
})

export interface CompleteHiddenTestCases extends z.infer<typeof HiddenTestCasesModel> {
  problem: CompleteProblems
}

/**
 * RelatedHiddenTestCasesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHiddenTestCasesModel: z.ZodSchema<CompleteHiddenTestCases> = z.lazy(() => HiddenTestCasesModel.extend({
  problem: RelatedProblemsModel,
}))
