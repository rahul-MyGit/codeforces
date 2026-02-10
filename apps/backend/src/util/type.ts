
export type TestCaseVerdict =
  | "accepted"        // status.id 3
  | "wrong_answer"    // status.id 4
  | "tle"             // status.id 5
  | "compilation_error" // status.id 6
  | "runtime_error"   // status.id 7-12
  | "internal_error"  // status.id 13-14

export type TestCase = {
  id: string
  input: string
  expectedOutput: string
  actualOutput?: string
  status?: "passed" | "failed" | "pending"
  verdict?: TestCaseVerdict
  stderr?: string
  compileOutput?: string
  time?: string
  memory?: number
}
