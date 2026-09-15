import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, Maximize2, Sparkles, Layers, ChevronRight, Check } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Lightbox from '../components/ui/Lightbox';
import ProductCard from '../components/ui/ProductCard';
import { fabricsData } from '../data/fabrics';
import { productsData } from '../data/products';
import { useEnquiry } from '../context/EnquiryContext';

export default function FabricDetailPage() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();

  const fabric = fabricsData.find(f => f.slug === slug) || fabricsData[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const relatedClothing = productsData.filter(
    p => p.fabricSlug === fabric.slug || p.fabric.toLowerCase() === fabric.name.toLowerCase()
  );

  const gallery = fabric.gallery || [fabric.heroImage, fabric.textureImage];

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title={`${fabric.name} Fabric — Pure Textiles`}
        description={fabric.description}
      />

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={gallery}
        currentIndex={activeImgIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() => setActiveImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
        onNext={() => setActiveImgIndex((prev) => (prev + 1) % gallery.length)}
        title={`Pure ${fabric.name} Texture`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-wider text-brand-muted mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-brand-charcoal">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link to="/fabrics" className="hover:text-brand-charcoal">Fabrics</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-brand-charcoal font-medium">{fabric.name}</span>
        </nav>

        {/* Fabric Hero Section */}
        <div className="relative rounded-sm overflow-hidden bg-brand-dark text-brand-ivory mb-16 shadow-2xl">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative">
            <img
              src={fabric.heroImage}
              alt={fabric.name}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-light block mb-2">
                PURE INDIAN TEXTILE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-brand-ivory">
                {fabric.name}
              </h1>
              <p className="text-lg sm:text-xl font-editorial italic text-brand-ivory/90 mt-2">
                {fabric.tagline}
              </p>
            </div>

            <button
              onClick={() => openEnquiry({ item: `Fabric Swatch: ${fabric.name}`, type: 'Fabric' })}
              className="px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors shrink-0 shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire About {fabric.name}</span>
            </button>
          </div>
        </div>

        {/* 1. THE TEXTURE (Macro Inspection & Specifications) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark">
              THE TEXTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-normal">
              A Sensory Celebration of Yarn & Weave
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed font-light">
              {fabric.description}
            </p>

            {/* Tactile Specifications */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-cream border border-brand-sand rounded-sm">
                <span className="text-[10px] uppercase tracking-wider text-brand-muted font-semibold block mb-1">
                  Hand Feel
                </span>
                <p className="text-xs text-brand-charcoal/90">
                  {fabric.feel}
                </p>
              </div>

              <div className="p-4 bg-brand-cream border border-brand-sand rounded-sm">
                <span className="text-[10px] uppercase tracking-wider text-brand-muted font-semibold block mb-1">
                  Drape & Movement
                </span>
                <p className="text-xs text-brand-charcoal/90">
                  {fabric.drape}
                </p>
              </div>
            </div>

            {/* Ideal Applications */}
            {fabric.applications && (
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold block mb-2">
                  Recommended Tailoring Applications
                </span>
                <div className="flex flex-wrap gap-2">
                  {fabric.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 bg-brand-sand/60 text-brand-charcoal text-xs rounded-full border border-brand-sand"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Macro Image with Lightbox Trigger */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-brand-sand group">
              <img
                src={fabric.textureImage}
                alt={`${fabric.name} macro weave`}
                className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
                onClick={() => setIsLightboxOpen(true)}
              />
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-brand-dark/70 text-brand-ivory rounded-full backdrop-blur-sm hover:bg-brand-dark transition-colors"
                aria-label="Inspect Weave Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* 2. THE STORY */}
        <div className="my-20 p-8 sm:p-12 bg-brand-cream/70 border border-brand-sand rounded-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark">
              THE STORY & HERITAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-normal">
              Woven with Pride in Indian Textile Mills
            </h3>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed font-light">
              {fabric.story}
            </p>
          </div>
        </div>

        {/* 3. RELATED CLOTHING (Fabric -> Clothing Connection) */}
        <div className="pt-12 border-t border-brand-sand">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark block mb-1">
                TAILORED CREATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-normal">
                Garments Crafted in {fabric.name}
              </h3>
            </div>

            <Link
              to="/clothing"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal hover:text-brand-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore All Clothing</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold-dark" />
            </Link>
          </div>

          {relatedClothing.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedClothing.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-brand-cream/40 border border-dashed border-brand-sand text-center rounded-sm">
              <p className="font-serif text-base text-brand-charcoal">
                Explore our full clothing line for bespoke {fabric.name} suit sets and ensembles.
              </p>
              <div className="mt-4">
                <Link
                  to="/clothing"
                  className="px-5 py-2 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-widest rounded-sm hover:bg-brand-gold-dark transition-colors inline-block"
                >
                  View All Silhouettes
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
