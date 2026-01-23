import { createTransport } from "nodemailer";
import { NodemailerInput } from "./resend/types";
import { render, pretty } from "@react-email/render";

export default async function sendEmailViaNodemailer({ to, subject, react }: NodemailerInput) {
  const transporter = createTransport({
    //@ts-ignore
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },

  });


  return await transporter.sendMail({
    from: "noreply@example.com",
    to,
    subject,
    html: await pretty(await render(react))
  });
}
