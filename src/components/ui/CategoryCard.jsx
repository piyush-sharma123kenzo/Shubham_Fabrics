import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category, className = '' }) {
  if (!category) return null;

  const url = `/clothing/${category.slug}`;

  return (
    <Link
      to={url}
      className={`group relative overflow-hidden aspect-[3/4] rounded-sm block bg-brand-cream ${className}`}
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300" />

      {/* Content Placed at Bottom */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-brand-ivory">
        <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold-light font-medium mb-1">
          {category.subtitle || 'Traditional Edit'}
        </p>
        
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-ivory group-hover:text-brand-gold-light transition-colors">
          {category.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-brand-ivory/80 group-hover:text-brand-ivory transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-brand-gold-light" />
        </div>
      </div>
    </Link>
  );
}
