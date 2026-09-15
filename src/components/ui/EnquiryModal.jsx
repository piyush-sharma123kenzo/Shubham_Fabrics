import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, ShieldCheck, Mail, Phone, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEnquiry } from '../../context/EnquiryContext';
import { submitEnquiry } from '../../services/enquiryService';
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

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  // Sync enquiry context when opened
  useEffect(() => {
    if (isEnquiryOpen) {
      setFormData(prev => ({
        ...prev,
        message: enquiryContext.initialMessage || (enquiryContext.item ? `Hello, I am interested in "${enquiryContext.item}". Please provide more details on fabric swatches, showroom availability, and craftsmanship.` : '')
      }));
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isEnquiryOpen, enquiryContext]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitEnquiry({
        ...formData,
        interestItem: enquiryContext.item,
        interestType: enquiryContext.type
      });

      setStatus('success');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#1F1E1D', '#F4EFE6', '#A65D4E']
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
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
    setStatus('idle');
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
          {status === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold-dark rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-2xl text-brand-charcoal font-medium">
                Thank you for your enquiry
              </h4>
              <p className="text-sm text-brand-charcoal/80 max-w-sm mx-auto leading-relaxed">
                Your request regarding <strong className="font-medium">{enquiryContext.item || 'our collections'}</strong> has been forwarded to our showroom team at <span className="text-brand-gold-dark font-medium">{companyInfo.email}</span>.
              </p>
              <p className="text-xs text-brand-muted">
                Our representative will reach out to you within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-brand-gold-dark transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="e.g. Radhika Sharma"
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
                      placeholder="+91 98765 43210"
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
                      placeholder="radhika@example.com"
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
                    placeholder="Tell us about the fabric swatches, sizing, custom design, or showroom viewing you would like to arrange..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal resize-none"
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Enquiries directly forwarded to <strong className="text-brand-charcoal">{companyInfo.email}</strong></span>
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
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Showroom Enquiry</span>
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
