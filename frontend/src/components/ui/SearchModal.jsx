import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import { productsData } from '../../data/products';
import { fabricsData } from '../../data/fabrics';
import { clothingCategories } from '../../data/categories';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useEnquiry();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingProducts = normalizedQuery
    ? productsData.filter(p =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.categoryName.toLowerCase().includes(normalizedQuery) ||
        p.fabric.toLowerCase().includes(normalizedQuery) ||
        p.collection.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingFabrics = normalizedQuery
    ? fabricsData.filter(f =>
        f.name.toLowerCase().includes(normalizedQuery) ||
        f.tagline.toLowerCase().includes(normalizedQuery) ||
        f.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingCategories = normalizedQuery
    ? clothingCategories.filter(c =>
        c.name.toLowerCase().includes(normalizedQuery) ||
        c.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults = matchingProducts.length + matchingFabrics.length + matchingCategories.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-brand-ivory rounded-sm shadow-2xl border border-brand-sand overflow-hidden flex flex-col max-h-[80vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-brand-sand flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-brand-gold-dark shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search suit sets, anarkalis, kurtis, silks, cottons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-none text-brand-charcoal placeholder:text-brand-muted/70"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-wider text-brand-muted hover:text-brand-charcoal"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-brand-charcoal hover:text-brand-gold-dark rounded-full"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-grow space-y-6">
          {!query && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-muted">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Silk Suit Set', 'Cotton Kurti', 'Georgette Dupatta', 'Anarkali', 'Pure Linen', 'Chikankari'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs bg-brand-cream hover:bg-brand-sand/60 text-brand-charcoal rounded-full transition-colors border border-brand-sand"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center text-brand-muted">
              <p className="font-serif text-lg text-brand-charcoal">No direct matches found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for generic fabrics like 'Silk', 'Cotton' or categories like 'Dresses'.</p>
            </div>
          )}

          {/* Clothing Matches */}
          {matchingProducts.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold-dark mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clothing Pieces ({matchingProducts.length})</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/clothing/${product.category}/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 p-2.5 bg-brand-cream/50 hover:bg-brand-cream rounded-sm border border-brand-sand/60 transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-sm shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-serif text-sm font-medium text-brand-charcoal group-hover:text-brand-gold-dark truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-brand-muted tracking-wide">
                        {product.fabric} &bull; {product.collection}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-gold shrink-0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Fabric Matches */}
          {matchingFabrics.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold-dark mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Fabrics & Textiles ({matchingFabrics.length})</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingFabrics.map((fabric) => (
                  <Link
                    key={fabric.id}
                    to={`/fabrics/${fabric.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 p-2.5 bg-brand-cream/50 hover:bg-brand-cream rounded-sm border border-brand-sand/60 transition-colors group"
                  >
                    <img
                      src={fabric.textureImage}
                      alt={fabric.name}
                      className="w-12 h-12 object-cover rounded-sm shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-serif text-sm font-medium text-brand-charcoal group-hover:text-brand-gold-dark">
                        {fabric.name}
                      </h4>
                      <p className="text-[11px] text-brand-muted italic truncate">
                        {fabric.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-gold shrink-0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Category Matches */}
          {matchingCategories.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold-dark mb-3">
                Categories ({matchingCategories.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {matchingCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/clothing/${cat.slug}`}
                    onClick={closeSearch}
                    className="px-4 py-2 bg-brand-sand/40 hover:bg-brand-sand text-brand-charcoal text-xs font-serif rounded-sm flex items-center gap-2 border border-brand-sand"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3 h-3 text-brand-gold" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
