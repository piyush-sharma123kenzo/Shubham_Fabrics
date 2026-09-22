import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, ShieldCheck, CheckCircle, AlertCircle, Loader2, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import LeafletMap from '../components/ui/LeafletMap';
import { companyInfo } from '../data/companyInfo';
import { submitEnquiry } from '../services/enquiryService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    websiteUrl_hp: ''
  });

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please complete all required fields.");
      }

      const res = await submitEnquiry({
        ...formData,
        interestItem: "General Contact Page Inquiry",
        interestType: "Contact Page"
      });

      setSubmitResult(res);
      setStep('success');
      setStatus('idle');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#1F1E1D', '#F4EFE6', '#A65D4E']
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again.");
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
    setStep('form');
    setStatus('idle');
    setSubmitResult(null);
  };

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="Contact Us & Showroom Location"
        description="Visit Shubham Fabrics India Private Limited in Sector-57, Noida. Get directions, view our interactive showroom map, or submit an enquiry."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="Let's Connect"
          description="We welcome private showroom visits, textile consultations, bespoke dressmaking queries, and bulk fabric inquiries."
          alignment="center"
        />

        {/* Main Grid: Contact Info + Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left: Contact Info & Addresses (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Principal Business Address Card */}
            <div className="p-6 bg-brand-cream border border-brand-sand rounded-sm shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-gold-dark">
                  PRIMARY LOCATION
                </span>
                <span className="px-2 py-0.5 bg-brand-sand text-brand-charcoal text-[9px] uppercase tracking-wider rounded-sm font-semibold">
                  Showroom & HQ
                </span>
              </div>

              <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                Principal Business Address
              </h3>

              <div className="flex items-start gap-3 text-sm text-brand-charcoal/80 leading-relaxed font-light">
                <MapPin className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
                <p>{companyInfo.principalAddress.full}</p>
              </div>

              <div className="pt-2">
                <a
                  href={companyInfo.principalAddress.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-[0.18em] font-semibold rounded-sm hover:bg-brand-gold-dark transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span>Get Directions in Maps</span>
                </a>
              </div>
            </div>

            {/* Additional Business Address Card (Strictly Separated) */}
            <div className="p-6 bg-white border border-brand-sand rounded-sm space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-muted block">
                ADDITIONAL FACILITY
              </span>

              <h3 className="font-serif text-lg text-brand-charcoal font-medium">
                Additional Business Address
              </h3>

              <div className="flex items-start gap-3 text-sm text-brand-charcoal/80 leading-relaxed font-light">
                <MapPin className="w-5 h-5 text-brand-muted shrink-0 mt-0.5" />
                <p>{companyInfo.additionalAddress.full}</p>
              </div>
            </div>

            {/* Email & Business Hours */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-brand-charcoal">
                <div className="w-9 h-9 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-brand-muted font-medium">Enquiry Email</p>
                  <a href={`mailto:${companyInfo.email}`} className="font-medium hover:text-brand-gold-dark transition-colors">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-brand-charcoal">
                <div className="w-9 h-9 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-brand-muted font-medium">Visiting Hours</p>
                  <p className="font-light text-xs text-brand-charcoal/80">{companyInfo.businessHours}</p>
                </div>
              </div>
            </div>

            {/* Legal / GSTIN Details */}
            <div className="p-4 bg-brand-sand/30 border border-brand-sand rounded-sm text-xs text-brand-charcoal/80 space-y-1">
              <p><strong className="font-medium">Legal Company Name:</strong> {companyInfo.legalName}</p>
              <p><strong className="font-medium">GSTIN:</strong> <span className="font-mono text-brand-gold-dark font-semibold">{companyInfo.gstin}</span></p>
            </div>

          </div>

          {/* Right: Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-brand-cream/80 border border-brand-sand p-8 sm:p-10 rounded-sm shadow-md">
            
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-brand-gold-dark block mb-1">
                SUBMIT AN ENQUIRY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-normal">
                Let's Talk About Fabrics & Fashion
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/70 mt-1 font-light">
                Fill in the details below and your enquiry will be sent directly to our showroom team.
              </p>
            </div>

            {/* STEP: SUCCESS */}
            {step === 'success' && (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold-dark rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-widest font-semibold rounded-full inline-block">
                  Delivered Directly to Showroom
                </span>
                <h4 className="font-serif text-2xl text-brand-charcoal font-medium">
                  Enquiry Sent Successfully
                </h4>
                <p className="text-sm text-brand-charcoal/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="font-medium">{formData.name}</strong>. Your enquiry has been delivered directly to our showroom team at <span className="text-brand-gold-dark font-medium">{companyInfo.email}</span>.
                </p>
                <p className="text-xs text-brand-muted">
                  Our showroom representative will connect with you on your contact details within 24 business hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  {submitResult?.mailToFallback && (
                    <a
                      href={submitResult.mailToFallback}
                      className="w-full sm:w-auto px-6 py-2.5 bg-brand-gold-dark text-white text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-brand-charcoal transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Gmail / Mail App</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-brand-sand hover:text-brand-charcoal transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}

            {/* STEP: FORM ENTRY */}
            {step === 'form' && (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
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

                {status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                    Your Full Name <span className="text-brand-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                      Phone Number <span className="text-brand-terracotta">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                      Email Address <span className="text-brand-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-charcoal/80 mb-1">
                    Your Enquiry / Message <span className="text-brand-terracotta">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your requirements, fabrics of interest, or showroom visit preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 text-sm bg-white border border-brand-sand rounded-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors text-brand-charcoal resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Enquiries are delivered directly to shubhamfabricsindia1@gmail.com</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Enquiry to Showroom...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Interactive Showroom Map Section */}
        <div className="mt-16 pt-16 border-t border-brand-sand">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark block mb-2">
              SHOWROOM LOCATION
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
              Find Our Showroom on the Map
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70 max-w-xl mx-auto mt-2">
              Located at {companyInfo.principalAddress.full}. Interactive map with real-time navigation support.
            </p>
          </div>

          <LeafletMap />
        </div>

      </div>
    </div>
  );
}
