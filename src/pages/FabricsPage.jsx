import React from 'react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import FabricCard from '../components/ui/FabricCard';
import { fabricsData } from '../data/fabrics';

export default function FabricsPage() {
  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      <SEO
        title="Pure Fabrics & Textile Library"
        description="Explore Shubham Fabrics textile library: pure cotton, rayon, georgette, silk, linen, crepe, and muslin woven in India."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          subtitle="TEXTILE ARCHIVE"
          title="Fabrics & Weaves"
          description="Textures that define every creation. Explore the tactile richness, weave densities, and natural drape of our 7 signature textiles."
          alignment="center"
        />

        {/* 7 Fabrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fabricsData.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>

      </div>
    </div>
  );
}
