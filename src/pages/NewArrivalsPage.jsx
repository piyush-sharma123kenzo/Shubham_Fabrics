import React, { useState } from 'react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import { productsData } from '../data/products';

export default function NewArrivalsPage() {
  const [selectedFabric, setSelectedFabric] = useState('all');
  
  const allNewArrivals = productsData.filter(p => p.newArrival);
  const fabrics = ['all', ...new Set(allNewArrivals.map(p => p.fabric))];

  const filteredProducts = selectedFabric === 'all'
    ? allNewArrivals
    : allNewArrivals.filter(p => p.fabric === selectedFabric);

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="New Arrivals — Latest Traditional Edits"
        description="Explore the newest festive ensembles, handcrafted silk suit sets, pure cotton kurtis, and georgette dupattas from Shubham Fabrics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Page Header */}
        <SectionHeader
          subtitle="SEASONAL CURATION"
          title="New Arrivals"
          description="A celebration of fresh textures, seasonal color stories, and thoughtfully reimagined Indian silhouettes."
          alignment="center"
        />

        {/* Fabric Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {fabrics.map((fab) => (
            <button
              key={fab}
              onClick={() => setSelectedFabric(fab)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] rounded-full transition-all duration-300 font-medium ${
                selectedFabric === fab
                  ? 'bg-brand-charcoal text-brand-ivory shadow-sm'
                  : 'bg-brand-cream hover:bg-brand-sand/70 text-brand-charcoal border border-brand-sand'
              }`}
            >
              {fab === 'all' ? 'All Textiles' : fab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-brand-muted">
            <p className="font-serif text-lg">No pieces found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
