import nodemailer from 'nodemailer';

const RECIPIENT = process.env.RECIPIENT_EMAIL || 'shubhamfabricsindia1@gmail.com';

/**
 * Configure Nodemailer Transporter
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const user = process.env.SMTP_USER || 'shubhamfabricsindia1@gmail.com';
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    return null; // SMTP credentials not yet provided in .env
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

/**
 * Dispatch 6-digit OTP Verification Email to Customer
 */
export async function sendOtpEmail(recipientEmail, customerName, otpCode) {
  const transporter = createTransporter();
  const subject = `Your Shubham Fabrics Verification Code: ${otpCode}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 20px; color: #1F1E1D; }
          .container { max-width: 540px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4D5C3; border-radius: 4px; overflow: hidden; text-align: center; }
          .header { background: #1F1E1D; color: #FAF8F5; padding: 26px 20px; border-bottom: 3px solid #C5A880; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 2.5px; font-weight: 500; }
          .header p { margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #EADBC8; }
          .content { padding: 36px 28px; }
          .greeting { font-size: 16px; color: #1F1E1D; margin-bottom: 12px; }
          .otp-box { background: #FAF8F5; border: 2px dashed #C5A880; border-radius: 6px; padding: 18px 24px; margin: 24px auto; display: inline-block; }
          .otp-code { font-size: 36px; font-family: monospace; letter-spacing: 8px; font-weight: 700; color: #A65D4E; margin: 0; }
          .instruction { font-size: 13px; color: #66625C; line-height: 1.6; margin-top: 18px; }
          .footer { background: #F4EFE6; padding: 16px; font-size: 11px; color: #8F8B84; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHUBHAM FABRICS</h1>
            <p>Digital Showroom Verification</p>
          </div>
          <div class="content">
            <div class="greeting">Hello <strong>${customerName || 'Valued Guest'}</strong>,</div>
            <p style="color: #66625C; font-size: 14px; margin: 0;">
              Please use the one-time verification code below to verify your email address and submit your showroom enquiry.
            </p>
            <div class="otp-box">
              <div class="otp-code">${otpCode}</div>
            </div>
            <p class="instruction">
              This code is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.
            </p>
          </div>
          <div class="footer">
            Shubham Fabrics India Pvt Ltd &bull; Sector-57, Noida
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

Please enter this code on the website to verify your enquiry. This code is valid for 10 minutes.
====================================
Shubham Fabrics India Pvt Ltd
  `.trim();

  if (!transporter) {
    console.log(`\n=============================================`);
    console.log(`🔑 [OTP VERIFICATION CODE GENERATED]`);
    console.log(`📧 Recipient: ${recipientEmail}`);
    console.log(`🔢 Code:      ${otpCode}`);
    console.log(`=============================================\n`);
    return {
      sent: true,
      mode: 'logged',
      message: `OTP generated for ${recipientEmail}`
    };
  }

  const info = await transporter.sendMail({
    from: `"Shubham Fabrics" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject,
    text: textContent,
    html: htmlContent
  });

  console.log(`[BACKEND OTP EMAIL] Sent verification code to ${recipientEmail}, ID: ${info.messageId}`);
  return {
    sent: true,
    messageId: info.messageId,
    mode: 'smtp'
  };
}

/**
 * Dispatch enquiry notification email
 */
export async function sendEnquiryNotification(data) {
  const transporter = createTransporter();

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
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 20px; color: #1F1E1D; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4D5C3; border-radius: 4px; overflow: hidden; }
          .header { background: #1F1E1D; color: #FAF8F5; padding: 24px; text-align: center; border-bottom: 3px solid #C5A880; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; font-weight: 500; }
          .header p { margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #EADBC8; }
          .content { padding: 28px; }
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
            Delivered directly to ${RECIPIENT} &bull; Shubham Fabrics India Pvt Ltd
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

Message / Requirements:
${data.message}
====================================
Recipient: ${RECIPIENT}
  `.trim();

  if (!transporter) {
    console.log('\n[BACKEND EMAIL DISPATCHER - READY]');
    console.log(`Enquiry received for ${RECIPIENT}:`);
    console.log(textContent);
    console.log('\n(Note: To enable live SMTP delivery via Gmail, add SMTP_PASS in backend/.env)\n');
    return {
      sent: false,
      mode: 'logged',
      message: `Enquiry logged successfully. Ready for SMTP forwarding to ${RECIPIENT}.`
    };
  }

  const info = await transporter.sendMail({
    from: `"Shubham Fabrics Web" <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: data.email,
    subject,
    text: textContent,
    html: htmlContent
  });

  console.log(`[BACKEND EMAIL] Sent message ID: ${info.messageId} to ${RECIPIENT}`);
  return {
    sent: true,
    messageId: info.messageId,
    mode: 'smtp'
  };
}
