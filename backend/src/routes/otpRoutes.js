import express from 'express';
import crypto from 'crypto';
import { sendOtpEmail } from '../services/emailService.js';

const router = express.Router();

// In-memory store for OTPs (email -> { code, expiresAt, attempts })
const activeOtps = new Map();

// In-memory store for verified tokens (token -> { email, expiresAt })
export const verifiedTokens = new Map();

/**
 * Clean up expired records every 5 minutes
 */
setInterval(() => {
  const now = Date.now();
  for (const [email, record] of activeOtps.entries()) {
    if (now > record.expiresAt) activeOtps.delete(email);
  }
  for (const [token, record] of verifiedTokens.entries()) {
    if (now > record.expiresAt) verifiedTokens.delete(token);
  }
}, 5 * 60 * 1000);

/**
 * POST /api/otp/send
 * Request 6-digit verification code sent to customer email
 */
router.post('/send', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check rate limit: 1 OTP per 30 seconds per email
    const existing = activeOtps.get(normalizedEmail);
    if (existing && existing.createdAt && (Date.now() - existing.createdAt < 30 * 1000)) {
      const waitSec = Math.ceil((30 * 1000 - (Date.now() - existing.createdAt)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSec} seconds before requesting another code.`
      });
    }

    // Generate random 6-digit code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    activeOtps.set(normalizedEmail, {
      code: otpCode,
      createdAt: Date.now(),
      expiresAt,
      attempts: 0
    });

    await sendOtpEmail(normalizedEmail, name || 'Guest', otpCode);

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${normalizedEmail}. Please check your inbox or spam folder.`
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send verification code. Please try again.',
      error: error.message
    });
  }
});

/**
 * POST /api/otp/verify
 * Validate 6-digit verification code entered by customer
 */
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email address and 6-digit verification code are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    const record = activeOtps.get(normalizedEmail);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'No verification code found for this email. Please request a new code.'
      });
    }

    if (Date.now() > record.expiresAt) {
      activeOtps.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new code.'
      });
    }

    if (record.attempts >= 5) {
      activeOtps.delete(normalizedEmail);
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect attempts. Please request a fresh code.'
      });
    }

    if (record.code !== cleanOtp) {
      record.attempts += 1;
      return res.status(400).json({
        success: false,
        message: `Incorrect verification code. ${5 - record.attempts} attempts remaining.`
      });
    }

    // Success: Consume OTP and create verified session token
    activeOtps.delete(normalizedEmail);
    const verifiedToken = crypto.randomBytes(24).toString('hex');
    verifiedTokens.set(verifiedToken, {
      email: normalizedEmail,
      verifiedAt: Date.now(),
      expiresAt: Date.now() + 30 * 60 * 1000 // Valid for 30 minutes to submit form
    });

    return res.status(200).json({
      success: true,
      verifiedToken,
      message: 'Email verified successfully!'
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Verification failed. Please try again.',
      error: error.message
    });
  }
});

export default router;
