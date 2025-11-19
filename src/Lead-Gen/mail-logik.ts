import 'dotenv/config';
import nodemailer from 'nodemailer';
import type { ProcessedLead } from './types';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);

function createTransporter() {
  if (!process.env.MAIL_PASS) {
    throw new Error('MAIL_PASS must be configured');
  }

  return nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: "delo@recruitvoiceai.de",
      pass: process.env.MAIL_PASS,
    },
  });
}

export function createEmailTemplate(lead: ProcessedLead): { subject: string; html: string } {
  const subject = 'Recruit Voice AI - Revolutionieren Sie Ihr Recruiting';
  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Recruit Voice AI</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #fdfdfd; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #000000;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fdfdfd;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, rgba(142, 65, 239, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%); border-radius: 14px 14px 0 0;">
              <img src="/Logo-pic.png" alt="Recruit Voice AI" width="120" height="auto" style="display: block; margin: 0 auto 20px; max-width: 120px; height: auto;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #8e41ef; letter-spacing: -0.025em; line-height: 1.2;">
                RecruitVoiceAI
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #707070; font-weight: 400;">
                AI-Powered Recruiting
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #000000; letter-spacing: -0.025em; line-height: 1.3;">
                Hallo ${lead.companyName},
              </h2>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; line-height: 1.6;">
                Wir haben gesehen, dass Sie im Bereich Recruiting tätig sind und möchten Ihnen gerne unsere innovative Lösung vorstellen.
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #000000; line-height: 1.6;">
                <strong style="color: #8e41ef; font-weight: 600;">Recruit Voice AI</strong> revolutioniert die Art, wie Sie Kandidaten finden und kontaktieren. Mit unserer KI-gestützten Voice-Technologie können Sie:
              </p>
              
              <!-- Features List -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="padding: 0 0 16px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="24" valign="top" style="padding-top: 4px;">
                          <div style="width: 8px; height: 8px; background: linear-gradient(to right, rgb(142, 65, 239), rgba(168, 85, 247, 0.8)); border-radius: 50%;"></div>
                        </td>
                        <td style="padding-left: 16px; font-size: 16px; color: #000000; line-height: 1.6;">
                          Zeit sparen durch automatisierte Erstkontakte
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 16px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="24" valign="top" style="padding-top: 4px;">
                          <div style="width: 8px; height: 8px; background: linear-gradient(to right, rgb(142, 65, 239), rgba(168, 85, 247, 0.8)); border-radius: 50%;"></div>
                        </td>
                        <td style="padding-left: 16px; font-size: 16px; color: #000000; line-height: 1.6;">
                          Mehr Kandidaten erreichen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="24" valign="top" style="padding-top: 4px;">
                          <div style="width: 8px; height: 8px; background: linear-gradient(to right, rgb(142, 65, 239), rgba(168, 85, 247, 0.8)); border-radius: 50%;"></div>
                        </td>
                        <td style="padding-left: 16px; font-size: 16px; color: #000000; line-height: 1.6;">
                          Ihre Recruiting-Prozesse optimieren
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="background: linear-gradient(to right, rgb(142, 65, 239), rgba(168, 85, 247, 0.8)); border-radius: 14px; padding: 16px 32px;">
                          <a href="https://recruitvoiceai.de/kontakt" style="display: inline-block; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: -0.025em;">
                            Jetzt mehr erfahren
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 16px; color: #000000; line-height: 1.6;">
                Möchten Sie mehr erfahren? Wir freuen uns auf ein Gespräch mit Ihnen.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f7f7f7; border-radius: 0 0 14px 14px; border-top: 1px solid #ece9f0;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #707070; line-height: 1.5;">
                <strong style="color: #8e41ef; font-weight: 600;">Beste Grüße,</strong><br>
                Ihr Recruit Voice AI Team
              </p>
              <p style="margin: 24px 0 0 0; font-size: 12px; color: #707070; line-height: 1.5; border-top: 1px solid #ece9f0; padding-top: 24px;">
                <a href="https://recruitvoiceai.de" style="color: #8e41ef; text-decoration: none;">recruitvoiceai.de</a> | 
                <a href="https://recruitvoiceai.de/kontakt" style="color: #8e41ef; text-decoration: none;">Kontakt</a>
              </p>
            </td>
          </tr>
          
        </table>
        
        <!-- Spacer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #707070;">
                Diese E-Mail wurde an ${lead.email} gesendet.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
}

export async function sendEmail(lead: ProcessedLead): Promise<boolean> {
  if (!lead.email || !lead.isValid) {
    return false;
  }

  try {
    const transporter = createTransporter();
    const { subject, html } = createEmailTemplate(lead);

    await transporter.sendMail({
      from: "Recruit Voice AI <delo@recruitvoiceai.de>",
      to: lead.email,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error(`Failed to send email to ${lead.email}:`, error);
    return false;
  }
}

export async function sendEmails(leads: ProcessedLead[]): Promise<number> {
  let successCount = 0;

  for (const lead of leads) {
    try {
      const success = await sendEmail(lead);
      if (success) {
        successCount++;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to send email to ${lead.email}:`, error);
    }
  }

  return successCount;
}

/*
async function main(){
  console.log("want to send mail")
  await sendEmail({
    companyName: "Delo",
    email: "faragdelo@gmail.com",
    isValid: true,
    errors: [],
  })
  console.log("Email sent")
}

main()
*/
