import * as z from "zod"
import * as imports from "../../prisma/null"

export const AdminModel = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  otp: z.string(),
  isVerified: z.boolean(),
  otpExpiry: z.date(),
  password: z.string(),
  imageUrl: z.string().nullish(),
})
