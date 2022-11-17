import { SmtpClient as SMTPClient, SendConfig, ConnectConfigWithAuthentication } from "https://raw.githubusercontent.com/fashiontale/deno-smtp/attachments/mod.ts";
import { readConfig } from "./readConfig.ts";

const connection : ConnectConfigWithAuthentication = {
  hostname: readConfig("SMTP_HOST"),
  port: parseInt(readConfig("SMTP_PORT")),
  username: readConfig("SMTP_USER"),
  password: readConfig("SMTP_PASSWORD"),
};

const client = new SMTPClient();

await client.connect(connection);

async function sendMail(to: string, subject: string, content: string, html?: string) {
  const mail: SendConfig = {
    to,
    subject,
    content,
    from: readConfig("MAIL_FROM"),
    html: ""
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
