import express from 'express';
import { sendEnquiryNotification } from '../services/emailService.js';
import { verifiedTokens } from './otpRoutes.js';

const router = express.Router();

/**
 * POST /api/enquiry
 * Handle website showroom enquiry submissions with verified OTP
 */
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message, interestItem, interestType, verifiedToken, websiteUrl_hp } = req.body;

    // Honeypot spam trap
    if (websiteUrl_hp && websiteUrl_hp.trim() !== '') {
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    // Validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (name, phone, email, message).'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verify OTP token if provided
    let isEmailVerified = false;
    if (verifiedToken && verifiedTokens.has(verifiedToken)) {
      const record = verifiedTokens.get(verifiedToken);
      if (record.email === normalizedEmail && Date.now() <= record.expiresAt) {
        isEmailVerified = true;
        // Invalidate token after single use
        verifiedTokens.delete(verifiedToken);
      }
    }

    const payload = {
      customerName: name.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      message: message.trim(),
      interestItem: interestItem || 'General Showroom Inquiry',
      interestType: interestType || 'General',
      isVerified: isEmailVerified,
      verificationBadge: isEmailVerified ? '✅ VERIFIED CUSTOMER (OTP Confirmed)' : 'Unverified'
    };

    const dispatchResult = await sendEnquiryNotification(payload);

    return res.status(200).json({
      success: true,
      isVerified: isEmailVerified,
      message: 'Your enquiry has been verified and delivered to shubhamfabricsindia1@gmail.com.',
      dispatchResult
    });
  } catch (error) {
    console.error('Error handling enquiry submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process enquiry. Please try again later or contact us directly via email.',
      error: error.message
    });
  }
});

export default router;
