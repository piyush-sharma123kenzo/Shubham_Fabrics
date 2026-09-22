import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEnquiryNotification } from '../services/emailService.js';
import { verifiedTokens } from './otpRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const router = express.Router();

function saveEnquiryRecord(record) {
  try {
    let list = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      try {
        const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
        list = JSON.parse(raw);
      } catch (e) {
        list = [];
      }
    }
    list.unshift({
      id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      receivedAt: new Date().toISOString(),
      ...record
    });
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[BACKUP STORAGE WARNING]', err.message);
  }
}

/**
 * POST /api/enquiry
 * Receive showroom enquiry and dispatch email to shubhamfabricsindia1@gmail.com
 * Direct submission: no OTP required.
 */
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message, interestItem, interestType, verifiedToken, websiteUrl_hp } = req.body;

    // Honeypot spam trap
    if (websiteUrl_hp && websiteUrl_hp.trim() !== '') {
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    // Required fields check
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Phone, Email, Message).'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check optional OTP token if provided
    let isEmailVerified = false;
    if (verifiedToken && verifiedTokens.has(verifiedToken)) {
      const record = verifiedTokens.get(verifiedToken);
      if (record.email === normalizedEmail && Date.now() <= record.expiresAt) {
        isEmailVerified = true;
        verifiedTokens.delete(verifiedToken);
      }
    }

    const payload = {
      customerName: name.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      message: message.trim(),
      interestItem: interestItem || 'General Showroom Inquiry',
      interestType: interestType || 'Showroom',
      isVerified: isEmailVerified,
      directSubmission: true
    };

    // Save backup record to disk
    saveEnquiryRecord(payload);

    // Dispatch email notification to shubhamfabricsindia1@gmail.com
    const dispatchResult = await sendEnquiryNotification(payload);

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been delivered directly to Shubham Fabrics (shubhamfabricsindia1@gmail.com).',
      dispatchResult
    });
  } catch (error) {
    console.error('Error handling enquiry submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process enquiry. Please try again or contact us directly at shubhamfabricsindia1@gmail.com.',
      error: error.message
    });
  }
});

export default router;
