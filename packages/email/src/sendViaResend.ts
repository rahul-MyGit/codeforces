import { resend } from ".";
import { ResendEmailOptions } from "./resend/types";

export default async function sendEmailViaResend(options: ResendEmailOptions) {

  if (options.react) {
    console.log("sent react");
    const { data, error } = await resend!.emails.send({
      from: 'Nagmani <nagmani@email.nagmaniupadhyay.com.np>',
      to: options.to,
      subject: options.subject!,
      react: options.react,
    });
  } else if (options.html) {
    console.log("sent html");
    const { data, error } = await resend!.emails.send({
      from: 'Nagmani <nagmani@email.nagmaniupadhyay.com.np>',
      to: options.to,
      subject: options.subject!,
      react: options.react,
    });
  }
}
