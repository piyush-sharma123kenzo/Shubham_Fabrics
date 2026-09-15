import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import SEO from '../components/ui/SEO';
import ProductCard from '../components/ui/ProductCard';
import { productsData } from '../data/products';
import { useEnquiry } from '../context/EnquiryContext';

export default function FallInLovePage() {
  const { openEnquiry } = useEnquiry();
  const editorialItems = productsData.filter(p => p.fallInLove);

  return (
    <div className="bg-brand-dark text-brand-ivory min-h-screen">
      <SEO
        title="Fall in Love — Editorial Collection"
        description="Colours. Textures. Silhouettes. Discover pieces that turn ordinary moments into something unforgettable with Shubham Fabrics."
      />

      {/* Signature Full-bleed Cinematic Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920&auto=format&fit=crop"
          alt="Fall in Love Editorial Showcase"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-brand-gold-light animate-fade-in block">
            SIGNATURE EDITORIAL
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-brand-ivory leading-tight">
            Fall in Love
          </h1>

          <p className="text-lg sm:text-2xl font-editorial italic text-brand-ivory/90 max-w-2xl mx-auto">
            Colours. Textures. Silhouettes.
          </p>

          <p className="text-sm sm:text-base text-brand-ivory/75 max-w-xl mx-auto font-light leading-relaxed">
            Discover pieces that turn ordinary moments into something unforgettable. A celebration of radiant palettes, cascading silks, and delicate embroidery.
          </p>
        </div>
      </section>

      {/* Editorial Chapter 1: The Poetry of Color */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-light">
              CHAPTER I
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-ivory font-normal leading-tight">
              Where Light Meets Pure Silk
            </h2>
            <p className="text-sm text-brand-ivory/75 leading-relaxed font-light">
              Every fold of pure silk catches ambient light differently. We pair centuries-old weaving traditions with contemporary cuts that flatter with quiet grace.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openEnquiry({ item: 'Silk Editorial Preview', type: 'Editorial' })}
                className="px-6 py-3 bg-brand-gold text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-brand-gold-light transition-colors"
              >
                Inquire About Silk Edits
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
                alt="Editorial Look 1"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl sm:translate-y-8">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop"
                alt="Editorial Look 2"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Editorial Chapter 2: The Showcase Grid */}
      <section className="py-24 bg-brand-charcoal/50 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-light">
              CHAPTER II
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-ivory font-normal">
              The Curated Editorial Wardrobe
            </h2>
            <p className="text-xs sm:text-sm text-brand-ivory/70 font-light">
              Pieces selected for their breathtaking movement, tactile sensation, and royal presence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {editorialItems.map((product) => (
              <div key={product.id} className="bg-brand-dark/60 p-3 rounded-sm border border-white/5">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Editorial Footer Note */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <Sparkles className="w-8 h-8 text-brand-gold-light mx-auto stroke-[1.2]" />
        <h3 className="text-2xl sm:text-3xl font-serif text-brand-ivory">
          Celebrate Timeless Elegance
        </h3>
        <p className="text-sm text-brand-ivory/70 max-w-lg mx-auto font-light leading-relaxed">
          Our team in Noida is ready to assist you with custom consultations, fabric swatches, and private viewings.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-xl"
          >
            <span>Connect with Our Showroom</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
