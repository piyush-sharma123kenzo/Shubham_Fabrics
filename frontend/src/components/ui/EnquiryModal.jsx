import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, ShieldCheck, Mail, Phone, User, KeyRound, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEnquiry } from '../../context/EnquiryContext';
import { sendEmailOtp, verifyEmailOtp, submitEnquiry } from '../../services/enquiryService';
import { companyInfo } from '../../data/companyInfo';

export default function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiry, enquiryContext } = useEnquiry();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    websiteUrl_hp: '' // Honeypot field (hidden)
  });

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'otp' | 'success'
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [submitResult, setSubmitResult] = useState(null);

  // Sync enquiry context when opened
  useEffect(() => {
    if (isEnquiryOpen) {
      setFormData(prev => ({
        ...prev,
        message: enquiryContext.initialMessage || (enquiryContext.item ? `Hello, I am interested in "${enquiryContext.item}". Please provide more details on fabric swatches, showroom availability, and craftsmanship.` : '')
      }));
      setStep('form');
      setStatus('idle');
      setErrorMessage('');
      setOtp('');
      setSubmitResult(null);
    }
  }, [isEnquiryOpen, enquiryContext]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isEnquiryOpen) {
        closeEnquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnquiryOpen, closeEnquiry]);

  if (!isEnquiryOpen) return null;

  // Step 1: Validate Form and Send OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please complete all required fields.");
      }

      await sendEmailOtp(formData.email, formData.name);
      setStep('otp');
      setStatus('idle');
      setResendTimer(30); // 30 second cooldown
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Failed to send verification code. Please check your email.");
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setStatus('loading');
    setErrorMessage('');

    try {
      await sendEmailOtp(formData.email, formData.name);
      setStatus('idle');
      setResendTimer(30);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Failed to resend code.");
    }
  };

  // Step 3: Verify OTP and Submit Enquiry
  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (!otp || otp.trim().length < 6) {
        throw new Error("Please enter the complete 6-digit verification code.");
      }

      const verifyRes = await verifyEmailOtp(formData.email, otp.trim());

      const res = await submitEnquiry({
        ...formData,
        interestItem: enquiryContext.item,
        interestType: enquiryContext.type
      }, verifyRes.verifiedToken);

      setSubmitResult(res);
      setStep('success');
      setStatus('idle');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#1F1E1D', '#F4EFE6', '#A65D4E']
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Verification failed. Please check the code.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
      websiteUrl_hp: ''
    });
    setOtp('');
    setStep('form');
    setStatus('idle');
    setSubmitResult(null);
    closeEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg bg-brand-ivory rounded-sm shadow-2xl border border-brand-sand overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-brand-charcoal text-brand-ivory px-6 py-4 flex items-center justify-between border-b border-brand-gold/30">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-brand-gold-light font-semibold block">
              Digital Showroom Enquiry
            </span>
            <h3 className="font-serif text-lg md:text-xl font-medium text-brand-ivory mt-0.5">
              SHUBHAM FABRICS
            </h3>
          </div>

          <button
            type="button"
            onClick={closeEnquiry}
            className="text-brand-ivory/70 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold-dark rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 stroke-[1.5]" />
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest font-semibold rounded-full inline-block">
                Email Verified &bull; Verified Customer
              </span>
              <h4 className="font-serif text-2xl text-brand-charcoal font-medium">
                Enquiry Successfully Verified
              </h4>
              <p className="text-sm text-brand-charcoal/80 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="font-medium">{formData.name}</strong>. Your enquiry regarding <strong className="font-medium">{enquiryContext.item || 'our showroom pieces'}</strong> has been delivered directly to our team at <span className="text-brand-gold-dark font-medium">{companyInfo.email}</span>.
              </p>
              <p className="text-xs text-brand-muted">
                Our representative will connect with you on your verified contact details within 24 business hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-3">
                {submitResult?.mailToFallback && (
                  <a
                    href={submitResult.mailToFallback}
                    className="w-full sm:w-auto px-5 py-2.5 bg-brand-gold-dark text-white text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-brand-charcoal transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Gmail / Mail App</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          )}

          {/* STEP: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyAndSubmit} className="space-y-5">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-brand-gold/15 text-brand-gold-dark rounded-full flex items-center justify-center mx-auto">
                  <KeyRound className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-xl text-brand-charcoal font-medium">
                  Enter Verification Code (OTP)
                </h4>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed max-w-sm mx-auto">
                  We've sent a 6-digit verification code to <strong className="text-brand-charcoal">{formData.email}</strong>. Please check your inbox or spam folder.
                </p>
              </div>

              {/* Error Banner */}
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 6-Digit OTP Input */}
              <div className="text-center py-2">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-48 text-center text-2xl tracking-[0.4em] font-mono py-2.5 px-3 bg-white border-2 border-brand-sand focus:border-brand-gold rounded-sm focus:outline-none transition-colors text-brand-charcoal font-bold"
                />
                <p className="text-[11px] text-brand-muted mt-2">Enter the 6-digit code</p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'loading' || otp.length < 6}
                className="w-full py-3 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify Code & Submit Enquiry</span>
                  </>
                )}
              </button>

              {/* Resend & Back Row */}
              <div className="flex items-center justify-between text-xs pt-1 text-brand-muted border-t border-brand-sand pt-3">
                <button
                  type="button"
                  onClick={() => { setStep('form'); setErrorMessage(''); }}
                  className="text-brand-charcoal hover:text-brand-gold-dark transition-colors"
                >
                  &larr; Change Details
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0 || status === 'loading'}
                  onClick={handleResendOtp}
                  className="flex items-center gap-1 text-brand-gold-dark hover:text-brand-charcoal transition-colors disabled:text-brand-muted cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP: INITIAL FORM */}
          {step === 'form' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              {/* Context Tag */}
              {enquiryContext.item && (
                <div className="bg-brand-cream border border-brand-sand px-3.5 py-2.5 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-brand-charcoal">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold-dark">
                      Regarding:
                    </span>
                    <span className="font-serif font-medium truncate max-w-[240px]">
                      {enquiryContext.item}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                    {enquiryContext.type || 'Showroom Piece'}
                  </span>
                </div>
              )}

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="websiteUrl_hp"
                value={formData.websiteUrl_hp}
                onChange={(e) => setFormData({ ...formData, websiteUrl_hp: e.target.value })}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Error Banner */}
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                  Your Full Name <span className="text-brand-terracotta">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                  />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                    Phone Number <span className="text-brand-terracotta">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                    Email Address <span className="text-brand-terracotta">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Enquiry Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                  Your Enquiry / Requirements <span className="text-brand-terracotta">*</span>
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal resize-none"
                  />
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Instant OTP verification ensures genuine client enquiries</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send OTP & Verify Email</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
