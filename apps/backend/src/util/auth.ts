import { betterAuth } from "better-auth";
import prisma from "@repo/database/client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "@repo/email/mail";
import OtpTemplate from "@repo/email/template/OtpTemplate";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000"],
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 6000,
      async sendVerificationOTP({ email, otp, type }) {
        if (type == "sign-in") {
          console.log("signin ")
          sendEmail({
            to: email,
            react: OtpTemplate({ otp }),
            subject: "sign-in with otp"
          })
        } else if (type == "email-verification") {
          console.log("email email-verification")
          sendEmail({
            to: email,
            react: OtpTemplate({ otp }),
            subject: "email-verification Otp"
          })
          console.log("email-verification");
        } else if (type == "forget-password") {
          console.log("forgot password")
          sendEmail({
            to: email,
            react: OtpTemplate({ otp }),
            subject: "Otp for password forgot"
          })
        }
      },
    })
  ]
});
