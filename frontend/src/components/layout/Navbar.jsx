import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, MapPin, Mail } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';
import { useEnquiry } from '../../context/EnquiryContext';
import logoIconDark from '../../assets/images/logo_icon.png';
import logoIconLight from '../../assets/images/logo_icon_light.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openSearch, openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-ivory/95 backdrop-blur-md shadow-sm border-b border-brand-sand/60 py-3.5'
            : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent text-brand-ivory py-5'
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-3 xl:gap-6">
            {/* Brand Logo with Official Transparent Emblem */}
            <Link to="/" className="group shrink-0 flex items-center gap-2.5 sm:gap-3 focus:outline-none">
              <img
                src={isScrolled ? logoIconDark : logoIconLight}
                alt="Shubham Fabrics India Pvt Ltd Logo"
                className="h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  const fallback = isScrolled ? '/logo_icon.png' : '/logo_icon_light.png';
                  if (e.currentTarget.src !== window.location.origin + fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
              <div className="flex flex-col text-left">
                <span className={`font-serif tracking-[0.14em] text-sm sm:text-base lg:text-lg font-semibold uppercase leading-tight whitespace-nowrap transition-colors ${
                  isScrolled ? 'text-brand-charcoal group-hover:text-brand-gold-dark' : 'text-brand-ivory group-hover:text-brand-gold-light'
                }`}>
                  Shubham Fabrics
                </span>
                <span className={`text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-medium leading-tight mt-0.5 whitespace-nowrap transition-colors ${
                  isScrolled ? 'text-brand-gold-dark' : 'text-brand-gold-light'
                }`}>
                  India Pvt Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links — Strictly Single Line & High Polish */}
            <nav className="hidden lg:flex items-center justify-center gap-3 lg:gap-3.5 xl:gap-5 2xl:gap-7 flex-1 max-w-4xl mx-2">
              {companyInfo.navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative whitespace-nowrap shrink-0 text-[10.5px] lg:text-[11px] xl:text-xs uppercase tracking-[0.12em] lg:tracking-[0.14em] xl:tracking-[0.18em] font-medium transition-colors py-2 px-0.5 ${
                      isActive
                        ? isScrolled
                          ? 'text-brand-gold-dark font-semibold'
                          : 'text-brand-gold-light font-semibold'
                        : isScrolled
                        ? 'text-brand-charcoal/80 hover:text-brand-charcoal'
                        : 'text-brand-ivory/90 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full transition-all duration-300" />
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center opacity-80" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Utility Actions */}
            <div className="shrink-0 flex items-center space-x-2.5 sm:space-x-3.5 xl:space-x-4">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search collections & fabrics"
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  isScrolled
                    ? 'text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-brand-sand/50'
                    : 'text-brand-ivory hover:text-brand-gold-light hover:bg-white/10'
                }`}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium">Search</span>
              </button>

              <button
                type="button"
                onClick={() => openEnquiry({ item: 'General Enquiry' })}
                className={`hidden sm:inline-flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                  isScrolled
                    ? 'border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory'
                    : 'border-white/40 text-brand-ivory hover:bg-white hover:text-brand-charcoal'
                }`}
              >
                <span>Enquiry</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-brand-charcoal' : 'text-brand-ivory'
                }`}
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-brand-ivory shadow-2xl flex flex-col justify-between p-6 sm:p-8 transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-brand-sand">
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider font-semibold text-brand-charcoal">
                  SHUBHAM FABRICS
                </span>
                <span className="text-[9px] tracking-widest text-brand-muted uppercase">Digital Showroom</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-brand-charcoal hover:text-brand-gold-dark rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-8 space-y-4">
              {companyInfo.navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center justify-between py-2 text-base font-serif tracking-wide border-b border-brand-sand/40 ${
                      isActive ? 'text-brand-gold-dark font-medium' : 'text-brand-charcoal hover:text-brand-gold-dark'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-brand-gold" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Info inside Drawer */}
          <div className="pt-6 border-t border-brand-sand space-y-3 text-xs text-brand-muted">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiry({ item: 'General Enquiry' });
              }}
              className="w-full py-3 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-widest font-medium rounded-full hover:bg-brand-gold-dark transition-colors mb-3"
            >
              Submit an Enquiry
            </button>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Sector-57, Noida, Uttar Pradesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{companyInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
