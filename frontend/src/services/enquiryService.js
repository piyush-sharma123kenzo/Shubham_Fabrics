/**
 * Enquiry Dispatch Service
 * SHUBHAM FABRICS INDIA PRIVATE LIMITED
 * Official Recipient: shubhamfabricsindia1@gmail.com
 */

export async function submitEnquiry(data) {
  // 1. Honeypot spam protection check
  if (data.websiteUrl_hp && data.websiteUrl_hp.trim() !== '') {
    // Spambot detected silently
    return { success: true, message: "Enquiry received." };
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
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    subject: data.subject || `Showroom Enquiry from ${data.name.trim()}`,
    interestItem: data.interestItem || "General Showroom Inquiry",
    interestType: data.interestType || "General",
    sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    message: data.message.trim(),
    recipientEmail: "shubhamfabricsindia1@gmail.com",
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  // Pre-generate mailto fallback for direct sending
  const emailSubject = `Showroom Enquiry: ${payload.interestItem} - ${payload.customerName}`;
  const emailBody = `Dear Shubham Fabrics,\n\nI would like to enquire about: ${payload.interestItem} (${payload.interestType})\n\nCustomer Details:\n- Name: ${payload.customerName}\n- Phone: ${payload.phone}\n- Email: ${payload.email}\n- Date: ${payload.submittedAt}\n\nEnquiry / Requirements:\n${payload.message}\n\nWebsite Source: ${payload.sourceUrl}`;
  const mailToFallback = `mailto:shubhamfabricsindia1@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Store in session storage for local tracking
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(sessionStorage.getItem('sf_enquiries') || '[]');
      existing.push(payload);
      sessionStorage.setItem('sf_enquiries', JSON.stringify(existing));
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }

  // 3. First Try: Node.js / Express Backend Server
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/enquiry';
  try {
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (backendResponse.ok) {
      const backendResult = await backendResponse.json();
      return {
        success: true,
        source: 'backend',
        message: backendResult.message || "Your enquiry has been dispatched directly to shubhamfabricsindia1@gmail.com.",
        mailToFallback,
        payload
      };
    }
  } catch (backendErr) {
    console.info("Backend API offline or unreachable, falling back to serverless form gateway:", backendErr.message);
  }

  // 4. Second Try: Serverless FormSubmit Gateway Fallback
  const formSubmitEndpoint = "https://formsubmit.co/ajax/shubhamfabricsindia1@gmail.com";
  try {
    const response = await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `Showroom Enquiry: ${payload.customerName} - ${payload.interestItem}`,
        _captcha: "false",
        _template: "table",
        "Customer Name": payload.customerName,
        "Phone Number": payload.phone,
        "Customer Email": payload.email,
        "Interested Item / Category": payload.interestItem,
        "Inquiry Type": payload.interestType,
        "Message / Requirement": payload.message,
        "Page URL": payload.sourceUrl,
        "Submitted At (IST)": payload.submittedAt
      })
    });

    const result = await response.json().catch(() => ({}));
    const isActivationNeeded = result && typeof result.message === 'string' && result.message.toLowerCase().includes('activation');

    return {
      success: true,
      source: 'formsubmit',
      needsActivation: isActivationNeeded,
      apiMessage: result.message || "",
      message: isActivationNeeded 
        ? "FormSubmit sent an 'Activate Form' confirmation email to shubhamfabricsindia1@gmail.com. Please check your Gmail to click 'Activate Form' once."
        : "Your enquiry has been dispatched directly to shubhamfabricsindia1@gmail.com.",
      mailToFallback,
      payload
    };
  } catch (formSubmitErr) {
    console.warn("FormSubmit gateway unreachable, providing mailto fallback:", formSubmitErr);
    return {
      success: true,
      source: 'offline',
      needsActivation: false,
      message: "Enquiry recorded. You can also send directly via Gmail/Email client below.",
      mailToFallback,
      payload
    };
  }
}
