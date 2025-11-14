import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: "delo@recruitvoiceai.de",
      pass: process.env.MAIL_PASS
    }
  });
  
  export default async function sendMailToMe({subject, text, attachments}: {subject: string, text: string, attachments?: { filename: string, content: string | Buffer }[]}) {
    try {
      const info = await transporter.sendMail({
        from: `"RecruitAI" <delo@recruitvoiceai.de>`,
        to: `faragdelo@gmail.com`,
        subject,
        text,
        attachments
      });
      console.log("Mail sent:", info.messageId);
      return info;
    } catch (err) {
      console.error("Error sending mail:", err);
      throw err;
    }
  }