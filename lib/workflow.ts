import config from "./config";
import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";


type SendEmailProps = {
  email: string;
  subject: string;
  message: string;
  name?: string; // Optional, can be used for personalized messages
};

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});


export async function sendEmail({ name, email, subject, message }: SendEmailProps) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: config.env.emailjs.serviceId,
      template_id: config.env.emailjs.templateId,
      user_id: config.env.emailjs.publicKey,
      template_params: {
        to_email: email,
        subject,
        message,
        name
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Email sending failed: ${errorText}`);
  }

  return res.json();
}
