import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

export default function ProductCard({ product, className = '' }) {
  const { openEnquiry } = useEnquiry();

  if (!product) return null;

  const categorySlug = product.category || 'dresses';
  const detailUrl = `/clothing/${categorySlug}/${product.slug}`;
  const primaryImg = product.images?.[0] || '/suit_set_editorial.jpg';

  return (
    <div className={`group flex flex-col bg-transparent ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-brand-cream rounded-sm">
        <Link to={detailUrl} className="block w-full h-full">
          {/* Main Image (Stable, never swaps) */}
          <img
            src={primaryImg}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Tags / Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.newArrival && (
            <span className="bg-brand-dark/80 backdrop-blur-sm text-brand-ivory text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-sm shadow-sm">
              New Arrival
            </span>
          )}
          {product.bestSeller && !product.newArrival && (
            <span className="bg-brand-gold/90 backdrop-blur-sm text-brand-dark text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-sm shadow-sm">
              Most Loved
            </span>
          )}
        </div>

        {/* Quick Enquire Button (Hover overlay button) */}
        <div className="absolute bottom-3 inset-x-3 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEnquiry({ item: product.name, type: 'Garment' });
            }}
            className="w-full py-2.5 px-3 bg-brand-ivory/95 backdrop-blur-md text-brand-charcoal text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-brand-charcoal hover:text-brand-ivory transition-colors flex items-center justify-center gap-2 shadow-md rounded-sm cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>Enquire About This</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-4 flex flex-col flex-grow">
        {/* Collection & Fabric */}
        <div className="flex items-center justify-between text-[11px] text-brand-muted tracking-wider uppercase mb-1">
          <span>{product.collection || product.categoryName}</span>
          {product.fabric && (
            <span className="text-brand-gold-dark font-medium font-sans lowercase first-letter:uppercase">
              {product.fabric}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={detailUrl} className="group-hover:text-brand-gold-dark transition-colors">
          <h3 className="font-serif text-base sm:text-lg font-medium text-brand-charcoal line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Explore Link */}
        <div className="mt-2.5 pt-1">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-brand-charcoal/80 group-hover:text-brand-gold-dark transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
