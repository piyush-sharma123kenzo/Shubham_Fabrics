import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import CategoryCard from '../components/ui/CategoryCard';
import { clothingCategories } from '../data/categories';
import { productsData } from '../data/products';

export default function ClothingPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="Traditional Clothing & Silhouettes"
        description="Discover our complete range of handcrafted Indian traditional wear, suit sets, kurtis, dupattas, anarkalis, and ethnic co-ord sets."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          subtitle="INDIAN SILHOUETTES"
          title="Clothing Collection"
          description="A celebration of Indian silhouettes and modern elegance. From grand festive suit sets to effortless everyday kurtis."
          alignment="center"
        />

        {/* Categories Visual Grid Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-brand-sand">
            <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal">
              Browse by Category
            </h3>
            <span className="text-xs uppercase tracking-widest text-brand-muted">
              8 Silhouettes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {clothingCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>

        {/* All Products Showcase with Filter Tabs */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-brand-sand gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-gold-dark block mb-1">
                CURATED SHOWROOM
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal">
                All Ensembles ({filteredProducts.length})
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-brand-charcoal text-brand-ivory'
                    : 'bg-brand-cream hover:bg-brand-sand/60 text-brand-charcoal'
                }`}
              >
                All
              </button>
              {clothingCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors ${
                    activeCategory === cat.slug
                      ? 'bg-brand-charcoal text-brand-ivory'
                      : 'bg-brand-cream hover:bg-brand-sand/60 text-brand-charcoal'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
