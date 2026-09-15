import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, MessageSquare, Maximize2, ShieldCheck, Check, Layers, ChevronRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Lightbox from '../components/ui/Lightbox';
import ProductCard from '../components/ui/ProductCard';
import { productsData } from '../data/products';
import { fabricsData } from '../data/fabrics';
import { useEnquiry } from '../context/EnquiryContext';

export default function ClothingDetailPage() {
  const { category, slug } = useParams();
  const { openEnquiry } = useEnquiry();

  const product = productsData.find(p => p.slug === slug) || productsData[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const fabricObj = fabricsData.find(f => f.slug === product.fabricSlug || f.name.toLowerCase() === product.fabric.toLowerCase());

  const relatedProducts = productsData
    .filter(p => p.id !== product.id && (p.category === product.category || p.fabric === product.fabric))
    .slice(0, 4);

  const images = product.images || [];

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title={`${product.name} — ${product.collection}`}
        description={product.description}
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={images}
        currentIndex={activeImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
        onNext={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
        title={product.name}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-wider text-brand-muted mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-brand-charcoal">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link to="/clothing" className="hover:text-brand-charcoal">Clothing</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link to={`/clothing/${product.category}`} className="hover:text-brand-charcoal">{product.categoryName}</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-brand-charcoal font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Hero Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image with Zoom trigger */}
            <div className="relative aspect-[4/5] bg-brand-cream rounded-sm overflow-hidden shadow-md group">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-top cursor-zoom-in transition-transform duration-500 hover:scale-105"
                onClick={() => setIsLightboxOpen(true)}
              />
              
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-brand-dark/70 hover:bg-brand-dark text-brand-ivory rounded-full backdrop-blur-sm transition-colors"
                aria-label="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {product.newArrival && (
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-dark text-brand-ivory text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-sm">
                    New Arrival
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-[4/5] rounded-sm overflow-hidden border-2 transition-all ${
                      activeImageIndex === index
                        ? 'border-brand-gold-dark ring-2 ring-brand-gold/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Enquiry Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark">
                  {product.collection}
                </span>
                <span className="text-brand-muted">&bull;</span>
                <span className="text-xs uppercase tracking-[0.18em] text-brand-muted">
                  {product.categoryName}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-medium leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Fabric Link Box */}
            <div className="p-4 bg-brand-cream border border-brand-sand rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-sand/70 text-brand-gold-dark flex items-center justify-center font-serif text-sm font-semibold">
                  {product.fabric?.[0] || 'F'}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-brand-muted">
                    Primary Textile
                  </p>
                  <p className="font-serif text-base text-brand-charcoal font-medium">
                    Pure {product.fabric}
                  </p>
                </div>
              </div>

              {fabricObj && (
                <Link
                  to={`/fabrics/${fabricObj.slug}`}
                  className="text-xs uppercase tracking-wider text-brand-gold-dark hover:underline font-semibold"
                >
                  Explore Fabric &rarr;
                </Link>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-brand-charcoal/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Enquire CTA Button (The Core PRD Action) */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => openEnquiry({ item: product.name, type: 'Garment' })}
                className="w-full py-4 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-xs uppercase tracking-[0.25em] font-semibold rounded-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-brand-gold-light" />
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <p className="text-center text-[11px] text-brand-muted tracking-wide">
                Direct enquiry to our showroom team at <span className="text-brand-charcoal font-medium">shubhamfabricsindia1@gmail.com</span>
              </p>
            </div>

            {/* Craftsmanship Highlights / Details */}
            {product.details && (
              <div className="pt-6 border-t border-brand-sand space-y-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
                  Craftsmanship Highlights
                </h4>
                <ul className="space-y-2 text-xs text-brand-charcoal/80 font-light">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="pt-4 border-t border-brand-sand/60">
                <p className="text-xs text-brand-muted">
                  <strong className="text-brand-charcoal font-medium uppercase tracking-wider text-[10px] block mb-1">
                    Care Guidelines
                  </strong>
                  {product.careInstructions}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* 2. THE STORY SECTION (Editorial Layout matching PRD) */}
        <section className="my-24 pt-16 border-t border-brand-sand">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark">
                THE STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
                Heritage Woven in Every Thread
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed font-light">
                {product.story || product.description}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openEnquiry({ item: product.name, type: 'Garment Story' })}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold-dark hover:text-brand-charcoal inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Request Bespoke Swatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden shadow-xl border border-brand-sand">
                <img
                  src={images[1] || images[0]}
                  alt={`${product.name} craftsmanship story`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 3. THE FABRIC SECTION (Matching PRD) */}
        {fabricObj && (
          <section className="my-20 p-8 sm:p-12 bg-brand-cream/80 border border-brand-sand rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-md">
                  <img
                    src={fabricObj.textureImage}
                    alt={`${fabricObj.name} macro weave`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-brand-gold-dark">
                  THE FABRIC &bull; {fabricObj.name.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-normal">
                  {fabricObj.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                  {product.fabricDescription || fabricObj.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/fabrics/${fabricObj.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal hover:text-brand-gold-dark transition-colors"
                  >
                    <span>View {fabricObj.name} Textile Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. YOU MAY ALSO LIKE (Related Pieces) */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-brand-sand">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark block mb-2">
                CURATED COMPLEMENTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-normal">
                You May Also Like
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
