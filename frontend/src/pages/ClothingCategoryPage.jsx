import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import { clothingCategories } from '../data/categories';
import { productsData } from '../data/products';

export default function ClothingCategoryPage() {
  const { category: categorySlug } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  const currentCategory = clothingCategories.find(c => c.slug === categorySlug) || {
    name: categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'Clothing',
    description: 'Explore traditional Indian silhouettes crafted from luxury natural textiles.',
    subcategories: []
  };

  const categoryProducts = productsData.filter(p => p.category === categorySlug);

  const filteredProducts = selectedSubcategory === 'all'
    ? categoryProducts
    : categoryProducts.filter(p => p.subcategory === selectedSubcategory);

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title={`${currentCategory.name} — Traditional Wear`}
        description={currentCategory.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/clothing"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-brand-muted hover:text-brand-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Silhouettes</span>
          </Link>
        </div>

        {/* Category Hero */}
        <div className="bg-brand-cream/80 border border-brand-sand p-8 md:p-12 rounded-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold-dark block mb-2">
              CATEGORY EDIT
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-charcoal font-normal">
              {currentCategory.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-light">
              {currentCategory.description}
            </p>
          </div>

          {currentCategory.image && (
            <div className="w-full md:w-56 aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden shadow-md shrink-0 bg-brand-cream">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </div>

        {/* Subcategories Filter if available */}
        {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-brand-sand overflow-x-auto">
            <span className="text-xs uppercase tracking-wider text-brand-muted shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Subcategories:</span>
            </span>
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors shrink-0 ${
                selectedSubcategory === 'all'
                  ? 'bg-brand-charcoal text-brand-ivory'
                  : 'bg-brand-cream hover:bg-brand-sand text-brand-charcoal'
              }`}
            >
              All {currentCategory.name}
            </button>
            {currentCategory.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors shrink-0 ${
                  selectedSubcategory === sub
                    ? 'bg-brand-charcoal text-brand-ivory'
                    : 'bg-brand-cream hover:bg-brand-sand text-brand-charcoal'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-brand-cream/30 rounded-sm border border-dashed border-brand-sand">
            <p className="font-serif text-xl text-brand-charcoal">No pieces currently listed in this edit.</p>
            <p className="text-xs text-brand-muted mt-2">Check back soon for new season arrivals or explore other silhouettes.</p>
            <div className="mt-6">
              <Link
                to="/clothing"
                className="px-6 py-2.5 bg-brand-charcoal text-brand-ivory text-xs uppercase tracking-widest rounded-sm hover:bg-brand-gold-dark transition-colors inline-block"
              >
                Explore Other Categories
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
