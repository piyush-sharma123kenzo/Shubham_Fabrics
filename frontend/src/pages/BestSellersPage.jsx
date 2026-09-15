import React from 'react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import { productsData } from '../data/products';

export default function BestSellersPage() {
  const bestSellers = productsData.filter(p => p.bestSeller);

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="Best Sellers — Our Most Loved Pieces"
        description="Discover the most celebrated traditional ensembles, festive suit sets, and handcrafted kurtis from Shubham Fabrics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          subtitle="TIMELESS FAVORITES"
          title="Best Sellers"
          description="Our most cherished silhouettes, loved for their impeccable drape, opulent embroideries, and lasting comfort."
          alignment="center"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
