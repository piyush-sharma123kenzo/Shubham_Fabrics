/**
 * Enquiry & OTP Verification Service
 * SHUBHAM FABRICS INDIA PRIVATE LIMITED
 * Official Recipient: shubhamfabricsindia1@gmail.com
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';

/**
 * 1. Send OTP Verification Code to Customer Email
 */
export async function sendEmailOtp(email, name) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  const response = await fetch(`${API_BASE_URL}/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), name: name?.trim() || 'Guest' })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send verification code. Please try again.');
  }

  return data;
}

/**
 * 2. Verify Customer Entered OTP Code
 */
export async function verifyEmailOtp(email, otp) {
  if (!email || !otp) {
    throw new Error('Please enter the 6-digit verification code.');
  }

  const response = await fetch(`${API_BASE_URL}/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), otp: otp.trim() })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Verification failed. Please check your code.');
  }

  return data; // returns { success: true, verifiedToken: "..." }
}

/**
 * 3. Submit Verified Enquiry to Shubham Fabrics
 */
export async function submitEnquiry(data, verifiedToken) {
  // Honeypot spam trap
  if (data.websiteUrl_hp && data.websiteUrl_hp.trim() !== '') {
    return { success: true, message: "Enquiry received." };
  }

  if (!data.name || !data.phone || !data.email || !data.message) {
    throw new Error("Please complete all required fields.");
  }

  const payload = {
    customerName: data.name.trim(),
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    interestItem: data.interestItem || "General Showroom Inquiry",
    interestType: data.interestType || "General",
    verifiedToken: verifiedToken || null,
    sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  const mailToFallback = generateMailto(payload);

  // Store in browser storage for safety
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(sessionStorage.getItem('sf_enquiries') || '[]');
      existing.push(payload);
      sessionStorage.setItem('sf_enquiries', JSON.stringify(existing));
    } catch (e) {}
  }

  try {
    const response = await fetch(`${API_BASE_URL}/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      return {
        success: true,
        message: result.message || "Your enquiry has been verified and delivered directly to shubhamfabricsindia1@gmail.com.",
        mailToFallback,
        payload
      };
    }
    throw new Error(result.message || 'Failed to submit enquiry.');
  } catch (err) {
    console.warn("Backend submit notice:", err.message);
    return {
      success: true,
      message: "Your enquiry details have been prepared for shubhamfabricsindia1@gmail.com.",
      mailToFallback,
      payload
    };
  }
}

/**
 * Generate Direct Mailto Link
 */
export function generateMailto(payload) {
  const emailSubject = `Showroom Enquiry: ${payload.interestItem} - ${payload.customerName}`;
  const emailBody = `Dear Shubham Fabrics,\n\nI would like to enquire about: ${payload.interestItem} (${payload.interestType})\n\nCustomer Details:\n- Name: ${payload.customerName}\n- Phone: ${payload.phone}\n- Email: ${payload.email}\n- Date: ${payload.submittedAt}\n\nEnquiry / Requirements:\n${payload.message}`;
  return `mailto:shubhamfabricsindia1@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}
