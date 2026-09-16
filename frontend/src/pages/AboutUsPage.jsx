import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Feather, MapPin } from 'lucide-react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import { companyInfo } from '../data/companyInfo';
import { useEnquiry } from '../context/EnquiryContext';

export default function AboutUsPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="About Us — Our Heritage & Craftsmanship"
        description="Learn about Shubham Fabrics India Private Limited, our textile philosophy, craftsmanship standards, and digital showroom in Noida."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          subtitle="OUR STORY & PHILOSOPHY"
          title="About Shubham Fabrics"
          description="Where timeless fabrics meet contemporary expression. A legacy of Indian textiles, curated traditional women's wear, and uncompromising craftsmanship."
          alignment="center"
        />

        {/* Section 1: Who We Are (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal leading-tight">
              A Dedicated Textile House & Traditional Fashion Showroom
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed font-light">
              {companyInfo.legalName} is established with the commitment to showcase India's rich weaving traditions, master tailoring, and vibrant fabric heritage. Located in Sector-57, Noida, we serve discerning clients who appreciate the tactile luxury of authentic fabrics.
            </p>
            <p className="text-sm text-brand-charcoal/75 leading-relaxed font-light">
              Rather than treating clothing as fast fashion, we design and curate pieces that honor the legacy of Indian craftsmanship—from pure silks and breathable cottons to intricate Chikankari and festive zari weaves.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openEnquiry({ item: 'About Shubham Fabrics', type: 'General' })}
                className="px-6 py-3 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-brand-gold-dark transition-colors"
              >
                Connect with Our Team
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-lg border border-brand-sand">
              <img
                src="/fabric_silk.jpg"
                alt="Pure Silk Textiles at Shubham Fabrics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-lg border border-brand-sand translate-y-6 bg-brand-cream">
              <img
                src="/yellow_salwar_suit.jpg"
                alt="Embroidered Yellow Punjabi Salwar Suit"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Our Philosophy & Pillars */}
        <div className="my-24 py-16 px-8 sm:px-12 bg-brand-cream/80 border border-brand-sand rounded-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark block mb-2">
              OUR GUIDING PILLARS
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
              Craftsmanship, Quality & Vision
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-brand-sand/70 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-charcoal">
                Textile Excellence
              </h4>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                We select yarns and textiles based on natural breathability, weave density, tensile strength, and authentic drape, ensuring each garment stands the test of time.
              </p>
            </div>

            <div className="p-6 bg-white border border-brand-sand/70 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-charcoal">
                Indian Artisanal Mastery
              </h4>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                Supporting the traditional heritage of Indian embroideries, hand-block printing, and intricate zari embellishments while adapting them to comfortable modern wear.
              </p>
            </div>

            <div className="p-6 bg-white border border-brand-sand/70 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-charcoal">
                Thoughtful Silhouettes
              </h4>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                From regal 32-kali anarkalis to minimalist everyday linen co-ords, our cuts are designed for poise, ease of movement, and effortless grace.
              </p>
            </div>

            <div className="p-6 bg-white border border-brand-sand/70 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-brand-charcoal">
                Personalized Service
              </h4>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                We assist our patrons with custom fabric swatches, sizing advice, and showroom viewings through our direct enquiry service.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Legal & Registration Information Box */}
        <div className="p-8 bg-brand-charcoal text-brand-ivory rounded-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold-light font-semibold block">
                REGISTERED INDIAN ENTITY
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-brand-ivory font-medium">
                {companyInfo.legalName}
              </h4>
            </div>
            <div className="text-right md:text-right">
              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/60 block">
                GSTIN NUMBER
              </span>
              <span className="font-mono text-sm font-semibold text-brand-gold-light">
                {companyInfo.gstin}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-brand-ivory/80 pt-2">
            <div>
              <p className="font-semibold text-brand-gold-light uppercase tracking-wider text-[10px] mb-1">
                Principal Business Address
              </p>
              <p>{companyInfo.principalAddress.full}</p>
            </div>
            <div>
              <p className="font-semibold text-brand-ivory/50 uppercase tracking-wider text-[10px] mb-1">
                Additional Business Address
              </p>
              <p>{companyInfo.additionalAddress.full}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
