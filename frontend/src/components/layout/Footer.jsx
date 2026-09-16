import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowUpRight, ArrowRight, Send } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';
import { useEnquiry } from '../../context/EnquiryContext';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { openEnquiry } = useEnquiry();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-ivory pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/logo_icon_light.png"
                  alt="Shubham Fabrics India Pvt Ltd"
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <span className="font-serif tracking-[0.14em] text-xl sm:text-2xl font-bold uppercase block text-brand-ivory leading-tight">
                    Shubham Fabrics
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-brand-gold-light font-semibold block leading-tight mt-0.5">
                    India Pvt Ltd
                  </span>
                </div>
              </div>
              <p className="text-xs tracking-[0.22em] uppercase text-brand-ivory/70 font-light">
                {companyInfo.tagline}
              </p>
            </div>
            
            <p className="text-sm text-brand-ivory/70 leading-relaxed font-light pr-4">
              {companyInfo.subTagline} Curating premium natural fabrics, regal suit sets, and timeless women's traditional silhouettes in Noida, India.
            </p>

            {/* Quick Enquiry Prompt */}
            <div className="pt-2">
              <button
                onClick={() => openEnquiry({ item: 'Showroom Visit & Inquiry' })}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-brand-gold-light hover:text-white transition-colors group"
              >
                <span>Book a Showroom Viewing</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-light">
              Showroom
            </p>
            <ul className="space-y-2.5 text-sm text-brand-ivory/75">
              {companyInfo.navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-brand-gold-light transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections / Fabrics Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-light">
              Discover
            </p>
            <ul className="space-y-2.5 text-sm text-brand-ivory/75">
              <li>
                <Link to="/fall-in-love" className="hover:text-brand-gold-light transition-colors">
                  Fall in Love
                </Link>
              </li>
              <li>
                <Link to="/clothing/dresses" className="hover:text-brand-gold-light transition-colors">
                  Suit Sets & Dresses
                </Link>
              </li>
              <li>
                <Link to="/fabrics" className="hover:text-brand-gold-light transition-colors">
                  Pure Textiles
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-brand-gold-light transition-colors">
                  About Our House
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold-light transition-colors">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Address & Legal Information (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-light">
              Locations & Verification
            </p>
            
            {/* Principal Address */}
            <div className="text-xs text-brand-ivory/80 space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold-light/90 block">
                Principal Business Address
              </span>
              <p className="leading-relaxed">
                {companyInfo.principalAddress.full}
              </p>
              <a
                href={companyInfo.principalAddress.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-brand-gold hover:underline pt-1"
              >
                <span>Get Directions via Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Additional Business Address */}
            <div className="text-xs text-brand-ivory/70 space-y-1 pt-1 border-t border-white/5">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-ivory/50 block">
                Additional Business Address
              </span>
              <p className="leading-relaxed">
                {companyInfo.additionalAddress.full}
              </p>
            </div>

            {/* Legal & GSTIN */}
            <div className="pt-2 text-xs text-brand-ivory/60 space-y-1">
              <p>
                <strong className="text-brand-ivory/90 font-normal">Legal Entity:</strong> {companyInfo.legalName}
              </p>
              <p>
                <strong className="text-brand-gold-light font-medium">GSTIN:</strong> {companyInfo.gstin}
              </p>
              <p>
                <strong className="text-brand-ivory/90 font-normal">Enquiries:</strong> {companyInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-ivory/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-xs text-brand-ivory/60">
            <span className="hover:text-brand-ivory cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-brand-ivory cursor-pointer">Terms & Conditions</span>
            <span>&bull;</span>
            <span className="text-brand-gold-light/80">Digital Showroom</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
