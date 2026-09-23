import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Compass, Feather, MapPin, Mail } from 'lucide-react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import FabricCard from '../components/ui/FabricCard';
import CategoryCard from '../components/ui/CategoryCard';
import { productsData } from '../data/products';
import { fabricsData } from '../data/fabrics';
import { clothingCategories } from '../data/categories';
import { companyInfo } from '../data/companyInfo';
import { useEnquiry } from '../context/EnquiryContext';
import whiteVioletDupattaImg from '../assets/images/white_violet_dupatta.jpg';

const heroSlides = [
  {
    id: 1,
    title: "SHUBHAM FABRICS",
    subtitle: "INDIA PRIVATE LIMITED",
    tagline: "Weaving Quality, Creating Trust",
    description: "Discover handcrafted suit sets, regal anarkalis, and pure luxury textiles curated with master craftsmanship.",
    image: "/suit_set_editorial.jpg",
    link: "/clothing/dresses"
  },
  {
    id: 2,
    title: "TIMELESS SILK & GEORGETTE",
    subtitle: "FESTIVE & CEREMONIAL EDITS",
    tagline: "Woven Splendour & Intricate Zari",
    description: "Graceful silhouettes tailored with timeless craftsmanship and modern sophistication.",
    image: "/hero_editorial.jpg",
    link: "/fall-in-love"
  },
  {
    id: 3,
    title: "HANDCRAFTED KURTIS & TEXTILES",
    subtitle: "EVERYDAY & FESTIVE EDITS",
    tagline: "Botanical Prints & Pure Weaves",
    description: "Explore graceful designer kurtis and the tactile world of India's finest natural yarn weaves.",
    image: "/kurti_editorial.jpg",
    link: "/clothing/kurtis"
  }
];

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const { openEnquiry } = useEnquiry();

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = productsData.filter(p => p.newArrival).slice(0, 4);
  const bestSellers = productsData.filter(p => p.bestSeller).slice(0, 4);

  return (
    <>
      <SEO
        title="Digital Showroom & Premium Textiles"
        description="Shubham Fabrics India Private Limited. Premium Indian textiles, traditional women's wear, suit sets, and pure fabrics digital showroom in Noida."
      />

      {/* 1. HERO SECTION (Matching Visual Mockup) */}
      <section className="relative h-screen min-h-[640px] w-full bg-brand-dark overflow-hidden text-brand-ivory flex items-center">
        {/* Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentHero ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.85]"
            />
            {/* Editorial Multi-layer Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
          <div className="max-w-2xl">
            <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-brand-gold-light mb-4 animate-fade-in">
              {heroSlides[currentHero].subtitle}
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[1.08] mb-4 text-brand-ivory drop-shadow-sm">
              {heroSlides[currentHero].title}
            </h1>

            <p className="text-lg sm:text-xl font-editorial italic text-brand-ivory/90 mb-3 tracking-wide">
              {heroSlides[currentHero].tagline}
            </p>

            <p className="text-xs sm:text-sm text-brand-ivory/75 max-w-lg mb-8 leading-relaxed font-light">
              {heroSlides[currentHero].description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={heroSlides[currentHero].link}
                className="px-8 py-3.5 bg-brand-ivory text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-light hover:text-brand-dark transition-all duration-300 inline-flex items-center gap-2 rounded-sm shadow-xl"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openEnquiry({ item: 'Hero Collection Preview' })}
                className="px-6 py-3.5 bg-white/10 backdrop-blur-md text-brand-ivory border border-white/30 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/20 transition-all rounded-sm"
              >
                Book Showroom Visit
              </button>
            </div>
          </div>
        </div>

        {/* Hero Slide Controls (Bottom Right) */}
        <div className="absolute bottom-10 right-6 sm:right-12 z-20 flex items-center gap-6 text-xs tracking-widest text-brand-ivory/80">
          <span className="font-editorial text-sm">
            0{currentHero + 1} &nbsp;/&nbsp; 0{heroSlides.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentHero((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="p-2 rounded-full border border-white/30 hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentHero((prev) => (prev + 1) % heroSlides.length)}
              className="p-2 rounded-full border border-white/30 hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION — "OUR WORLD" (Matching Mockup) */}
      <section className="py-20 md:py-28 bg-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Media: Suit Salwar Editorial Fashion Film */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] max-w-md mx-auto rounded-sm overflow-hidden shadow-2xl border border-brand-sand/80 bg-brand-charcoal group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/suit_salwar_walk_1.jpg"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000"
                >
                  <source src="/suit_salwar_walking.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right Editorial Text */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Subtle Decorative Floral Line Background */}
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8 hidden sm:block">
                <svg width="240" height="240" viewBox="0 0 200 200" fill="none" stroke="#C5A880" strokeWidth="1.5">
                  <path d="M100 20 C60 60 40 100 40 160 C100 160 140 140 180 100 C140 60 140 20 100 20 Z" />
                  <path d="M100 20 C100 80 120 120 160 140" />
                </svg>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  OUR WORLD
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-charcoal font-normal leading-tight">
                Where timeless fabrics meet contemporary expression.
              </h2>

              <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-light">
                Shubham Fabrics brings together quality textiles, thoughtful design, and Indian craftsmanship to create pieces that celebrate tradition and inspire modern living. We believe authentic textiles carry a living heritage of handlooms, dyes, and tactile elegance.
              </p>

              <div className="pt-2">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal hover:text-brand-gold-dark transition-colors group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-brand-gold-dark" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS — "Discover What's New" */}
      <section className="py-20 bg-brand-cream/50 border-t border-b border-brand-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  NEW ARRIVALS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
                Discover What's New
              </h2>
            </div>

            <Link
              to="/new-arrivals"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal hover:text-brand-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
            </Link>
          </div>

          {/* 4 Cards Grid matching PRD Mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. CLOTHING SECTION — "Traditional silhouettes, thoughtfully reimagined." */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  CLOTHING
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
                Traditional silhouettes, thoughtfully reimagined.
              </h2>
            </div>

            <Link
              to="/clothing"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal hover:text-brand-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore All Silhouettes</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
            </Link>
          </div>

          {/* 8 Categories Grid matching Mockup */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {clothingCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. FABRICS SECTION — "Textures that define every creation." */}
      <section className="py-24 bg-brand-cream/60 border-t border-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  FABRICS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
                Textures that define every creation.
              </h2>
            </div>

            <Link
              to="/fabrics"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal hover:text-brand-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore All Fabrics</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
            </Link>
          </div>

          {/* 7 Fabrics Swatch Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {fabricsData.map((fabric) => (
              <FabricCard key={fabric.id} fabric={fabric} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. BEST SELLERS — "Our Most Loved Pieces" */}
      <section className="py-24 bg-brand-ivory border-t border-brand-sand/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  BEST SELLERS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
                Our Most Loved Pieces
              </h2>
            </div>

            <Link
              to="/best-sellers"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal hover:text-brand-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 7. FALL IN LOVE — SIGNATURE EDITORIAL BANNER (Matching Mockup) */}
      <section className="relative py-28 md:py-36 bg-brand-dark text-brand-ivory overflow-hidden">
        {/* Full-bleed Fashion Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={whiteVioletDupattaImg}
            alt="Fall in Love Editorial - Premium White and Violet Dupatta"
            className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.9] contrast-[1.03]"
            onError={(e) => {
              if (e.currentTarget.src !== window.location.origin + '/white_violet_dupatta.jpg') {
                e.currentTarget.src = '/white_violet_dupatta.jpg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-5">
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-brand-gold-light">
              FALL IN LOVE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-tight text-brand-ivory">
              Colours. Textures. Silhouettes.
            </h2>
            <p className="text-sm sm:text-base text-brand-ivory/80 leading-relaxed font-light">
              Discover pieces that turn ordinary moments into something unforgettable. An intimate exploration of pure luxury textiles and graceful heritage cuts.
            </p>
            <div className="pt-3">
              <Link
                to="/fall-in-love"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-light transition-colors rounded-sm shadow-xl"
              >
                <span>Explore Editorial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CRAFTED WITH PURPOSE (4 Brand Values) */}
      <section className="py-16 bg-brand-cream/80 border-b border-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold-dark mb-10">
            CRAFTED WITH PURPOSE
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {companyInfo.values.map((v) => (
              <div key={v.title} className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-sand/60 text-brand-gold-dark flex items-center justify-center border border-brand-gold/30">
                  <Sparkles className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium text-brand-charcoal">
                  {v.title}
                </h3>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed max-w-xs">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ABOUT SHUBHAM FABRICS (Legacy Split Section matching Mockup) */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Fabric Bolts Imagery */}
            <div className="lg:col-span-4">
              <div className="aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden shadow-lg border border-brand-sand bg-brand-cream">
                <img
                  src="/artisanal_fabrics_hero.jpg"
                  alt="Shubham Fabrics Rolls and Bolts"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Center Editorial Text */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-4 px-2">
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-brand-gold-dark block">
                ABOUT SHUBHAM FABRICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-medium">
                More Than Just Fabrics, It's a Legacy.
              </h2>
              <p className="text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed font-light">
                Founded with a vision to bring the richness of Indian textiles to modern wardrobes, Shubham Fabrics is a celebration of craftsmanship, quality, and timeless style.
              </p>
              <div className="pt-2">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal hover:text-brand-gold-dark transition-colors"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
                </Link>
              </div>
            </div>

            {/* Right Fashion Photography */}
            <div className="lg:col-span-4">
              <div className="aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden shadow-lg border border-brand-sand bg-brand-cream">
                <img
                  src="/sharara_peach.jpg"
                  alt="Graceful Traditional Women's Fashion"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. SHOWROOM VISIT & QUICK ENQUIRY CALLOUT */}
      <section className="py-20 bg-brand-charcoal text-brand-ivory border-t border-brand-sand/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-light">
            VISIT OUR DIGITAL SHOWROOM & NOIDA LOCATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-brand-ivory">
            Experience the Fabrics in Person
          </h2>
          <p className="text-sm text-brand-ivory/70 max-w-xl mx-auto leading-relaxed">
            Our showroom in Sector-57, Noida welcomes bespoke enquiries, bulk textile sourcing inquiries, and appointments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-lg"
            >
              Showroom Location & Directions
            </Link>
            <button
              onClick={() => openEnquiry({ item: 'Showroom Visit' })}
              className="px-8 py-3.5 bg-transparent border border-brand-gold/50 text-brand-ivory hover:bg-white/10 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm"
            >
              Submit an Enquiry
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
