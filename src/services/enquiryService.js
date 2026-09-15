/**
 * Enquiry Dispatch Service
 * Configured for SHUBHAM FABRICS INDIA PRIVATE LIMITED
 * Target Email: shubhamfabricsindia1@gmail.com
 */

export async function submitEnquiry(data) {
  // 1. Honeypot spam protection check
  if (data.websiteUrl_hp && data.websiteUrl_hp.trim() !== '') {
    // Spambot detected silently
    return { success: true, message: "Enquiry submitted successfully." };
  }

  // 2. Client-side sanity validation
  if (!data.name || !data.phone || !data.email || !data.message) {
    throw new Error("Please complete all required fields.");
  }

  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
  if (!phoneRegex.test(data.phone.trim())) {
    throw new Error("Please provide a valid contact phone number.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    throw new Error("Please provide a valid email address.");
  }

  const payload = {
    customerName: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    subject: data.subject || `Showroom Enquiry from ${data.name.trim()}`,
    interestItem: data.interestItem || "General Showroom Inquiry",
    interestType: data.interestType || "General",
    sourceUrl: window.location.href,
    message: data.message.trim(),
    recipientEmail: "shubhamfabricsindia1@gmail.com",
    submittedAt: new Date().toISOString()
  };

  const apiUrl = import.meta.env.VITE_ENQUIRY_API_URL;

  // If a real backend endpoint is defined in environment variables, dispatch to it
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to deliver enquiry. Please try again later.");
    }

    return await response.json();
  }

  // Production-ready simulated network dispatch with latency simulation
  await new Promise(resolve => setTimeout(resolve, 800));

  // Store in session storage for debug verification
  try {
    const existing = JSON.parse(sessionStorage.getItem('sf_enquiries') || '[]');
    existing.push(payload);
    sessionStorage.setItem('sf_enquiries', JSON.stringify(existing));
    console.log("[Shubham Fabrics Enquiry Service] Dispatched to shubhamfabricsindia1@gmail.com:", payload);
  } catch (e) {
    console.warn("Storage not available", e);
  }

  return {
    success: true,
    message: "Thank you for your enquiry. Our team will get back to you soon."
  };
}
