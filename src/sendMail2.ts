import { SMTPClient, SendConfig } from "https://deno.land/x/denomailer/mod.ts";
import { readConfig } from "./readConfig.ts";

const connection = {
  hostname: readConfig("SMTP_HOST"),
  port: parseInt(readConfig("SMTP_PORT")),
  tls: !!readConfig("SMTP_TLS"),
  auth: {
    username: readConfig("SMTP_USER"),
    password: readConfig("SMTP_PASSWORD"),
  },
};

console.log(connection);

const client = new SMTPClient({
  debug: {
    log: true,
  },
  connection: {
    hostname: readConfig("SMTP_HOST"),
    port: parseInt(readConfig("SMTP_PORT")),
    tls: !!readConfig("SMTP_TLS"),
    auth: {
      username: readConfig("SMTP_USER"),
      password: readConfig("SMTP_PASSWORD"),
    },
  },
});

async function sendMail(to: string, subject: string, content: string, html?: string) {
  const mail: SendConfig = {
    to,
    subject,
    content,
    from: readConfig("MAIL_FROM"),
  };

  const mailCc = readConfig("MAIL_CC", false);
  const mailBcc = readConfig("MAIL_BCC", false);

  if (mailCc) {
    mail.cc = mailCc;
  }

  if (mailBcc) {
    mail.bcc = mailBcc;
  }

  if (html) {
    mail.html = html;
  }

  // console.log(mail);

  await client.send(mail);
}

export async function sendMassMail(
  tos: string[],
  subject: string,
  content: string
) {
  for (const to of tos) {
    console.log("Sending mail...");
    await sendMail(to, subject, content);
  }

  await client.close();
}
