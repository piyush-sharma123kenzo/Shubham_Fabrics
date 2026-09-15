import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FabricCard({ fabric, className = '' }) {
  if (!fabric) return null;

  const detailUrl = `/fabrics/${fabric.slug}`;
  const image = fabric.textureImage || fabric.heroImage;

  return (
    <div className={`group relative bg-brand-cream/60 rounded-sm overflow-hidden flex flex-col ${className}`}>
      {/* Texture Image Container */}
      <Link to={detailUrl} className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden block bg-brand-sand/50">
        <img
          src={image}
          alt={`${fabric.name} pure textile texture`}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Subtle Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Weave Badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium bg-brand-ivory/90 backdrop-blur-sm text-brand-charcoal px-2 py-0.5 rounded-sm">
            Pure Weave
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between">
            <Link to={detailUrl} className="group-hover:text-brand-gold-dark transition-colors">
              <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-charcoal">
                {fabric.name}
              </h3>
            </Link>
          </div>
          
          <p className="text-xs text-brand-muted mt-1 italic font-editorial text-sm">
            {fabric.tagline}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-sand/50 flex items-center justify-between">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-brand-charcoal/80 group-hover:text-brand-gold-dark transition-colors"
          >
            <span>Explore Fabric</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
