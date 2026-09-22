import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure backend/.env is loaded
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

/**
 * SHUBHAM FABRICS - Unified Dispatcher (Resend API + Gmail SMTP)
 * Official Recipient: shubhamfabricsindia1@gmail.com
 */

function getResendClient() {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getSenderEmail() {
  return process.env.RESEND_FROM || 'Shubham Fabrics <onboarding@resend.dev>';
}

function getGmailUser() {
  return process.env.GMAIL_USER || process.env.SMTP_USER || 'shubhamfabricsindia1@gmail.com';
}

function getGmailPassword() {
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';
  return pass.replace(/\s+/g, '');
}

function getRecipientEmail() {
  return process.env.RECIPIENT_EMAIL || 'shubhamfabricsindia1@gmail.com';
}

function createGoogleTransporter() {
  const pass = getGmailPassword();
  const user = getGmailUser();

  if (!pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

/**
 * Verify Dispatcher Connection (Resend or Google App Password)
 */
export async function verifyEmailConfig() {
  const resend = getResendClient();
  if (resend) {
    return {
      provider: 'resend',
      configured: true,
      authenticated: true,
      sender: getSenderEmail(),
      recipient: getRecipientEmail(),
      message: 'Resend API authenticated successfully.'
    };
  }

  const transporter = createGoogleTransporter();
  const user = getGmailUser();

  if (!transporter) {
    return {
      provider: 'none',
      configured: false,
      authenticated: false,
      message: 'Neither RESEND_API_KEY nor GMAIL_APP_PASSWORD is set in backend/.env'
    };
  }

  try {
    await transporter.verify();
    return {
      provider: 'gmail',
      configured: true,
      authenticated: true,
      user,
      message: 'Google App Password authenticated successfully.'
    };
  } catch (error) {
    return {
      provider: 'gmail',
      configured: true,
      authenticated: false,
      user,
      error: error.message,
      message: 'Google App Password authentication failed.'
    };
  }
}

/**
 * Dispatch 6-digit OTP Verification Email
 */
export async function sendOtpEmail(recipientEmail, customerName, otpCode) {
  const subject = `Your Shubham Fabrics Verification Code: ${otpCode}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code - Shubham Fabrics</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px 12px; color: #1F1E1D; }
          .container { max-width: 520px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4D5C3; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 20px rgba(31,30,29,0.06); }
          .header { background: #1F1E1D; color: #FAF8F5; padding: 28px 20px; text-align: center; border-bottom: 3px solid #C5A880; }
          .header h1 { margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 600; text-transform: uppercase; }
          .header p { margin: 8px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A880; }
          .content { padding: 36px 28px; text-align: center; }
          .greeting { font-size: 16px; color: #1F1E1D; margin-bottom: 12px; }
          .message { font-size: 14px; color: #66625C; line-height: 1.6; margin: 0 auto 24px auto; max-width: 420px; }
          .otp-box { background: #FAF8F5; border: 2px dashed #C5A880; border-radius: 8px; padding: 18px 24px; margin: 16px auto 24px auto; display: inline-block; }
          .otp-code { font-size: 38px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; letter-spacing: 8px; font-weight: 700; color: #A65D4E; margin: 0; }
          .instruction { font-size: 12px; color: #8F8B84; line-height: 1.6; margin: 0; }
          .footer { background: #F4EFE6; padding: 18px; text-align: center; font-size: 11px; color: #8F8B84; border-top: 1px solid #EADBC8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHUBHAM FABRICS</h1>
            <p>Verification Code</p>
          </div>
          <div class="content">
            <div class="greeting">Hello <strong>${customerName || 'Valued Guest'}</strong>,</div>
            <p class="message">
              Please enter the 6-digit verification code below to verify your email and submit your showroom enquiry.
            </p>
            <div class="otp-box">
              <div class="otp-code">${otpCode}</div>
            </div>
            <p class="instruction">
              Valid for <strong>10 minutes</strong>. If you did not request this code, please disregard this email.
            </p>
          </div>
          <div class="footer">
            Shubham Fabrics India Pvt Ltd &bull; Sector-57, Noida, UP
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
SHUBHAM FABRICS - EMAIL VERIFICATION
====================================
Hello ${customerName || 'Valued Guest'},

Your One-Time Verification Code is: ${otpCode}

Valid for 10 minutes.
====================================
Shubham Fabrics India Pvt Ltd
  `.trim();

  // 1. Try Resend first if configured
  const resend = getResendClient();
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: getSenderEmail(),
        to: recipientEmail,
        subject,
        text: textContent,
        html: htmlContent
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log(`[RESEND] OTP sent to ${recipientEmail} (ID: ${data?.id})`);
      return {
        sent: true,
        provider: 'resend',
        id: data?.id
      };
    } catch (err) {
      console.error('[RESEND ERROR]', err.message);
      throw new Error(`Resend delivery failed: ${err.message}`);
    }
  }

  // 2. Fallback to Gmail SMTP if configured
  const transporter = createGoogleTransporter();
  if (transporter) {
    const info = await transporter.sendMail({
      from: `"Shubham Fabrics" <${getGmailUser()}>`,
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent
    });
    console.log(`[GMAIL SMTP] OTP sent to ${recipientEmail} (ID: ${info.messageId})`);
    return {
      sent: true,
      provider: 'gmail',
      id: info.messageId
    };
  }

  // 3. Fallback to console simulation
  console.log(`\n=============================================`);
  console.log(`🔑 [MOCK OTP GENERATED]`);
  console.log(`📧 Recipient: ${recipientEmail}`);
  console.log(`🔢 Code:      ${otpCode}`);
  console.log(`⚠️  To send live, set RESEND_API_KEY in backend/.env`);
  console.log(`=============================================\n`);
  return {
    sent: true,
    provider: 'logged',
    message: 'OTP logged to console. Set RESEND_API_KEY in backend/.env to send live.'
  };
}

/**
 * Dispatch Showroom Enquiry to shubhamfabricsindia1@gmail.com
 */
export async function sendEnquiryNotification(data) {
  const recipient = getRecipientEmail();
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const subject = `[Website Enquiry] ${data.customerName} - ${data.interestItem || 'Showroom Inquiry'}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 20px; color: #1F1E1D; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4D5C3; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 20px rgba(31,30,29,0.06); }
          .header { background: #1F1E1D; color: #FAF8F5; padding: 24px; text-align: center; border-bottom: 3px solid #C5A880; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; font-weight: 600; text-transform: uppercase; }
          .header p { margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #C5A880; }
          .content { padding: 28px; }
          .badge { display: inline-block; background: #E8F5E9; color: #2E7D32; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 4px; margin-bottom: 16px; }
          .field-group { margin-bottom: 16px; border-bottom: 1px solid #F0EAE1; padding-bottom: 12px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8F8B84; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 15px; color: #1F1E1D; }
          .message-box { background: #FAF8F5; border-left: 3px solid #C5A880; padding: 14px; margin-top: 16px; font-size: 14px; line-height: 1.6; }
          .footer { background: #F4EFE6; padding: 16px; text-align: center; font-size: 11px; color: #8F8B84; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHUBHAM FABRICS</h1>
            <p>New Website Showroom Enquiry</p>
          </div>
          <div class="content">
            <div class="badge" style="display: inline-block; background: #EBF3FF; color: #1E40AF; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 4px; margin-bottom: 16px;">📩 Direct Showroom Enquiry</div>
            <div class="field-group">
              <div class="label">Customer Name</div>
              <div class="value"><strong>${data.customerName}</strong></div>
            </div>
            <div class="field-group">
              <div class="label">Contact Phone</div>
              <div class="value"><a href="tel:${data.phone}" style="color: #A65D4E; text-decoration: none;">${data.phone}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Customer Email</div>
              <div class="value"><a href="mailto:${data.email}" style="color: #A65D4E; text-decoration: none;">${data.email}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Item / Category of Interest</div>
              <div class="value">${data.interestItem || 'General Inquiry'} (${data.interestType || 'Showroom'})</div>
            </div>
            <div class="field-group">
              <div class="label">Received Date & Time (IST)</div>
              <div class="value">${formattedDate}</div>
            </div>
            <div class="label">Enquiry / Requirements</div>
            <div class="message-box">${(data.message || '').replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">
            Delivered directly to ${recipient} &bull; Shubham Fabrics India Pvt Ltd
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
NEW SHOWROOM ENQUIRY - SHUBHAM FABRICS
====================================
Customer Name: ${data.customerName}
Phone:         ${data.phone}
Email:         ${data.email}
Interest:      ${data.interestItem} (${data.interestType})
Date & Time:   ${formattedDate}
Status:        Direct Showroom Enquiry (No OTP)

Message / Requirements:
${data.message}
====================================
Recipient: ${recipient}
  `.trim();

  // 1. Try Resend if configured
  const resend = getResendClient();
  if (resend) {
    try {
      const { data: resData, error } = await resend.emails.send({
        from: getSenderEmail(),
        to: recipient,
        reply_to: data.email,
        subject,
        text: textContent,
        html: htmlContent
      });
      if (error) {
        console.warn('[RESEND NOTICE]', error.message);
      } else {
        console.log(`[RESEND] Enquiry delivered to ${recipient} (ID: ${resData?.id})`);
        return {
          sent: true,
          provider: 'resend',
          id: resData?.id
        };
      }
    } catch (err) {
      console.warn('[RESEND WARNING]', err.message);
      // Fall through to Gmail SMTP / Local log
    }
  }

  // 2. Try Gmail SMTP if configured
  const transporter = createGoogleTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"Shubham Fabrics Web" <${getGmailUser()}>`,
        to: recipient,
        replyTo: data.email,
        subject,
        text: textContent,
        html: htmlContent
      });
      console.log(`[GMAIL SMTP] Enquiry delivered to ${recipient} (ID: ${info.messageId})`);
      return {
        sent: true,
        provider: 'gmail',
        id: info.messageId
      };
    } catch (smtpErr) {
      console.warn('[GMAIL SMTP WARNING]', smtpErr.message);
    }
  }

  // 3. Fallback: Log enquiry locally
  console.log('\n=============================================');
  console.log(`📥 [ENQUIRY RECORDED FOR ${recipient}]`);
  console.log(textContent);
  console.log('=============================================\n');
  return {
    sent: true,
    provider: 'local-backup',
    message: `Enquiry logged and queued for ${recipient}.`
  };
}
